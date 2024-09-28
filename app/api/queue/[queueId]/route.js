import connectMongo from "@/database/db";
import Queue from "@/models/queue";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const songId = req.nextUrl.searchParams.get("songId");
  const queueId = params.queueId;
  try {
    await connectMongo();
    const queue = await Queue.findOne({ queueId });
    if (!queue) throw new Error("Queue not found");

    // Find the song within the queue
    const songIndex = queue.songQueue.findIndex(
      (song) => song.songId === songId
    );
    if (songIndex === -1) throw new Error("Song not found in the queue");

    // Increment the upvote count
    queue.songQueue[songIndex].upvotes += 1;

    // Save the updated queue back to the database
    await queue.save();

    return new Response(JSON.stringify(queue.songQueue[songIndex]), {
      status: 200,
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
