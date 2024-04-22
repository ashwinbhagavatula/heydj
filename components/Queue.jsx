'use client'
import React from 'react'
import QueueCard from './QueueCard'

function Queue() {
  return (
    <div className='mt-16 md:mt-20 px-4 md:px-20 mb-24'>
        <h2 className='text-3xl font-bold text-primary mb-6'>My Queue</h2>
        <QueueCard 
            songname = "Perfect is the sunlight there"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
        />
        <QueueCard 
            songname = "Perfect"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
        />
        <QueueCard 
            songname = "Perfect is the sunlight there"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
        />
        <QueueCard 
            songname = "Perfect"
            album  = "Sherreeen"
            artist = "Ed Sheeren"
            upvotes = {100000000}
        />
    </div>
  )
}

export default Queue