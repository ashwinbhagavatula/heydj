import React from 'react'
import { Button } from './ui/button'
import { BiUpvote } from 'react-icons/bi'
import { HiOutlineTrash } from 'react-icons/hi'

const QueueCard = (props) => {

    const handleRemove = () => {
        props.onRemove(props.songId);
    };

    const handleUpvote = () => {
        props.onUpvote(props.songId);
    };

    return (
        <div
            key={props.songId}
            className='group mt-3 glass-card rounded-2xl py-4 px-4 md:px-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_8px_32px_rgba(255,42,61,0.15)]'
        >
            <div className='flex justify-between items-center gap-3'>
                <div className='flex gap-4 md:gap-6 grow items-center min-w-0'>
                    {/* Album cover with glow ring */}
                    <div className='relative shrink-0'>
                        <div className='absolute inset-0 rounded-2xl bg-accent/30 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500' />
                        <img
                            alt="song cover"
                            src={props.cover}
                            className='relative w-16 h-16 md:w-24 md:h-24 rounded-2xl object-cover border border-white/10'
                        />
                    </div>

                    {/* Song meta */}
                    <div className='flex flex-col gap-0.5 min-w-0'>
                        <p className='text-white text-base md:text-xl font-semibold truncate'>
                            {props.songname}
                        </p>
                        <p className='text-white/60 text-xs md:text-sm truncate'>
                            {props.artist}
                        </p>
                        <p className='text-white/40 text-xs hidden md:block truncate'>
                            {props.album}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className='flex flex-col items-end gap-2 md:gap-3 shrink-0'>
                    <div className='flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-accent/20'>
                        <BiUpvote className='w-3.5 h-3.5 text-accent' />
                        <span className="text-white font-semibold text-sm tabular-nums">
                            {props.upvotes}
                        </span>
                    </div>

                    {props.page === "queuePage" ? (
                        <Button size="sm" onClick={handleUpvote} className='flex items-center gap-1.5'>
                            <BiUpvote className='w-3.5 h-3.5' />
                            <span className='hidden sm:inline'>Upvote</span>
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleRemove}
                            className='flex items-center gap-1.5'
                        >
                            <HiOutlineTrash className='w-3.5 h-3.5' />
                            <span className='hidden sm:inline'>Remove</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QueueCard;
