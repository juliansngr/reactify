export default async function Handler(req, res) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return res
          .status(response.status)
          .json({ error: "Fehler beim Abrufen des Bildes" });
      }
      throw new Error(`Fetch Error! ${response.status}`);
    }

    const data = await response.json("");

    res.status(200).json({ imageUrl: data.urls.full });
  } catch (error) {
    console.log("API Error: ", error);
    res.status(500).json({ error: "Serverfehler beim Abrufen des Bildes" });
  }

  res.status(200).json();
}
