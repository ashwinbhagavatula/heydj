"use client";
import Queue from "@/components/Queue";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { POST } from "../api/home/route";
import axios from "axios";
import { IoCopyOutline } from "react-icons/io5";
import Loading from "./loading";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState("");
  const [queueData, setQueueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        try {
          const queue = await axios.get(
            `/api/home?userId=${session.user.userId}`
          );
          // console.log(queue);
          if (!queue || queue.data.queue === null) {
            const resp = await axios.post("/api/home", {
              userId: session.user.userId,
            });

            if (resp) {
              const queue = await axios.get(
                `/api/home?userId=${session.user.userId}`
              );
              setQueueData(queue.data.queue);
            }
          }
          setQueueData(queue.data.queue);
        } catch (error) {
          console.error("Error creating queue", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    createQueue();
  }, [session]);

  const handleSetQueueData = (queue) => {
    setQueueData(queue);
  };

  const copyToClipBoard = (value) => {
    navigator.clipboard.writeText(value);
    setCopySuccess("Link copied!");

    setTimeout(() => {
      setCopySuccess("");
    }, 2000);
  };
  return (
    <>
      <div className="mt-10 px-4 md:px-20">
        <h1 className="text-3xl font-semibold text-primary">Queue URL</h1>
        {isLoading ? (
          <Skeleton className="mt-4 max-w-full break-all bg-secondary px-4 py-2 rounded-lg md:rounded-xl md:w-1/2 w-[100%] h-10"></Skeleton>
        ) : (
          <p className="mt-4 max-w-full break-all bg-secondary w-fit px-4 py-2 rounded-lg md:rounded-xl">
            {queueData &&
              `${process.env.NEXT_PUBLIC_BASEURL}/queue?qId=${queueData?.queueId}`}
          </p>
        )}

        <div className="flex gap-4 items-center mt-4">
          <Button className="bg-accent ">Generate QR</Button>
          <Button variant="outline" size="icon" className="hover:bg-accent">
            <IoCopyOutline
              onClick={(event) =>
                copyToClipBoard(
                  `${process.env.NEXT_PUBLIC_BASEURL}/queue?qId=${queueData?.queueId}`
                )
              }
              className="h-4 w-4"
            />
          </Button>
          {/* Show the copy success message */}
          {copySuccess && (
            <div className="text-primary bg-secondary p-2 rounded-lg md:rounded-xl">
              {copySuccess}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <Queue
          page={"home"}
          queueData={queueData}
          handleSetQueueData={handleSetQueueData}
          setQueueData={setQueueData}
        />
      )}
    </>
  );
}

export default Page;
