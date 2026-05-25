"use client";
import Queue from "@/components/Queue";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCopyOutline } from "react-icons/io5";
import { FaQrcode, FaCheck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Loading from "./loading";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState("");
  const [queueData, setQueueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
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

  const queueUrl = queueData
    ? `${process.env.NEXT_PUBLIC_BASEURL}/queue?qId=${queueData?.queueId}`
    : "";

  return (
    <>
      <div className="pt-28 px-4 md:px-20 max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] uppercase tracking-[0.2em] text-white/60 mb-3">
              <HiSparkles className="w-3 h-3 text-accent" />
              Your Live Session
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-white">Queue Control</h1>
            <p className="text-sm text-white/50 mt-2">
              Share this link or QR with your audience to start collecting requests.
            </p>
          </div>
        </div>

        {/* URL card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 noise relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent/15 blur-[100px]" />

          <div className="relative">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
              Queue URL
            </label>

            {isLoading ? (
              <Skeleton className="mt-3 h-12 w-full md:w-2/3" />
            ) : (
              <div className="mt-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                <div className="flex-1 glass-input rounded-xl px-4 py-3 text-sm text-white/80 break-all font-mono">
                  {queueUrl || "Generating..."}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipBoard(queueUrl)}
                    className="h-12 w-12 rounded-xl shrink-0"
                    title="Copy link"
                  >
                    {copySuccess ? (
                      <FaCheck className="h-4 w-4 text-accent" />
                    ) : (
                      <IoCopyOutline className="h-4 w-4" />
                    )}
                  </Button>
                  <Button className="h-12 rounded-xl flex items-center gap-2 shrink-0">
                    <FaQrcode className="w-4 h-4" /> Generate QR
                  </Button>
                </div>
              </div>
            )}

            {copySuccess && (
              <div className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent animate-fade-up">
                <FaCheck className="w-3 h-3" /> {copySuccess}
              </div>
            )}
          </div>
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
