
import React from 'react';
import { Link } from 'react-router-dom';
import { Playlist } from '../types';
import { PlayIcon } from './icons/PlayIcon';

interface PlaylistCardProps {
    playlist: Playlist;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
    return (
        <Link to={`/playlist/${playlist.id}`} className="group relative block p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-300">
            <img src={playlist.coverArt} alt={playlist.name} className="w-full h-auto rounded-md mb-4 shadow-lg" />
            <h3 className="font-bold text-white truncate">{playlist.name}</h3>
            <p className="text-sm text-slate-400 truncate">{playlist.description}</p>
            <div className="absolute bottom-20 right-6 opacity-0 group-hover:opacity-100 group-hover:bottom-24 transition-all duration-300">
                <button className="p-4 bg-cyan-500 text-black rounded-full shadow-lg hover:scale-105">
                    <PlayIcon className="h-6 w-6" />
                </button>
            </div>
        </Link>
    );
};
