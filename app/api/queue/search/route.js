import connectMongo from "@/database/db";
import Queue from "@/models/queue";

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
