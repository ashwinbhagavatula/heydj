'use client'
import React, {useState, useEffect} from 'react'
import QueueCard from './QueueCard'
import { FaSort } from "react-icons/fa";
const Queue = ({page, queueData, handleSetQueueData}) => {
    const [sortOrder, setSortOrder] = useState('desc');

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'));
    };

    const sortedQueue = queueData?.songQueue.sort((a, b) => {
        return sortOrder === 'desc' ? b.upvotes - a.upvotes : a.upvotes - b.upvotes;
    });

    return (
    <div className='mt-10 md:mt-20 px-4 md:px-20 mb-24'>
        <div className='flex items-center justify-between mb-6'>
        <h2 className='text-3xl font-bold text-primary '>{page === "queuePage" ? "Song Requests Queue" : "My Queue"}</h2>
        <button onClick={toggleSortOrder} className='text-primary'>
          <FaSort size={24} />
        </button>
        </div>
        {queueData && queueData.songQueue && queueData.songQueue.length > 0 ? 
            (
                sortedQueue.map((song) => (
                    <QueueCard 
                        key={song.songId} 
                        album ={song.songAlbum} 
                        artist = {song.artist}
                        upvotes = {song.upvotes} 
                        songname = {song.songName} 
                        cover={song.songCover}
                    />
                ))
            ) : (
                <p>No songs in the queue. Search your favourites add add to queue.</p>
            )
        }
    </div>
    )
}

export default Queue