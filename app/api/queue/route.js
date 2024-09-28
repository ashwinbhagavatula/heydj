import connectMongo from "@/database/db";
import Queue from "@/models/queue";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectMongo();
    const queueId = req.nextUrl.searchParams.get("queueId");

    const queues = await Queue.findOne({ queueId: queueId });
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
