"use client";
import Queue from "@/components/Queue";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { POST } from "../api/home/route";
import axios from "axios";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [queueDate, setQueueData] = useState({});
  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session) {
      router.push("/"); // Redirect if no session
    }
  }, [router, session, status]);

  useEffect(() => {
    if (status === "loading") return;
    const createQueue = async () => {
      if (session) {
        try {
          const resp = await axios.post("/api/home", {
            userId: session.user.userId,
          });

          setQueueData(resp.data);
        } catch (error) {
          console.error("Error creating queue", error);
        }
      }
    };
    createQueue();
  }, [session]);

  const handleSetQueueData = (queue) => {
    setQueueData(queue);
  };
  return (
    <>
      <div className="mt-10 px-4 md:px-20">
        <h1 className="text-3xl font-semibold text-primary">Queue URL</h1>
        <p className="mt-4 max-w-full break-all">
          heyDJ.tech/asasfdsadf/asdasd/asdasddasdsasddsdsdasdasdsadasdasd
        </p>
        <Button className="bg-accent mt-4">Generate QR</Button>
      </div>
      <Queue queueData={queueDate} handleSetQueueData={handleSetQueueData} />
    </>
  );
}

export default Page;
