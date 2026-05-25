"use client";
import Queue from "@/components/Queue";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/home/loading";
import { FiSearch } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const PublicQueue = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [queueData, setQueueData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const queueId = searchParams.get("qId");

  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (queueId && !isModalOpen) {
      const getQueue = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/queue?queueId=${queueId}`);
          setQueueData(response.data.queue);
        } catch (error) {
          console.error("Error fetching queue data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      getQueue();
    }
  }, [queueId, isModalOpen]);

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post("/api/spotify/token");

      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const handleSetQueueData = (queue) => {
    setQueueData(queue);
  };

  const handleSearch = async () => {
    if (searchQuery && accessToken) {
      setIsSearching(true);
      try {
        const response = await axios.get(
          `/api/spotify/search?song=${searchQuery}&accessToken=${accessToken}`
        );
        const searchResults = response.data.tracks.items;
        setSongs(searchResults);
        setSearchQuery("");
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error searching for song:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="pt-28 px-4 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] uppercase tracking-[0.2em] text-white/60 mb-3">
            <HiSparkles className="w-3 h-3 text-accent" />
            Live Queue
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-white">
            Influence the Vibe
          </h1>
          <p className="text-sm text-white/50 mt-2 max-w-md mx-auto">
            Search a track, request it, and upvote what you want to hear next.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-accent-deep/30 to-accent/30 rounded-2xl blur-lg opacity-50" />
          <div className="relative glass-strong rounded-2xl p-2 flex gap-2 items-center">
            <FiSearch className="w-5 h-5 text-white/40 ml-3" />
            <Input
              type="text"
              placeholder="Which song to play next?"
              className="bg-transparent border-0 shadow-none focus-visible:ring-0 focus:!shadow-none flex-1 h-11"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              value={searchQuery}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery}
              className="h-11"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading page={"queuePage"} />
      ) : (
        <Queue
          page={"queuePage"}
          queueData={queueData}
          handleSetQueueData={handleSetQueueData}
          setQueueData={setQueueData}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        songs={songs}
        queueId={queueId}
      />
    </div>
  );
};

export default PublicQueue;
