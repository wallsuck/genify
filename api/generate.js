export default async function handler(req, res) {
  try {
    const { link, template } = req.body;

    if (!link) {
      return res.status(400).json({ error: "Link kosong" });
    }

    const prompt = `
Buat script video TikTok pendek bahasa Indonesia.

Template: ${template}
Produk: ${link}

Gaya:
- santai seperti creator TikTok
- ada hook di awal
- tidak kaku
- maksimal 2-3 kalimat pendek
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // DEBUG (kalau mau lihat error di Vercel log)
    console.log(JSON.stringify(data));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(200).json({
        script: "AI tidak menghasilkan teks 😢",
      });
    }

    return res.status(200).json({
      script: text.trim(),
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      script: "Server error ❌",
    });
  }
}
