export default async function handler(req, res) {
  const { link, template } = req.body;

  if (!link) {
    return res.status(400).json({ error: "No link" });
  }

  // sementara FAKE AI dulu (biar jalan)
  let script = "";

  if (template === "ugc") {
    script = "Gue nemu produk viral ini...\nSerius ini worth it banget!";
  }

  if (template === "unboxing") {
    script = "Baru dateng!\nKita unboxing sekarang...";
  }

  if (template === "hook") {
    script = "STOP SCROLL!\nIni produk lagi rame banget!";
  }

  if (template === "before") {
    script = "Dulu vs sekarang...\nPerubahannya gila!";
  }

  res.status(200).json({ script });
}
