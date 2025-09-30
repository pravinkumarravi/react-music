import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { HeartIcon } from './icons/HeartIcon';
import { NextIcon } from './icons/NextIcon';
import { PreviousIcon } from './icons/PreviousIcon';
import { ShuffleIcon } from './icons/ShuffleIcon';
import { RepeatIcon } from './icons/RepeatIcon';
import { RepeatOneIcon } from './icons/RepeatOneIcon';

const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const parseDuration = (duration: string): number => {
    if (!duration) return 0;
    const parts = duration.split(':').map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return 0;
    return parts[0] * 60 + parts[1];
};

export const Player = () => {
    const { 
        currentSong, isPlaying, togglePlay, 
        playNext, playPrevious, playbackProgress, seekPlayback,
        isShuffling, toggleShuffle, repeatMode, toggleRepeatMode
    } = useAppContext();

    const progressBarRef = useRef<HTMLDivElement>(null);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !currentSong) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        const newProgress = Math.max(0, Math.min(1, clickX / progressBarWidth));
        seekPlayback(newProgress);
    };

    if (!currentSong) {
        return (
            <footer className="h-24 bg-slate-800 border-t border-slate-700 flex items-center justify-center">
                <p className="text-slate-400">Select a song to play</p>
            </footer>
        );
    }

    const totalDurationInSeconds = parseDuration(currentSong.duration);
    const currentTimeInSeconds = playbackProgress * totalDurationInSeconds;

    return (
        <footer className="h-24 bg-slate-800 border-t border-slate-700 grid grid-cols-[1fr_auto_1fr] md:grid-cols-3 items-center px-4">
            <div className="flex items-center gap-3">
                <img src={currentSong.coverArt} alt={currentSong.title} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md" />
                <div className="overflow-hidden">
                    <h3 className="font-semibold text-white text-sm truncate">{currentSong.title}</h3>
                    <p className="text-xs text-slate-400 truncate">{currentSong.artist}</p>
                </div>
                <HeartIcon className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer ml-2 flex-shrink-0" />
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-4">
                    <button onClick={toggleShuffle} className={`p-1 ${isShuffling ? 'text-cyan-400' : 'text-slate-400'} hover:text-white transition-colors`} aria-label="Toggle shuffle">
                        <ShuffleIcon className="h-5 w-5" />
                    </button>
                    <button onClick={playPrevious} className="p-1 text-slate-400 hover:text-white transition-colors" aria-label="Previous track">
                        <PreviousIcon className="h-6 w-6" />
                    </button>
                    <button onClick={togglePlay} className="p-2 bg-white text-black rounded-full hover:scale-105 transition-transform" aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                    </button>
                    <button onClick={playNext} className="p-1 text-slate-400 hover:text-white transition-colors" aria-label="Next track">
                        <NextIcon className="h-6 w-6" />
                    </button>
                    <button onClick={toggleRepeatMode} className={`p-1 ${repeatMode !== 'none' ? 'text-cyan-400' : 'text-slate-400'} hover:text-white transition-colors`} aria-label="Toggle repeat">
                        {repeatMode === 'one' ? <RepeatOneIcon className="h-5 w-5" /> : <RepeatIcon className="h-5 w-5" />}
                    </button>
                </div>
                <div className="w-full max-w-md flex items-center gap-2 text-xs mt-2 text-slate-400">
                    <span>{formatTime(currentTimeInSeconds)}</span>
                    <div ref={progressBarRef} onClick={handleSeek} className="w-full h-1 bg-slate-600 rounded-full cursor-pointer group">
                        <div className="h-1 bg-white rounded-full relative group-hover:bg-cyan-400" style={{ width: `${playbackProgress * 100}%` }}>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <span>{currentSong.duration}</span>
                </div>
            </div>

            <div className="flex items-center justify-end">
                {/* Volume Controls Here */}
            </div>
        </footer>
    );
};
