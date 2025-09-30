import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PlaylistCard } from '../components/PlaylistCard';

const Home = () => {
    const { playlists, user } = useAppContext();

    return (
        <div className="px-6 py-4">
            <h1 className="text-3xl font-bold mb-4">Good Afternoon, {user?.name}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {playlists.map(playlist => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};

export default Home;
