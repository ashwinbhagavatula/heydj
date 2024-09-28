"use client";
import Queue from "@/components/Queue";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { POST } from "../api/home/route";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queueDate, setQueueData] = useState({});
  const queueId = searchParams.get("qId");

  useEffect(() => {
    if (queueId) {
      // Only run the effect if queueId is available
      const getQueue = async () => {
        try {
          const response = await fetch(`/api/queue?queueId=${queueId}`);
          const data = await response.json();
          setQueueData(data);
        } catch (error) {
          console.error("Error fetching queue data:", error);
        }
      };

      getQueue();
    }
  }, [queueId]);

  const handleSetQueueData = (queue) => {
    setQueueData(queue);
  };
  return (
    <>
      <Queue
        page={"queuePage"}
        queueData={queueDate}
        handleSetQueueData={handleSetQueueData}
      />
    </>
  );
};

export default Page;
