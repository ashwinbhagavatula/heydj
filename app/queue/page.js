"use client";
import Queue from "@/components/Queue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { POST } from "../api/home/route";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queueData, setQueueData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const queueId = searchParams.get("qId");
  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (queueId) {
      // Only run the effect if queueId is available
      const getQueue = async () => {
        try {
          const response = await axios.get(`/api/queue?queueId=${queueId}`);
          setQueueData(response.data.queue);
        } catch (error) {
          console.error("Error fetching queue data:", error);
        }
      };

      getQueue();
    }
  }, [queueId]);

  // Example function to fetch the access token
  const fetchAccessToken = async () => {
    try {
      const response = await axios.post("/api/spotify/token");

      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
      console.log("Access Token:", accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  // const publicresponse = await axios.get(
  //   `/api/queue/search?queueId=${queueId}`
  // );
  const handleSetQueueData = (queue) => {
    setQueueData(queue);
  };

  const handleSearch = async () => {
    if (searchQuery && accessToken) {
      try {
        const response = await axios.get(
          `/api/spotify/search?song=${searchQuery}&accessToken=${accessToken}`
        );
        const searchResults = response.data.tracks.items; // Adjust this based on the response structure
        console.log("Search Results:", searchResults);
        // Store the search results in a state or handle it as needed
      } catch (error) {
        console.error("Error searching for song:", error);
      }
    }
  };

  return (
    <>
      <div className="flex gap-2 px-4 md:px-20 mt-8 md:mt-16">
        <Input
          type="text"
          placeholder="Which song to play next ?"
          className="flex justify-center items-center mx-auto focus:border-accent"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="outline"
          className="hover:bg-accent active:bg-accent"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <Queue
        page={"queuePage"}
        queueData={queueData}
        handleSetQueueData={handleSetQueueData}
      />
    </>
  );
};

export default Page;
