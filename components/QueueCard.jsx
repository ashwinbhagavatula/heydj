import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
function QueueCard(props) {
  return (
    <div className='mt-3 bg-card rounded-lg md:rounded-xl py-4 px-2 md:px-8'>
        <div className='flex justify-between items-center gap-2'>
            <div className='flex gap-4 md:gap-10 grow'>
                <Image alt="song cover" src= {logo} className='w-20 h-20 md:w-28 md:h-28' />
                <div className='flex flex-col gap-1'>
                    <p className='text-primary text-xl md:text-2xl font-semibold'>{props.songname}</p>
                    <p className='md:text-lg'>{props.album}</p>
                    <p className='text-lg'>{props.artist}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 max-w-28 md:max-w-48'>
                <h3 className='text-primary text-lg flex flex-wrap'>Upvotes: {props.upvotes}</h3>
                {props.page === "queuePage" ? (
                    <Button className="bg-accent">Upvote</Button>
                ):(
                    <Button className="bg-destructive">Remove</Button>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default QueueCard