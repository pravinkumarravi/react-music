import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SongRow } from '../components/SongRow';
import { PlayIcon } from '../components/icons/PlayIcon';

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const { playlists, playSong } = useAppContext();
    const playlist = playlists.find(p => p.id === id);

    if (!playlist) {
        return <div className="p-6 text-center">Playlist not found.</div>;
    }

    const handlePlayPlaylist = () => {
        if (playlist.songs.length > 0) {
            playSong(playlist.songs[0], playlist.songs, 0);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 p-6 bg-gradient-to-b from-cyan-800 to-slate-900/10">
                <img src={playlist.coverArt} alt={playlist.name} className="h-36 w-36 sm:h-48 sm:w-48 rounded-md shadow-2xl flex-shrink-0" />
                <div className="text-center sm:text-left">
                    <h2 className="text-xs font-bold uppercase">Playlist</h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black">{playlist.name}</h1>
                    <p className="mt-2 text-slate-300">{playlist.description}</p>
                </div>
            </div>

            <div className="p-6 bg-gradient-to-b from-slate-900/10 to-slate-900">
                <button onClick={handlePlayPlaylist} className="p-4 mb-6 bg-cyan-500 text-black rounded-full shadow-lg hover:scale-105 transition-transform">
                    <PlayIcon className="h-7 w-7" />
                </button>

                <div className="space-y-1">
                    {playlist.songs.map((song, index) => (
                        <SongRow key={song.id} song={song} index={index} queue={playlist.songs} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistPage;
