import React from 'react';
import { Song } from '../types';
import { useAppContext } from '../context/AppContext';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { HeartIcon } from './icons/HeartIcon';

interface SongRowProps {
    song: Song;
    index: number;
    queue: Song[];
}

export const SongRow: React.FC<SongRowProps> = ({ song, index, queue }) => {
    const { playSong, currentSong, isPlaying, togglePlay } = useAppContext();
    const isCurrentlyPlaying = currentSong?.id === song.id;

    const handlePlayClick = () => {
        if (isCurrentlyPlaying) {
            togglePlay();
        } else {
            playSong(song, queue, index);
        }
    };

    return (
        <div className="grid grid-cols-[auto_4fr_2fr_1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-slate-700/50 group">
            <div className="flex items-center justify-center w-10 text-slate-400">
                <span className="group-hover:hidden">{index + 1}</span>
                <button onClick={handlePlayClick} className="hidden group-hover:block text-white">
                    {isCurrentlyPlaying && isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                </button>
            </div>
            <div className="flex items-center gap-4">
                <img src={song.coverArt} alt={song.title} className="h-10 w-10 rounded-sm" />
                <div>
                    <h3 className={`font-medium ${isCurrentlyPlaying ? 'text-cyan-400' : 'text-white'}`}>{song.title}</h3>
                    <p className="text-sm text-slate-400">{song.artist}</p>
                </div>
            </div>
            <div className="text-sm text-slate-400 truncate">{song.album}</div>
            <div className="text-sm text-slate-400">{song.duration}</div>
            <div className="pr-4">
                <HeartIcon className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer" />
            </div>
        </div>
    );
};
