// app/api/reverse-geocode/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Missing coordinates" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "ResellKH/1.0 (huotsreypov7@gmail.com)",
        },
      }
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error reverse geocoding:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch location" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
