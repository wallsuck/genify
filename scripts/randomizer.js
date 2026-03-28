// /scripts/randomizer.js
const fs = require('fs');
const path = require('path');

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickTemplate() {
  const templates = fs.readdirSync(path.join(__dirname, '../templates')).filter(f => fs.statSync(path.join(__dirname, '../templates', f)).isDirectory());
  return pickRandom(templates);
}

function pickMusic() {
  const musicFolder = path.join(__dirname, '../assets/music');
  if (!fs.existsSync(musicFolder)) return '';
  const files = fs.readdirSync(musicFolder).filter(f => f.endsWith('.mp3'));
  return pickRandom(files) ? path.join(musicFolder, pickRandom(files)) : '';
}

function pickSticker() {
  const stickerFolder = path.join(__dirname, '../assets/stickers');
  if (!fs.existsSync(stickerFolder)) return '';
  const files = fs.readdirSync(stickerFolder).filter(f => f.endsWith('.png') || f.endsWith('.gif'));
  return pickRandom(files) ? path.join(stickerFolder, pickRandom(files)) : '';
}

module.exports = { pickTemplate, pickMusic, pickSticker };
