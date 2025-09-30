import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PlaylistCard } from '../components/PlaylistCard';

const Library = () => {
    const { playlists } = useAppContext();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Your Library</h1>
            {playlists.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {playlists.map(playlist => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            ) : (
                <p className="text-slate-400">You haven't created or saved any playlists yet.</p>
            )}
        </div>
    );
};

export default Library;
