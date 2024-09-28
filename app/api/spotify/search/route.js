// app/api/spotify/search/route.js
import axios from "axios";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const songName = searchParams.get("song"); // Get the song name from the query params
  const accessToken = searchParams.get("accessToken"); // Get the access token from the query params

  if (!songName || !accessToken) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: songName,
        type: "track", // Specify that you want to search for tracks
        market: "ES", // Replace with your desired market or make it dynamic
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from Spotify:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
