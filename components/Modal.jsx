// components/Modal.js
import React from 'react';
import { Button } from './ui/button'
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
const Modal = ({ isOpen, onClose, songs, queueId, setSearchQuery}) => {
  if (!isOpen) return null;

  const addToQueue = async (song) => {
    try {
      const response = await axios.put(`/api/queue/search?queueId=${queueId}`, 
        {
          songName: song.name,
          artists: song.artists.map((artist) => artist.name).join(', '), // Convert artists array to comma-separated string
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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-card border-2 border-background md:p-6 p-4 rounded shadow-xl w-[98%] md:w-[1000px] max-w-4xl h-2/3 max-h-7xl overflow-y-scroll">
        <div className='flex justify-between mb-8'>
        <h2 className="text-xl font-bold ">Search Results</h2>
        <button className="text-destructive" onClick={onClose}><IoMdCloseCircleOutline className='w-6 h-6 hover:scale-110 duration-300 transition-all'/></button>
        </div>
        <ul>
          {songs.map((song) => (
            <li key={song.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={song.album.images[0]?.url} 
                  alt={song.name}
                  className="w-16 h-16 md:w-20 md:h-20 mr-2 rounded-full" 
                />
                <div>
                  <div className="font-semibold text-destructive text-lg md:text-xl">{song.name}</div>
                  <div className="text-primary text-md md:text-lg">
                    {song.artists.map((artist) => artist.name).join(', ')}
                  </div>
                  <div className="text-xs md:text-md text-gray-500">{song.album.name}</div>
                </div>
              </div>
              <Button variant="outline" className="hover:bg-accent active:bg-accent text-xs md:text-sm"  onClick={() => addToQueue(song)}>Add To Queue</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
