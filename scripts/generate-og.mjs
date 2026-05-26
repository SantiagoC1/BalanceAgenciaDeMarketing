import sharp from 'sharp';
import fs from 'fs';

const width = 1200;
const height = 630;

// Leer el logo
const logoPath = 'src/assets/images/LogoChicoFB.png';
const logoBuffer = fs.readFileSync(logoPath);

// Redimensionar logo a 300px de ancho manteniendo proporción
const resizedLogo = await sharp(logoBuffer)
  .resize(300, null)
  .toBuffer();

const { width: logoW, height: logoH } = await sharp(resizedLogo).metadata();

// Crear imagen base negra con logo centrado
await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 23, g: 22, b: 22, alpha: 1 } // brand-black #171616
  }
})
.composite([
  {
    input: resizedLogo,
    left: Math.round((width - logoW) / 2),
    top: Math.round((height - logoH) / 2) - 30
  },
  {
    input: Buffer.from(`
      <svg width="${width}" height="80">
        <text
          x="${width / 2}"
          y="50"
          font-family="sans-serif"
          font-size="28"
          fill="rgba(255,255,255,0.5)"
          text-anchor="middle"
          letter-spacing="4"
        >COMUNICACIÓN Y MARKETING PARA MARCAS Y LÍDERES</text>
      </svg>
    `),
    left: 0,
    top: Math.round((height - logoH) / 2) + logoH - 10
  }
])
.jpeg({ quality: 90 })
.toFile('public/og-image.jpg');

console.log('✅ OG Image generada en public/og-image.jpg');
