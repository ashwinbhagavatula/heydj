import connectMongo from "@/database/db";
import Queue from "@/models/queue";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    await connectMongo();
    const queueId = req.nextUrl.searchParams.get("queueId");

    // Retrieve data from the request body
    const { albumName, artists, coverUrl, songName } = await req.json();
    console.log(albumName, artists, coverUrl, songName);
    // Check if the queue exists
    const queue = await Queue.findOne({ queueId });
    if (!queue) {
      return new NextResponse("Queue not found", { status: 404 });
    }

    // Check if the song already exists in the queue
    const existingSongIndex = queue.songQueue.findIndex(
      (song) =>
        song.songName === songName &&
        song.artist === artists &&
        song.songAlbum === albumName
    );

    if (existingSongIndex !== -1) {
      // If the song exists, increment the upvote count
      queue.songQueue[existingSongIndex].upvotes += 1;
    } else {
      // If the song doesn't exist, add it to the queue
      queue.songQueue.push({
        songId: uuidv4(),
        songCover: coverUrl,
        songAlbum: albumName,
        songName,
        upvotes: 1,
        artist: artists, // Convert array to a comma-separated string
      });
    }

    // Save the updated queue
    await queue.save();

    // Return the updated queue
    return new NextResponse(
      JSON.stringify({
        queue,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in fetching queues:", error);
    return new Response("Error in updating queue", { status: 500 });
  }
};
