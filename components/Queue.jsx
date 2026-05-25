'use client'
import React, { useState, useEffect } from 'react'
import QueueCard from './QueueCard'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSort } from "react-icons/fa";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { toast } from '@/components/ui/use-toast'
import axios from "axios";

const Queue = ({ page, queueData, handleSetQueueData, setQueueData }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedQueueData, setSortedQueueData] = useState(null);

    useEffect(() => {
        if (status === "loading") return;
    }, [router, session, status]);

    useEffect(() => {
        if (Array.isArray(queueData?.songQueue)) {
            const sortedQueue = [...queueData.songQueue].sort((a, b) => {
                return sortOrder === 'desc' ? b.upvotes - a.upvotes : a.upvotes - b.upvotes;
            });
            setSortedQueueData(sortedQueue);
        } else {
            setSortedQueueData([]);
        }

    }, [queueData, sortOrder]);


    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'));
    };

    const handleRemoveSong = async (songId) => {
        try {
            const resp = await axios.delete(`/api/home?songId=${songId}`, {
                headers: {
                    'Authorization': `Bearer ${session ? session.user.userId : ""}`,
                },
            });
            if (resp.status === 200) {
                setQueueData((prevQueue) => {
                    return {
                        ...prevQueue,
                        songQueue: prevQueue?.songQueue?.filter(song => song.songId !== songId) || [],
                    };
                });
            } else {
                console.error("Failed to remove song:", resp.data.message);
            }
        } catch (error) {
            console.error("Error removing song:", error);
        }
    };

    const handleUpvote = async (songId) => {
        try {
            const upvotedSongs = JSON.parse(localStorage.getItem('upvotedSongs')) || [];

            if (upvotedSongs.includes(songId)) {
                toast({
                    title: "Hold up! You've already hyped this track \u{1F525}",
                    description: "How about spicing things up? Search for another banger using the search bar!"
                })
                return;
            }
            setSortedQueueData((prevQueue) => {
                return prevQueue.map(song =>
                    song.songId === songId
                        ? { ...song, upvotes: song.upvotes + 1 }
                        : song
                );
            });

            try {
                const resp = await axios.put(`/api/queue/${queueData?.queueId}?songId=${songId}`);

                if (resp.status !== 200) {
                    throw new Error('Failed to upvote');
                }
                upvotedSongs.push(songId);
                localStorage.setItem('upvotedSongs', JSON.stringify(upvotedSongs));
            } catch (error) {
                console.log("Error Upvoting the song: ", error);
                setSortedQueueData((prevQueue) => {
                    return prevQueue.map(song =>
                        song.songId === songId
                            ? { ...song, upvotes: song.upvotes - 1 }
                            : song
                    );
                });
            }
        } catch (error) {
            console.log("Error Upvoting the song: ", error)
        }
    }

    const isEmpty = queueData && sortedQueueData && (!queueData.songQueue || queueData.songQueue.length === 0);

    return (
        <div className='mt-10 md:mt-14 px-4 md:px-20 max-w-7xl mx-auto mb-16'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h2 className='text-2xl md:text-3xl font-bold text-gradient-white'>
                        {page === "queuePage" ? "Song Requests Queue" : "My Queue"}
                    </h2>
                    {sortedQueueData?.length > 0 && (
                        <p className='text-xs text-white/40 mt-1 uppercase tracking-wider'>
                            {sortedQueueData.length} {sortedQueueData.length === 1 ? "song" : "songs"} in queue
                        </p>
                    )}
                </div>
                <button
                    onClick={toggleSortOrder}
                    className='flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 hover:border-accent/40 hover:bg-white/5 transition-all text-sm text-white/80'
                >
                    <span className='hidden md:block'>
                        {sortOrder === 'desc' ? 'Top first' : 'New first'}
                    </span>
                    <FaSort size={14} />
                </button>
            </div>

            {queueData && sortedQueueData && queueData.songQueue && (
                queueData.songQueue.length > 0 ? (
                    sortedQueueData.map((song) => (
                        <div key={song.songId}>
                            <QueueCard
                                songId={song.songId}
                                album={song.songAlbum}
                                artist={song.artist}
                                upvotes={song.upvotes}
                                songname={song.songName}
                                cover={song.songCover}
                                page={page}
                                onRemove={handleRemoveSong}
                                onUpvote={handleUpvote}
                            />
                        </div>
                    ))
                ) : (
                    <div className='glass-card rounded-3xl p-10 md:p-14 text-center'>
                        <div className='w-16 h-16 mx-auto rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4'>
                            <HiOutlineMusicalNote className='w-7 h-7 text-accent' />
                        </div>
                        <h3 className='text-lg font-semibold text-white mb-1'>The queue is quiet</h3>
                        <p className='text-sm text-white/50 max-w-sm mx-auto'>
                            {page === "queuePage"
                                ? "Search a track above to kick things off."
                                : "No songs yet — share your queue link to let the crowd request."}
                        </p>
                    </div>
                )
            )}

            {!queueData && (
                <div className='glass-card rounded-3xl p-10 text-center text-white/50 text-sm'>
                    Loading queue...
                </div>
            )}
        </div>
    )
}
export default Queue
