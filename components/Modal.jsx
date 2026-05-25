// components/Modal.js
import React from 'react';
import { Button } from './ui/button'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import axios from "axios";

const Modal = ({ isOpen, onClose, songs, queueId, setSearchQuery }) => {
  if (!isOpen) return null;

  const addToQueue = async (song) => {
    try {
      const response = await axios.put(`/api/queue/search?queueId=${queueId}`,
        {
          songName: song.name,
          artists: song.artists.map((artist) => artist.name).join(', '),
          albumName: song.album.name,
          coverUrl: song.album.images[0]?.url,
        },
      );

      const data = response.data;
      console.log('Song added to queue:', data);
      onClose();

    } catch (error) {
      console.error('Error adding song to queue:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60 animate-scale-in"
      onClick={onClose}
    >
      <div
        className="glass-strong noise relative rounded-3xl md:p-8 p-5 w-full md:w-[1000px] max-w-4xl h-[80vh] max-h-[800px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

        <div className='relative flex justify-between items-center mb-6'>
          <div>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-[10px] uppercase tracking-[0.2em] text-accent mb-2'>
              <HiOutlineMusicalNote className='w-3 h-3' /> Spotify
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gradient-white">Search Results</h2>
          </div>
          <button
            className="text-white/60 hover:text-accent transition-colors"
            onClick={onClose}
          >
            <IoMdCloseCircleOutline className='w-8 h-8 hover:scale-110 duration-300 transition-all' />
          </button>
        </div>

        <ul className='relative flex-1 overflow-y-auto pr-2 space-y-2'>
          {songs.length === 0 ? (
            <li className='text-center text-white/50 py-10'>No tracks found</li>
          ) : songs.map((song) => (
            <li
              key={song.id}
              className="group glass-card rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(255,42,61,0.10)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                <div className='relative shrink-0'>
                  <div className='absolute inset-0 rounded-xl bg-accent/30 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500' />
                  <img
                    src={song.album.images[0]?.url}
                    alt={song.name}
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl border border-white/10 object-cover"
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <div className="font-semibold text-white text-sm md:text-base truncate">
                    {song.name}
                  </div>
                  <div className="text-white/70 text-xs md:text-sm truncate">
                    {song.artists.map((artist) => artist.name).join(', ')}
                  </div>
                  <div className="text-[11px] md:text-xs text-white/40 truncate">
                    {song.album.name}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => addToQueue(song)}
                className='shrink-0 text-xs md:text-sm'
              >
                Add to Queue
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
