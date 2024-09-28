import connectMongo from "@/database/db";
import Queue from "@/models/queue";
import User from "@/models/user";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    await connectMongo();
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return new NextResponse("Missing User ID", { status: 400 });
    }

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return new NextResponse("Invalid User", { status: 400 });
    }
    // console.log(user);
    // Fetch queues
    const queues = await Queue.findOne({ userId: userId });
    if (!queues) {
      console.error("There are no queues for this user");
    }
    // Return the response
    // console.log(queues);
    return new NextResponse(
      JSON.stringify({
        queue: queues,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Error in fetching queues", { status: 500 });
  }
};

export const POST = async (req) => {
  const data = await req.json();
  // console.log("REQUEST RECIEVED", data);
  try {
    await connectMongo();
    const queueExists = await Queue.findOne({ userId: data.userId });
    if (queueExists) throw new Error("Queue already exists for this user");

    //create queue
    const queue = await Queue.create({
      userId: data.userId,
    });

    return new Response(JSON.stringify(queue), { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export const DELETE = async (req) => {
  const songId = req.nextUrl.searchParams.get("songId");
  const authHeader = req.headers.get("Authorization");
  const userId = authHeader ? authHeader.split(" ")[1] : null;
  try {
    await connectMongo();
    console.log(userId, songId, authHeader);
    const result = await Queue.updateOne(
      { userId: userId }, // Find the user
      { $pull: { songQueue: { songId: songId } } } // Remove the song from the array
    );
    if (result.modifiedCount > 0) {
      return new Response("Song removed from queue.", { status: 200 });
    } else {
      return new Response("Song not found in queue.", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Failed to delete song." });
  }
};
