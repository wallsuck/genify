export default async function handler(req, res) {
  try {
    const { link, template } = req.body;

    const prompt = `
Buat script video TikTok bahasa Indonesia.

Produk: ${link}
Template: ${template}

Gaya santai, hook di awal, singkat.
`;

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await r.json();

    console.log("FULL DATA:", JSON.stringify(data));

    // 🔥 HANDLE SEMUA KEMUNGKINAN
    let text = null;

    if (data?.candidates?.length) {
      const parts = data.candidates[0].content.parts;

      if (Array.isArray(parts)) {
        text = parts.map(p => p.text).join("");
      }
    }

    // fallback kalau struktur beda
    if (!text && data?.promptFeedback) {
      text = "Konten diblokir oleh Gemini 😅";
    }

    if (!text) {
      text = "Gemini tidak kasih respon 😢";
    }

    return res.status(200).json({
      script: text
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      script: "Server error ❌"
    });
  }
}
