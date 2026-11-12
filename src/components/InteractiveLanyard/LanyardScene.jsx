import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows } from '@react-three/drei';
import {
  createLanyardStrapTextures,
  createIDCardTextures
} from './LanyardTextures';
import { playFlipSound } from '../../utils/soundEffects';

const STRAP_SEGMENTS = 32;
const STRAP_WIDTH = 0.32;

/**
 * Updates a flat ribbon geometry along a 3D Catmull-Rom curve with a slight twist
 */
function updateFlatStrapGeometry(geometry, curvePoints, width, twistAngle = 0) {
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const points = curve.getPoints(STRAP_SEGMENTS);
  const positions = geometry.attributes.position.array;

  const up = new THREE.Vector3(0, 0, 1);
  const tangent = new THREE.Vector3();
  const side = new THREE.Vector3();

  for (let i = 0; i <= STRAP_SEGMENTS; i++) {
    const t = i / STRAP_SEGMENTS;
    const pt = points[i];
    curve.getTangent(t, tangent);

    side.crossVectors(tangent, up).normalize();
    if (side.lengthSq() < 0.001) {
      side.set(1, 0, 0);
    }

    const localTwist = twistAngle * t;
    const cosT = Math.cos(localTwist);
    const sinT = Math.sin(localTwist);

    const halfW = width * 0.5;
    const sx = side.x * cosT * halfW;
    const sy = side.y * cosT * halfW;
    const sz = sinT * halfW * 0.65;

    const idx = i * 6;
    positions[idx] = pt.x - sx;
    positions[idx + 1] = pt.y - sy;
    positions[idx + 2] = pt.z - sz;

    positions[idx + 3] = pt.x + sx;
    positions[idx + 4] = pt.y + sy;
    positions[idx + 5] = pt.z + sz;
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
}

export default function LanyardScene({
  profilePhotoUrl,
  lanyardPhotoUrl,
  isFlipped,
  onToggleFlip,
  resetSignal,
  reducedMotion,
  isVisible
}) {
  const { viewport, size } = useThree();

  const isMobile = size.width < 992;
  // Position anchor on the right side for desktop, or centered on mobile
  const anchorX = isMobile ? 0 : Math.min(1.85, viewport.width * 0.24);

  // Position restPos.y: on desktop 0.95 for full screen; on mobile 0.55 inside showcase box
  const restY = isMobile ? 0.55 : 0.95;
  const anchorY = isMobile ? 3.2 : 4.8; // Extends seamlessly beyond the container top

  const assemblyGroupRef = useRef();
  const cardGroupRef = useRef();
  const buckleGroupRef = useRef();
  const leftStrapGeoRef = useRef();
  const rightStrapGeoRef = useRef();

  const [textures, setTextures] = useState(() => {
    const strap = createLanyardStrapTextures(null);
    const card = createIDCardTextures(null, null);
    return { ...strap, ...card };
  });

  useEffect(() => {
    let isMounted = true;
    const profileImg = new Image();
    const lanyardImg = new Image();
    profileImg.crossOrigin = 'anonymous';
    lanyardImg.crossOrigin = 'anonymous';

    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount += 1;
      if (!isMounted) return;
      if (loadedCount >= 1) {
        const strap = createLanyardStrapTextures(lanyardImg);
        const card = createIDCardTextures(profileImg, lanyardImg);
        setTextures((prev) => {
          prev.colorTexture?.dispose();
          prev.bumpTexture?.dispose();
          prev.frontTexture?.dispose();
          prev.backTexture?.dispose();
          return { ...strap, ...card };
        });
      }
    };

    profileImg.onload = handleImageLoad;
    lanyardImg.onload = handleImageLoad;
    profileImg.src = profilePhotoUrl;
    lanyardImg.src = lanyardPhotoUrl;

    return () => {
      isMounted = false;
    };
  }, [profilePhotoUrl, lanyardPhotoUrl]);

  // Physics State: Initial drop-in / fall-down slide animation on page load!
  const physics = useRef({
    isDragging: false,
    pointerDownPos: new THREE.Vector2(),
    dragOffset: new THREE.Vector3(),
    anchor: new THREE.Vector3(anchorX, anchorY, 0),
    restPos: new THREE.Vector3(anchorX, restY, 0),
    pos: new THREE.Vector3(anchorX + 0.12, 4.5, 0), // Starts high above screen!
    vel: new THREE.Vector3(0.04, -0.24, 0),         // Falling downward with gravity!
    midPos: new THREE.Vector3(anchorX, 3.8, 0.05),
    midVel: new THREE.Vector3(0, -0.16, 0),
    rot: new THREE.Vector3(0.12, 0.25, -0.15),
    rotVel: new THREE.Vector3(0.05, 0.22, -0.08),
    flipAngle: 0
  });

  useEffect(() => {
    const p = physics.current;
    p.anchor.x = anchorX;
    p.anchor.y = anchorY;
    p.restPos.x = anchorX;
    p.restPos.y = restY;
    if (!p.isDragging && p.pos.y < 3.0) {
      p.pos.x = THREE.MathUtils.lerp(p.pos.x, anchorX, 0.3);
    }
  }, [anchorX, restY]);

  useEffect(() => {
    if (resetSignal > 0) {
      const p = physics.current;
      p.pos.set(anchorX, restY, 0);
      p.vel.set(0.08, -0.05, 0.02);
      p.rotVel.set(0.03, 0.15, -0.05);
    }
  }, [resetSignal, anchorX, restY]);

  const tempVec = useMemo(() => ({
    force: new THREE.Vector3(),
    midTarget: new THREE.Vector3(),
    midForce: new THREE.Vector3(),
    leftTop: new THREE.Vector3(),
    leftMid: new THREE.Vector3(),
    leftBot: new THREE.Vector3(),
    rightTop: new THREE.Vector3(),
    rightMid: new THREE.Vector3(),
    rightBot: new THREE.Vector3(),
    dragPlaneNormal: new THREE.Vector3(0, 0, 1),
    dragPlane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    intersectPoint: new THREE.Vector3()
  }), []);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    const p = physics.current;
    p.isDragging = true;
    p.pointerDownPos.set(e.clientX, e.clientY);

    tempVec.dragPlane.setFromNormalAndCoplanarPoint(
      tempVec.dragPlaneNormal,
      p.pos
    );
    if (e.ray.intersectPlane(tempVec.dragPlane, tempVec.intersectPoint)) {
      p.dragOffset.copy(p.pos).sub(tempVec.intersectPoint);
    } else {
      p.dragOffset.set(0, 0, 0);
    }
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e) => {
    const p = physics.current;
    if (!p.isDragging) return;
    e.stopPropagation();

    tempVec.dragPlane.setFromNormalAndCoplanarPoint(
      tempVec.dragPlaneNormal,
      p.pos
    );
    if (e.ray.intersectPlane(tempVec.dragPlane, tempVec.intersectPoint)) {
      const targetX = THREE.MathUtils.clamp(
        tempVec.intersectPoint.x + p.dragOffset.x,
        -viewport.width * 0.48,
        viewport.width * 0.48
      );
      const targetY = THREE.MathUtils.clamp(
        tempVec.intersectPoint.y + p.dragOffset.y,
        -viewport.height * 0.48,
        viewport.height * 0.45
      );

      const vx = (targetX - p.pos.x) * 0.48;
      const vy = (targetY - p.pos.y) * 0.48;

      p.vel.set(vx, vy, 0);
      p.pos.set(targetX, targetY, 0.16);

      p.rotVel.z = THREE.MathUtils.clamp(-vx * 0.65, -0.4, 0.4);
      p.rotVel.x = THREE.MathUtils.clamp(vy * 0.45, -0.3, 0.3);
      p.rotVel.y = THREE.MathUtils.clamp(vx * 0.85, -0.5, 0.5);
    }
  };

  const handlePointerUp = (e) => {
    const p = physics.current;
    if (!p.isDragging) return;
    e.stopPropagation();
    if (e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    p.isDragging = false;
    document.body.style.cursor = 'auto';

    const dist = Math.hypot(
      e.clientX - p.pointerDownPos.x,
      e.clientY - p.pointerDownPos.y
    );
    if (dist < 8) {
      onToggleFlip?.();
      playFlipSound();
      p.rotVel.y += 0.16;
    }
  };

  useFrame((state, delta) => {
    if (!isVisible) return;

    const dt = Math.min(delta, 0.033);
    const p = physics.current;
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (!p.isDragging) {
      const idleSwayX = reducedMotion ? 0 : Math.sin(t * 1.3) * 0.05;
      const idleSwayY = reducedMotion ? 0 : Math.cos(t * 2.1) * 0.018;
      const mouseInfluenceX = pointer.x * 0.18;
      const mouseInfluenceY = pointer.y * 0.06;

      const targetX = p.restPos.x + idleSwayX + mouseInfluenceX;
      const targetY = p.restPos.y + idleSwayY + mouseInfluenceY;

      const stiffness = 16.0;
      const damping = 0.91;

      tempVec.force.set(
        (targetX - p.pos.x) * stiffness,
        (targetY - p.pos.y) * (stiffness * 1.25),
        (0 - p.pos.z) * stiffness
      );

      p.vel.addScaledVector(tempVec.force, dt);
      p.vel.multiplyScalar(damping);
      p.pos.addScaledVector(p.vel, dt * 15);

      const targetRotZ = -(p.pos.x - p.restPos.x) * 0.28 - p.vel.x * 0.45;
      const targetRotX = (p.pos.y - p.restPos.y) * 0.18 + pointer.y * 0.08;
      const targetRotY =
        pointer.x * 0.25 + (reducedMotion ? 0 : Math.sin(t * 0.9) * 0.08);

      p.rotVel.x += (targetRotX - p.rot.x) * 14 * dt;
      p.rotVel.y += (targetRotY - p.rot.y) * 12 * dt;
      p.rotVel.z += (targetRotZ - p.rot.z) * 16 * dt;

      p.rotVel.multiplyScalar(0.88);
      p.rot.addScaledVector(p.rotVel, dt * 12);
    } else {
      p.rot.x = THREE.MathUtils.lerp(p.rot.x, p.rotVel.x, 0.25);
      p.rot.y = THREE.MathUtils.lerp(p.rot.y, p.rotVel.y, 0.25);
      p.rot.z = THREE.MathUtils.lerp(
        p.rot.z,
        -(p.pos.x - p.restPos.x) * 0.25 + p.rotVel.z,
        0.25
      );
    }

    const targetFlip = isFlipped ? Math.PI : 0;
    p.flipAngle = THREE.MathUtils.lerp(p.flipAngle, targetFlip, dt * 8.5);

    // Mid-ribbon node connecting from anchorY (4.8) down to buckle
    tempVec.midTarget.set(
      (p.anchor.x + p.pos.x) * 0.5,
      (p.anchor.y + p.pos.y + 1.2) * 0.5 - Math.abs(p.pos.x - p.anchor.x) * 0.08,
      p.pos.z * 0.5 + 0.06
    );
    tempVec.midForce.subVectors(tempVec.midTarget, p.midPos).multiplyScalar(22);
    p.midVel.addScaledVector(tempVec.midForce, dt);
    p.midVel.multiplyScalar(0.84);
    p.midPos.addScaledVector(p.midVel, dt * 14);

    if (cardGroupRef.current && buckleGroupRef.current) {
      // 1. The ID Card hangs DOWNWARD from p.pos (Attachment point at card slot)
      cardGroupRef.current.position.set(p.pos.x, p.pos.y, p.pos.z);
      cardGroupRef.current.rotation.set(
        p.rot.x,
        p.rot.y + p.flipAngle,
        p.rot.z
      );

      // 2. The Buckle and clasp assembly sits cleanly ABOVE p.pos
      buckleGroupRef.current.position.set(p.pos.x, p.pos.y, p.pos.z);
      buckleGroupRef.current.rotation.set(
        p.rot.x * 0.65,
        p.rot.y * 0.55,
        p.rot.z * 0.75
      );

      // 3. Connect Ribbon Straps from Anchor (way up at y = 4.8) down into upper fold (y = 1.45)
      const buckleTopX = p.pos.x - Math.sin(p.rot.z * 0.75) * 1.48;
      const buckleTopY = p.pos.y + Math.cos(p.rot.z * 0.75) * 1.48;
      const buckleTopZ = p.pos.z;

      if (leftStrapGeoRef.current) {
        tempVec.leftTop.set(p.anchor.x - 0.32, p.anchor.y, -0.04);
        tempVec.leftMid.set(
          p.midPos.x - 0.18,
          p.midPos.y + 0.15,
          p.midPos.z - 0.01
        );
        tempVec.leftBot.set(buckleTopX - 0.02, buckleTopY, buckleTopZ + 0.01);

        updateFlatStrapGeometry(
          leftStrapGeoRef.current,
          [tempVec.leftTop, tempVec.leftMid, tempVec.leftBot],
          STRAP_WIDTH,
          0.16 + p.rot.y * 0.22
        );
      }

      if (rightStrapGeoRef.current) {
        tempVec.rightTop.set(p.anchor.x + 0.32, p.anchor.y, -0.06);
        tempVec.rightMid.set(
          p.midPos.x + 0.18,
          p.midPos.y + 0.15,
          p.midPos.z - 0.02
        );
        tempVec.rightBot.set(buckleTopX + 0.02, buckleTopY, buckleTopZ - 0.015);

        updateFlatStrapGeometry(
          rightStrapGeoRef.current,
          [tempVec.rightTop, tempVec.rightMid, tempVec.rightBot],
          STRAP_WIDTH,
          -0.16 + p.rot.y * 0.22
        );
      }
    }
  });

  const sceneScale = useMemo(() => {
    if (size.width < 500) return 0.68;
    if (size.width < 900) return 0.78;
    // Scale slightly so card and hardware comfortably fit 1080p and laptop screens
    return Math.min(0.92, viewport.height / 4.6);
  }, [size.width, viewport.height]);

  return (
    <group ref={assemblyGroupRef} scale={sceneScale}>
      {/* Lighting */}
      <ambientLight intensity={1.25} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#F8FAFC"
      />
      <spotLight
        position={[-4, 5, 3]}
        intensity={1.3}
        angle={0.5}
        penumbra={0.8}
        color="#60A5FA"
      />
      <pointLight position={[0, -2, 2.8]} intensity={0.85} color="#2563EB" />

      <Environment preset="city" />

      {/* Top Anchor Bridge (position at anchorY = 4.8, well off-screen) */}
      <mesh position={[anchorX, 4.8, -0.05]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.32, 0.07, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#172E5C" roughness={0.75} />
      </mesh>

      {/* Left Strap Ribbon */}
      <mesh>
        <planeGeometry
          ref={leftStrapGeoRef}
          args={[STRAP_WIDTH, 4.0, 1, STRAP_SEGMENTS]}
        />
        <meshStandardMaterial
          map={textures.colorTexture}
          bumpMap={textures.bumpTexture}
          bumpScale={0.012}
          roughness={0.62}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Strap Ribbon */}
      <mesh>
        <planeGeometry
          ref={rightStrapGeoRef}
          args={[STRAP_WIDTH, 4.0, 1, STRAP_SEGMENTS]}
        />
        <meshStandardMaterial
          map={textures.colorTexture}
          bumpMap={textures.bumpTexture}
          bumpScale={0.012}
          roughness={0.62}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ================= DETACHABLE BUCKLE & HARDWARE (ABOVE CARD) ================= */}
      {/* Positioned strictly ABOVE y = 0.0 with NO overlap over the card face or portrait! */}
      <group ref={buckleGroupRef}>
        {/* 1. Upper Blue Strap Fold (y = 1.34) */}
        <RoundedBox
          args={[0.34, 0.26, 0.05]}
          radius={0.018}
          smoothness={4}
          position={[0, 1.34, 0]}
        >
          <meshStandardMaterial
            map={textures.colorTexture}
            bumpMap={textures.bumpTexture}
            bumpScale={0.01}
            roughness={0.65}
          />
        </RoundedBox>

        {/* Upper Brass Rivet (y = 1.32) */}
        <mesh position={[0, 1.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.046, 0.046, 0.065, 24]} />
          <meshStandardMaterial
            color="#A1723E"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* 2. Matte Black Quick-Release Buckle (y = 1.02) */}
        <group position={[0, 1.02, 0]}>
          <RoundedBox
            args={[0.42, 0.08, 0.085]}
            radius={0.02}
            smoothness={4}
            position={[0, 0.16, 0]}
          >
            <meshStandardMaterial color="#14171C" roughness={0.42} metalness={0.12} />
          </RoundedBox>

          <RoundedBox
            args={[0.40, 0.32, 0.10]}
            radius={0.035}
            smoothness={4}
            position={[0, -0.01, 0]}
          >
            <meshStandardMaterial color="#181C22" roughness={0.38} metalness={0.15} />
          </RoundedBox>

          <RoundedBox
            args={[0.45, 0.13, 0.07]}
            radius={0.025}
            smoothness={4}
            position={[0, 0.01, 0]}
          >
            <meshStandardMaterial color="#222730" roughness={0.48} metalness={0.1} />
          </RoundedBox>
        </group>

        {/* 3. Lower Detachable Blue Strap Stub (y = 0.62) */}
        <RoundedBox
          args={[0.32, 0.32, 0.048]}
          radius={0.016}
          smoothness={4}
          position={[0, 0.62, 0]}
        >
          <meshStandardMaterial
            map={textures.colorTexture}
            bumpMap={textures.bumpTexture}
            bumpScale={0.01}
            roughness={0.62}
          />
        </RoundedBox>

        {/* Lower Brass Rivet (y = 0.56) */}
        <mesh position={[0, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.044, 0.044, 0.062, 24]} />
          <meshStandardMaterial
            color="#A1723E"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* 4. Silver Metallic D-Ring (y = 0.40) */}
        <mesh position={[0, 0.40, 0]}>
          <torusGeometry args={[0.13, 0.022, 16, 32]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>

        {/* 5. Swivel Cylinder (y = 0.26) */}
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.035, 0.03, 0.10, 20]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.92}
            roughness={0.16}
          />
        </mesh>

        {/* 6. Lobster Clasp Hook (y = 0.10) */}
        <mesh position={[0, 0.10, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.065, 0.02, 14, 28]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>
      </group>

      {/* ================= INTERACTIVE 3D STUDENT ID CARD ================= */}
      {/* Extends cleanly DOWNWARD from y = 0 to y = -2.42 */}
      <group
        ref={cardGroupRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerOver={() => {
          if (!physics.current.isDragging) {
            document.body.style.cursor = 'grab';
          }
        }}
        onPointerOut={() => {
          if (!physics.current.isDragging) {
            document.body.style.cursor = 'auto';
          }
        }}
      >
        {/* Metal/Plastic Slot Clip Ring connecting Hook to Card Slot */}
        <RoundedBox
          args={[0.22, 0.14, 0.05]}
          radius={0.02}
          smoothness={4}
          position={[0, -0.01, 0]}
        >
          <meshStandardMaterial
            color="#334155"
            roughness={0.3}
            metalness={0.5}
          />
        </RoundedBox>

        {/* PVC Card Core Body (centered at y = -1.21 so its top edge is at y = 0.0) */}
        <RoundedBox
          args={[1.62, 2.42, 0.038]}
          radius={0.06}
          smoothness={4}
          position={[0, -1.21, 0]}
        >
          <meshPhysicalMaterial
            color="#0E1E38"
            roughness={0.24}
            metalness={0.12}
            clearcoat={0.7}
            clearcoatRoughness={0.18}
          />
        </RoundedBox>

        {/* Front Laminated Card Face */}
        <mesh position={[0, -1.21, 0.0205]}>
          <planeGeometry args={[1.58, 2.38]} />
          <meshPhysicalMaterial
            map={textures.frontTexture}
            roughness={0.2}
            metalness={0.05}
            clearcoat={0.8}
            clearcoatRoughness={0.14}
          />
        </mesh>

        {/* Back Laminated Card Face */}
        <mesh position={[0, -1.21, -0.0205]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.58, 2.38]} />
          <meshPhysicalMaterial
            map={textures.backTexture}
            roughness={0.24}
            metalness={0.05}
            clearcoat={0.7}
            clearcoatRoughness={0.16}
          />
        </mesh>
      </group>

      {/* Ground Contact Shadow */}
      <ContactShadows
        position={[anchorX, -2.7, 0]}
        opacity={0.4}
        scale={4.8}
        blur={2.6}
        far={4.0}
        color="#020610"
      />
    </group>
  );
}
