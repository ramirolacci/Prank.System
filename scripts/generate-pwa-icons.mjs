import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const svgPath = join(publicDir, 'icon.svg');

const sizes = [192, 512];

async function generate() {
  if (!existsSync(svgPath)) {
    console.error('Missing public/icon.svg');
    process.exit(1);
  }

  const svg = readFileSync(svgPath);

  for (const size of sizes) {
    const outPath = join(publicDir, `pwa-${size}x${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(outPath);
    console.log(`Generated ${outPath}`);
  }

  // Maskable variant with extra padding for safe zone
  const maskableSize = 512;
  const maskableOut = join(publicDir, 'pwa-maskable-512x512.png');
  await sharp(svg)
    .resize(Math.round(maskableSize * 0.72), Math.round(maskableSize * 0.72))
    .extend({
      top: Math.round(maskableSize * 0.14),
      bottom: Math.round(maskableSize * 0.14),
      left: Math.round(maskableSize * 0.14),
      right: Math.round(maskableSize * 0.14),
      background: { r: 10, g: 11, b: 16, alpha: 1 },
    })
    .png()
    .toFile(maskableOut);
  console.log(`Generated ${maskableOut}`);

  // Apple touch icon
  const appleOut = join(publicDir, 'apple-touch-icon.png');
  await sharp(svg).resize(180, 180).png().toFile(appleOut);
  console.log(`Generated ${appleOut}`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
