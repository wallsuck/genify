// /scripts/updateAssets.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateBaseVideo(templateFolder, duration) {
  const output = path.join(templateFolder, 'base.mp4');
  if (fs.existsSync(output)) return; // skip jika sudah ada
  execSync(`ffmpeg -f lavfi -i color=c=black:s=1280x720:d=${duration} -pix_fmt yuv420p ${output}`);
  console.log('Base video dibuat di', output);
}

function updateAssets() {
  // Generate base.mp4 tiap template
  const templates = fs.readdirSync(path.join(__dirname, '../templates')).filter(f => fs.statSync(path.join(__dirname, '../templates', f)).isDirectory());
  templates.forEach(t => {
    const folder = path.join(__dirname, '../templates', t);
    const duration = t === 'ugc-review' ? 15 : 10;
    generateBaseVideo(folder, duration);
  });

  // Placeholder musik
  const musicFolder = path.join(__dirname, '../assets/music');
  if (!fs.existsSync(musicFolder)) fs.mkdirSync(musicFolder, { recursive: true });
  ['bgm1.mp3', 'bgm2.mp3', 'bgm3.mp3'].forEach(f => {
    const filePath = path.join(musicFolder, f);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, ''); // kosong placeholder
  });

  // Placeholder fonts
  const fontsFolder = path.join(__dirname, '../assets/fonts');
  if (!fs.existsSync(fontsFolder)) fs.mkdirSync(fontsFolder, { recursive: true });

  // Placeholder stickers
  const stickersFolder = path.join(__dirname, '../assets/stickers');
  if (!fs.existsSync(stickersFolder)) fs.mkdirSync(stickersFolder, { recursive: true });

  console.log('Assets dasar siap');
}

updateAssets();
