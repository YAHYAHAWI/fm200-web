export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const WEBHOOK_URL = "https://primary-production-2236a.up.railway.app/webhook/fm200-calc";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (typeof data === "string") {
      return res.status(response.status).send(data);
    }

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Proxy request failed",
      error: error.message
    });
  }
}
