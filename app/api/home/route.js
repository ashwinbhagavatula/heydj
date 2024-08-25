import connectMongo from "@/database/db";
const { Queue } = require("@/models/queue");

export const GET = async (query) => {
  try {
    await connectMongo();
    const { userId } = query;
    const queues = await Queue.findOne({ userId: userId });

    return new Response(
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
