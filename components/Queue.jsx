'use client'
import React from 'react'
import QueueCard from './QueueCard'

const Queue = ({page, queueData, handleSetQueueData}) => {
    
    return (
    <div className='mt-16 md:mt-20 px-4 md:px-20 mb-24'>
        <h2 className='text-3xl font-bold text-primary mb-6'>{page === "queuePage" ? "Song Requests Queue" : "My Queue"}</h2>

        {queueData && queueData.songQueue && queueData.songQueue.length > 0 ? 
            (
                queueData.songQueue.map((song) => (
                    <QueueCard key={song.songId} album  = "Sherreeen" artist = "Ed Sheeren"
                    upvotes = {100000000} songname = "Perfect is the sunlight there"/>
                ))
            ) : (
                <p>No songs in the queue.</p>
            )
        }
        <QueueCard 
            songname = "Perfect is the sunlight there"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
            page = {page}
        />
        <QueueCard 
            songname = "Perfect"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
            page = {page}
        />
        <QueueCard 
            songname = "Perfect is the sunlight there"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
            page = {page}
        />
        <QueueCard 
            songname = "Perfect"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
            page = {page}
        />
    </div>
    )
}

export default Queue