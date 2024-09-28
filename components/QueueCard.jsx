import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import { Button } from './ui/button'
const QueueCard = (props) => {

    const handleRemove = () => {
        props.onRemove(props.songId); // Call the onRemove function passed from parent
    };

    const handleUpvote = () => {
        props.onUpvote(props.songId); // Call the onRemove function passed from parent
    };
    
    return (
    <div key={props.songId} className='mt-3 bg-card rounded-lg md:rounded-xl py-4 px-2 md:px-8'>
        <div className='flex justify-between items-center gap-2'>
            <div className='flex gap-4 md:gap-10 grow'>
                <img alt="song cover" src= {props.cover} className='w-20 h-20 md:w-28 md:h-28 rounded-full' />
                <div className='flex flex-col gap-1'>
                    <p className='text-primary text-xl md:text-2xl font-semibold'>{props.songname}</p>
                    <p className='md:text-lg text-sm text-gray-400'>{props.artist}</p>
                    <p className='md:text-lg text-xs text-gray-500'>{props.album}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 max-w-28 md:max-w-48'>
                <div className=' flex flex-wrap items-center justify-center'>
                <h3 className='text-primary text-lg flex flex-wrap items-center'>Upvotes: </h3><span className="text-destructive ml-3 font-bold text-xl">{props.upvotes}</span>
                </div>
                {props.page === "queuePage" ? (
                    <Button className="bg-accent hover:bg-destructive " onClick={handleUpvote}>Upvote</Button>
                ):(
                    <Button className="bg-destructive hover:bg-accent" onClick={handleRemove}>Remove</Button>
                )}
                
            </div>
        </div>
    </div>
    )
}

export default QueueCard;