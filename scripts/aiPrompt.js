// /scripts/aiPrompt.js
const scraper = require('./scraper');

function generateText(urlOrDummy) {
  // Bisa ambil data dari scraper
  let data;
  if (urlOrDummy.startsWith('http')) {
    data = scraper.scrapeLink(urlOrDummy);
  } else {
    // dummy
    data = { name: 'Produk Contoh', review: 'Produk ini sangat bagus!' };
  }
  return `${data.name} - ${data.review}`;
}

module.exports = { generateText };
