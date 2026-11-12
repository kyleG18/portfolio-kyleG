import * as THREE from 'three';

/**
 * Helper to draw a rounded rectangle path on a 2D canvas context
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Draws the authentic John Paul College circular emblem using the uploaded lanyard photo crop
 * alongside a clean institutional border ring so no details are fabricated.
 */
function drawSchoolSeal(ctx, cx, cy, radius, lanyardImg) {
  ctx.save();

  // Outer white/silver border ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#F8FAFC';
  ctx.fill();
  ctx.lineWidth = Math.max(2, radius * 0.06);
  ctx.strokeStyle = '#1E3A8A';
  ctx.stroke();

  // Royal blue ring band
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.92, 0, Math.PI * 2);
  ctx.fillStyle = '#1E40AF';
  ctx.fill();

  // Inner circle clipped to actual seal region from the uploaded lanyard photo if loaded
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
  ctx.clip();

  if (lanyardImg && lanyardImg.complete && lanyardImg.naturalWidth > 0) {
    // In the uploaded lanyard photo (708x1045), the upper circular seal is located around:
    // x: 42%..51%, y: 52.5%..61.5%
    const sx = lanyardImg.naturalWidth * 0.428;
    const sy = lanyardImg.naturalHeight * 0.528;
    const sw = lanyardImg.naturalWidth * 0.085;
    const sh = lanyardImg.naturalHeight * 0.085;
    ctx.drawImage(
      lanyardImg,
      sx,
      sy,
      sw,
      sh,
      cx - radius * 0.75,
      cy - radius * 0.75,
      radius * 1.5,
      radius * 1.5
    );
  } else {
    // Fallback clean geometric crest while image loads
    ctx.fillStyle = '#EFF6FF';
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    ctx.strokeStyle = '#15803D';
    ctx.lineWidth = radius * 0.1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.48, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();

  // Inner white ring stroke
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1.5, radius * 0.04);
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  // Ring micro-text indicator dots
  ctx.fillStyle = '#F8FAFC';
  ctx.font = `700 ${Math.max(7, Math.round(radius * 0.16))}px "Space Grotesk", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('J P C', cx, cy - radius * 0.82);
  ctx.fillText('1987', cx, cy + radius * 0.82);

  ctx.restore();
}

/**
 * Creates the JPC Lanyard Fabric Texture & Woven Bump Map
 */
export function createLanyardStrapTextures(lanyardImg) {
  const width = 512;
  const height = 2048;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Royal blue woven base matching the JPC lanyard photo
  const baseGrad = ctx.createLinearGradient(0, 0, width, height);
  baseGrad.addColorStop(0, '#2B54A3');
  baseGrad.addColorStop(0.45, '#3362BA');
  baseGrad.addColorStop(0.8, '#28509E');
  baseGrad.addColorStop(1, '#1E4087');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Diagonal sky-blue / cyan geometric accents visible near the lower end of the JPC strap
  ctx.save();
  ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.72);
  ctx.lineTo(width, height * 0.64);
  ctx.lineTo(width, height * 0.74);
  ctx.lineTo(0, height * 0.82);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(125, 211, 252, 0.28)';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.86);
  ctx.lineTo(width, height * 0.79);
  ctx.lineTo(width, height * 0.85);
  ctx.lineTo(0, height * 0.92);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 3. Subtle horizontal ribbed polyester weave lines
  ctx.fillStyle = 'rgba(10, 22, 48, 0.16)';
  for (let y = 0; y < height; y += 6) {
    ctx.fillRect(0, y, width, 2);
  }

  // Dark navy stitched edge borders
  ctx.fillStyle = '#152C5B';
  ctx.fillRect(0, 0, 22, height);
  ctx.fillRect(width - 22, 0, 22, height);

  ctx.strokeStyle = 'rgba(147, 197, 253, 0.35)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(28, 0);
  ctx.lineTo(28, height);
  ctx.moveTo(width - 28, 0);
  ctx.lineTo(width - 28, height);
  ctx.stroke();
  ctx.setLineDash([]);

  // 4. Vertical "JOHN PAUL COLLEGE" and "ROXAS, ORIENTAL MINDORO" text with dark navy outline
  const drawVerticalStrapText = (centerY) => {
    ctx.save();
    ctx.translate(width * 0.5, centerY);
    ctx.rotate(-Math.PI / 2);

    // Main Title: JOHN PAUL COLLEGE
    ctx.font = '800 92px "Space Grotesk", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#0F1E3D';
    ctx.strokeText('JOHN PAUL COLLEGE', 0, -34);
    ctx.fillStyle = '#F8FAFC';
    ctx.fillText('JOHN PAUL COLLEGE', 0, -34);

    // Subtitle: ROXAS, ORIENTAL MINDORO
    ctx.font = '700 42px "Space Grotesk", sans-serif';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0F1E3D';
    ctx.strokeText('ROXAS, ORIENTAL MINDORO', 0, 48);
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText('ROXAS, ORIENTAL MINDORO', 0, 48);

    ctx.restore();
  };

  drawVerticalStrapText(height * 0.34);

  // 5. Circular school seal near the bottom of the main strap (above the buckle)
  drawSchoolSeal(ctx, width * 0.5, height * 0.78, 138, lanyardImg);

  // Create bump/roughness weave canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext('2d');
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 256, 512);
  for (let y = 0; y < 512; y += 4) {
    bCtx.fillStyle = y % 8 === 0 ? '#b0b0b0' : '#555555';
    bCtx.fillRect(0, y, 256, 2);
  }

  const colorTexture = new THREE.CanvasTexture(canvas);
  colorTexture.anisotropy = 8;
  colorTexture.needsUpdate = true;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.RepeatWrapping;
  bumpTexture.repeat.set(2, 6);
  bumpTexture.needsUpdate = true;

  return { colorTexture, bumpTexture };
}

/**
 * Draws the Front and Back textures of the Student Identification Card
 */
export function createIDCardTextures(profileImg, lanyardImg) {
  const width = 1024;
  const height = 1536;

  // ================= FRONT FACE CANVAS =================
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = width;
  frontCanvas.height = height;
  const fCtx = frontCanvas.getContext('2d');

  // Card Base Background - Crisp Institutional Dark Navy & Royal Blue Theme
  const bgGrad = fCtx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#0F2242');
  bgGrad.addColorStop(0.45, '#0B1628');
  bgGrad.addColorStop(1, '#081120');
  fCtx.fillStyle = bgGrad;
  fCtx.fillRect(0, 0, width, height);

  // Top Royal Blue Header Banner (Inspired by JPC Lanyard)
  const headerGrad = fCtx.createLinearGradient(0, 0, width, 420);
  headerGrad.addColorStop(0, '#1D4ED8');
  headerGrad.addColorStop(0.6, '#2563EB');
  headerGrad.addColorStop(1, '#1E3A8A');
  fCtx.fillStyle = headerGrad;
  fCtx.beginPath();
  fCtx.moveTo(0, 0);
  fCtx.lineTo(width, 0);
  fCtx.lineTo(width, 350);
  fCtx.quadraticCurveTo(width * 0.5, 420, 0, 350);
  fCtx.closePath();
  fCtx.fill();

  // Diagonal light-blue ribbon stripe in header matching lanyard
  fCtx.fillStyle = 'rgba(96, 165, 250, 0.22)';
  fCtx.beginPath();
  fCtx.moveTo(width * 0.55, 0);
  fCtx.lineTo(width, 0);
  fCtx.lineTo(width * 0.35, 390);
  fCtx.lineTo(width * 0.1, 365);
  fCtx.closePath();
  fCtx.fill();

  // Top Lanyard Slot Cutout Visual
  roundRect(fCtx, width * 0.5 - 95, 36, 190, 28, 14);
  fCtx.fillStyle = '#060D1A';
  fCtx.fill();
  fCtx.lineWidth = 3;
  fCtx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  fCtx.stroke();

  // School Seal & Institution Name in Header
  drawSchoolSeal(fCtx, 155, 195, 74, lanyardImg);

  fCtx.textAlign = 'left';
  fCtx.fillStyle = '#FFFFFF';
  fCtx.font = '800 44px "Space Grotesk", sans-serif';
  fCtx.fillText('JOHN PAUL COLLEGE', 255, 168);

  fCtx.fillStyle = '#DBEAFE';
  fCtx.font = '600 24px "Inter", sans-serif';
  fCtx.fillText('ROXAS, ORIENTAL MINDORO • PHILIPPINES', 255, 206);

  // Pill Badge: STUDENT IDENTIFICATION CARD
  roundRect(fCtx, 255, 226, 395, 40, 8);
  fCtx.fillStyle = 'rgba(11, 22, 40, 0.55)';
  fCtx.fill();
  fCtx.lineWidth = 1.5;
  fCtx.strokeStyle = 'rgba(147, 197, 253, 0.5)';
  fCtx.stroke();

  fCtx.fillStyle = '#93C5FD';
  fCtx.font = '700 19px "JetBrains Mono", monospace';
  fCtx.fillText('STUDENT IDENTIFICATION CARD', 276, 252);

  // Portrait Frame (Center)
  const photoSize = 390;
  const photoX = (width - photoSize) * 0.5;
  const photoY = 320;

  // Outer glow & border frame for portrait
  roundRect(fCtx, photoX - 10, photoY - 10, photoSize + 20, photoSize + 20, 28);
  fCtx.fillStyle = '#1E3A8A';
  fCtx.fill();
  fCtx.lineWidth = 4;
  fCtx.strokeStyle = '#60A5FA';
  fCtx.stroke();

  fCtx.save();
  roundRect(fCtx, photoX, photoY, photoSize, photoSize, 20);
  fCtx.clip();

  if (profileImg && profileImg.complete && profileImg.naturalWidth > 0) {
    // Draw uploaded portrait photo centered
    const iw = profileImg.naturalWidth;
    const ih = profileImg.naturalHeight;
    const scale = Math.max(photoSize / iw, photoSize / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = photoX + (photoSize - dw) * 0.5;
    const dy = photoY + (photoSize - dh) * 0.5;
    fCtx.drawImage(profileImg, dx, dy, dw, dh);
  } else {
    fCtx.fillStyle = '#142943';
    fCtx.fillRect(photoX, photoY, photoSize, photoSize);
    fCtx.fillStyle = '#60A5FA';
    fCtx.font = '700 96px "Space Grotesk", sans-serif';
    fCtx.textAlign = 'center';
    fCtx.fillText('KAG', width * 0.5, photoY + 230);
  }
  fCtx.restore();

  // Status Verified Dot on Portrait Corner
  fCtx.beginPath();
  fCtx.arc(photoX + photoSize - 24, photoY + photoSize - 24, 18, 0, Math.PI * 2);
  fCtx.fillStyle = '#10B981';
  fCtx.fill();
  fCtx.lineWidth = 5;
  fCtx.strokeStyle = '#0B1628';
  fCtx.stroke();

  // Student Name & Academic Title
  fCtx.textAlign = 'center';
  fCtx.fillStyle = '#F8FAFC';
  fCtx.font = '800 58px "Space Grotesk", sans-serif';
  fCtx.fillText('KYLE ANDRE GACULA', width * 0.5, 805);

  // Role / Degree Subtitle
  fCtx.fillStyle = '#60A5FA';
  fCtx.font = '700 30px "Inter", sans-serif';
  fCtx.fillText('BS IN INFORMATION TECHNOLOGY', width * 0.5, 858);

  // Year Level & Positioning Pill
  roundRect(fCtx, width * 0.5 - 320, 892, 640, 56, 12);
  fCtx.fillStyle = '#142943';
  fCtx.fill();
  fCtx.lineWidth = 2;
  fCtx.strokeStyle = '#263B55';
  fCtx.stroke();

  fCtx.fillStyle = '#E2E8F0';
  fCtx.font = '600 24px "JetBrains Mono", monospace';
  fCtx.fillText('4TH-YEAR STUDENT • WEB & AI DEVELOPER', width * 0.5, 928);

  // Info Metadata Grid Box
  const gridY = 990;
  roundRect(fCtx, 76, gridY, width - 152, 230, 18);
  fCtx.fillStyle = 'rgba(20, 41, 67, 0.72)';
  fCtx.fill();
  fCtx.lineWidth = 2;
  fCtx.strokeStyle = '#263B55';
  fCtx.stroke();

  // Left Metadata Column
  fCtx.textAlign = 'left';
  fCtx.fillStyle = '#94A3B8';
  fCtx.font = '600 20px "JetBrains Mono", monospace';
  fCtx.fillText('DEPARTMENT', 116, gridY + 52);
  fCtx.fillStyle = '#F8FAFC';
  fCtx.font = '700 26px "Inter", sans-serif';
  fCtx.fillText('Information Technology (BSIT)', 116, gridY + 90);

  fCtx.fillStyle = '#94A3B8';
  fCtx.font = '600 20px "JetBrains Mono", monospace';
  fCtx.fillText('SPECIALIZATION FOCUS', 116, gridY + 148);
  fCtx.fillStyle = '#60A5FA';
  fCtx.font = '700 25px "Inter", sans-serif';
  fCtx.fillText('Web Dev • Databases • AI Automation', 116, gridY + 186);

  // Right QR Verification Box inside Grid
  const qrSize = 158;
  const qrX = width - 76 - qrSize - 36;
  const qrY = gridY + 36;
  roundRect(fCtx, qrX, qrY, qrSize, qrSize, 12);
  fCtx.fillStyle = '#F8FAFC';
  fCtx.fill();

  // Draw deterministic stylized QR matrix
  fCtx.fillStyle = '#0B1628';
  const cell = 14;
  const startX = qrX + 18;
  const startY = qrY + 18;
  const pattern = [
    [1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 1]
  ];
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      if (pattern[r][c]) {
        fCtx.fillRect(startX + c * cell, startY + r * cell, cell - 2, cell - 2);
      }
    }
  }

  // Bottom Footer Strip
  fCtx.fillStyle = '#101F35';
  fCtx.fillRect(0, height - 190, width, 190);
  fCtx.strokeStyle = '#2563EB';
  fCtx.lineWidth = 4;
  fCtx.beginPath();
  fCtx.moveTo(0, height - 190);
  fCtx.lineTo(width, height - 190);
  fCtx.stroke();

  fCtx.textAlign = 'left';
  fCtx.fillStyle = '#94A3B8';
  fCtx.font = '500 22px "JetBrains Mono", monospace';
  fCtx.fillText('ID REF: JPC-BSIT-4YR', 80, height - 115);
  fCtx.fillStyle = '#60A5FA';
  fCtx.font = '600 22px "Inter", sans-serif';
  fCtx.fillText('Portfolio Identity Badge • Interactive 3D Card', 80, height - 72);

  fCtx.textAlign = 'right';
  fCtx.fillStyle = '#34D399';
  fCtx.font = '700 22px "JetBrains Mono", monospace';
  fCtx.fillText('● ACTIVE STUDENT', width - 80, height - 92);

  // Outer Card Border Frame
  roundRect(fCtx, 12, 12, width - 24, height - 24, 42);
  fCtx.lineWidth = 8;
  fCtx.strokeStyle = 'rgba(96, 165, 250, 0.35)';
  fCtx.stroke();

  // ================= BACK FACE CANVAS =================
  const backCanvas = document.createElement('canvas');
  backCanvas.width = width;
  backCanvas.height = height;
  const bCtx = backCanvas.getContext('2d');

  bCtx.fillStyle = '#0B1628';
  bCtx.fillRect(0, 0, width, height);

  // Top magnetic/institutional strip
  bCtx.fillStyle = '#050B14';
  bCtx.fillRect(0, 110, width, 130);

  // Back Header
  drawSchoolSeal(bCtx, width * 0.5, 370, 82, lanyardImg);

  bCtx.textAlign = 'center';
  bCtx.fillStyle = '#F8FAFC';
  bCtx.font = '800 40px "Space Grotesk", sans-serif';
  bCtx.fillText('JOHN PAUL COLLEGE', width * 0.5, 505);

  bCtx.fillStyle = '#60A5FA';
  bCtx.font = '600 24px "Inter", sans-serif';
  bCtx.fillText('Roxas, Oriental Mindoro, Philippines', width * 0.5, 548);

  // Technical Stack Summary Box on Back of ID
  roundRect(bCtx, 86, 610, width - 172, 470, 22);
  bCtx.fillStyle = '#101F35';
  bCtx.fill();
  bCtx.lineWidth = 3;
  bCtx.strokeStyle = '#263B55';
  bCtx.stroke();

  bCtx.textAlign = 'left';
  bCtx.fillStyle = '#60A5FA';
  bCtx.font = '700 24px "JetBrains Mono", monospace';
  bCtx.fillText('// TECHNICAL PROFILE SUMMARY', 130, 675);

  const stackRows = [
    ['FRONTEND', 'HTML, CSS, JavaScript, React, Vite'],
    ['BACKEND', 'Node.js, Express.js, REST APIs'],
    ['DATABASE', 'MySQL, PostgreSQL'],
    ['KEY PROJECTS', 'PermitEase • Gacula Gaming • Once Travel'],
    ['EXPLORING', 'AI Automation & IT Infrastructure']
  ];

  stackRows.forEach(([label, val], idx) => {
    const y = 745 + idx * 66;
    bCtx.fillStyle = '#94A3B8';
    bCtx.font = '600 21px "JetBrains Mono", monospace';
    bCtx.fillText(label, 130, y);

    bCtx.fillStyle = '#F8FAFC';
    bCtx.font = '600 24px "Inter", sans-serif';
    bCtx.fillText(val, 355, y);
  });

  // Verification Notice Box
  roundRect(bCtx, 86, 1130, width - 172, 165, 16);
  bCtx.fillStyle = '#142943';
  bCtx.fill();

  bCtx.textAlign = 'center';
  bCtx.fillStyle = '#CBD5E1';
  bCtx.font = '500 23px "Inter", sans-serif';
  bCtx.fillText(
    'This digital identification badge belongs to Kyle Andre Gacula,',
    width * 0.5,
    1192
  );
  bCtx.fillText(
    '4th-Year BS Information Technology Student at John Paul College.',
    width * 0.5,
    1234
  );

  // Barcode Graphic at Bottom
  const barY = 1345;
  bCtx.fillStyle = '#F8FAFC';
  roundRect(bCtx, 180, barY, width - 360, 105, 10);
  bCtx.fill();

  bCtx.fillStyle = '#0B1628';
  let bx = 215;
  const weights = [6, 3, 9, 4, 3, 8, 4, 6, 3, 5, 9, 3, 4, 7, 3, 6, 4, 8, 3, 5, 7, 4, 6, 3, 8, 4, 5, 3];
  weights.forEach((w, i) => {
    if (i % 2 === 0) {
      bCtx.fillRect(bx, barY + 16, w * 2.2, 73);
    }
    bx += w * 2.2 + 4;
  });

  roundRect(bCtx, 12, 12, width - 24, height - 24, 42);
  bCtx.lineWidth = 8;
  bCtx.strokeStyle = 'rgba(96, 165, 250, 0.35)';
  bCtx.stroke();

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.anisotropy = 8;
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.needsUpdate = true;

  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.anisotropy = 8;
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.needsUpdate = true;

  return { frontTexture, backTexture };
}
