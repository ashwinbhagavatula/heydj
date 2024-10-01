'use client'
import React, {useState, useEffect} from 'react'
import QueueCard from './QueueCard'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSort } from "react-icons/fa";
import { toast } from '@/components/ui/use-toast'
import axios from "axios";
const Queue = ({page, queueData, handleSetQueueData, setQueueData}) => {
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
            console.log(sortedQueue);
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
            // Make a DELETE request to the API
            const resp = await axios.delete(`/api/home?songId=${songId}`,{
                headers: {
                    'Authorization': `Bearer ${session ? session.user.userId : ""}`, // Use the user ID as a Bearer token
                },
            });
            // Update the state to remove the song
            if (resp.status === 200) {
                // Update the state to remove the song
                setQueueData((prevQueue) => {
                    // Ensure that we return a new object maintaining the existing structure
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
    // console.log(queueData)

    const handleUpvote =  async (songId) =>{
        try {
            const upvotedSongs = JSON.parse(localStorage.getItem('upvotedSongs')) || [];

            if(upvotedSongs.includes(songId)){
                toast({
                    title: "Hold up! You've already hyped this track \u{1F525}",
                    description: "How about spicing things up? Search for another banger using the search bar!"
                })
                return;
            }
            setSortedQueueData((prevQueue) => {
                return prevQueue.map(song => 
                    song.songId === songId 
                    ? { ...song, upvotes: song.upvotes + 1 } // Decrease upvotes by 1
                    : song // Keep the rest of the songs unchanged
                );
            });

            try {
                // Send the upvote request to the backend
                // console.log(queueData.queueId)
                const resp = await axios.put(`/api/queue/${queueData?.queueId}?songId=${songId}`);
                
                if (resp.status !== 200) {
                    throw new Error('Failed to upvote');
                }
                upvotedSongs.push(songId);
                localStorage.setItem('upvotedSongs', JSON.stringify(upvotedSongs));
            } catch (error) {
                console.log("Error Upvoting the song: ", error);
                // Rollback the optimistic update in case of error
                setSortedQueueData((prevQueue) => {
                    return prevQueue.map(song => 
                        song.songId === songId 
                        ? { ...song, upvotes: song.upvotes - 1 } // Decrease upvotes by 1
                        : song // Keep the rest of the songs unchanged
                    );
                });
            }
        }catch(error){
            console.log("Error Upvoting the song: ", error)
        }
    }
    // console.log(queueData, sortedQueueData)
    return (
    <div className='mt-10 md:mt-20 px-4 md:px-20 mb-10'>
        <div className='flex items-center justify-between mb-6'>
        <h2 className='text-3xl font-bold text-primary '>{page === "queuePage" ? "Song Requests Queue" : "My Queue"}</h2>
        <button onClick={toggleSortOrder} className='text-primary flex gap-2'>
            <span className='hidden md:block'>Sort</span>
          <FaSort size={24} />
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
                <div>No songs in the queue. Set the flow according to your taste.</div>
            )
        )}
    </div>

    )
}
export default Queue