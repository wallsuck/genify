// /scripts/generateVideo.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const randomizer = require('./randomizer');
const aiPrompt = require('./aiPrompt');

// Ambil template & elemen random
const template = randomizer.pickTemplate();
const music = randomizer.pickMusic();
const sticker = randomizer.pickSticker();

const templateFolder = path.join(__dirname, '../templates', template);
const baseVideo = path.join(templateFolder, 'base.mp4');
const outputFile = path.join(__dirname, '../generated/videos', `${template}_${Date.now()}.mp4`);

// Ambil teks AI
const text = aiPrompt.generateText('contoh produk');

// Generate video pakai FFmpeg (versi minimal)
try {
  // Overlay teks & musik sederhana
  const cmd = `ffmpeg -i "${baseVideo}" -vf "drawtext=text='${text}':x=50:y=50:fontsize=36:fontcolor=white" -i "${music}" -shortest "${outputFile}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('Video berhasil dibuat di', outputFile);
} catch (err) {
  console.error('Gagal generate video:', err.message);
}
