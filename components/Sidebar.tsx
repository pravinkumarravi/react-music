import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HomeIcon } from './icons/HomeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { LibraryIcon } from './icons/LibraryIcon';
import { PlusIcon } from './icons/PlusIcon';
import { HeartIcon } from './icons/HeartIcon';
import { XIcon } from './icons/XIcon';

const NavItem = ({ to, icon, children, onClick }: { to: string; icon: React.ReactNode; children: React.ReactNode; onClick: () => void; }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-4 px-2 py-2 text-sm font-bold transition-colors duration-200 rounded-md ${isActive ? 'text-white bg-slate-700/50' : 'text-slate-400 hover:text-white'}`
        }
    >
        {icon}
        <span>{children}</span>
    </NavLink>
);


export const Sidebar = () => {
    const { playlists, isSidebarOpen, closeSidebar } = useAppContext();

    return (
        <aside className={`w-64 bg-black p-2 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between mb-6">
                 <div className="px-4 py-2 text-2xl font-bold text-white">TuneStream AI</div>
                 <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-white md:hidden" aria-label="Close sidebar">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-col gap-2 p-2 bg-slate-900 rounded-lg">
                <NavItem to="/" icon={<HomeIcon className="h-6 w-6" />} onClick={closeSidebar}>Home</NavItem>
                <NavItem to="/search" icon={<SearchIcon className="h-6 w-6" />} onClick={closeSidebar}>Search</NavItem>
                <NavItem to="/library" icon={<LibraryIcon className="h-6 w-6" />} onClick={closeSidebar}>Your Library</NavItem>
            </nav>
            <nav className="flex flex-col gap-2 p-2 mt-4 bg-slate-900 rounded-lg">
                <NavItem to="/create-playlist" icon={<PlusIcon className="h-6 w-6" />} onClick={closeSidebar}>Create Playlist</NavItem>
                <NavItem to="/liked-songs" icon={<HeartIcon className="h-6 w-6" />} onClick={closeSidebar}>Liked Songs</NavItem>
            </nav>
            <div className="border-t border-slate-700 my-4 mx-2"></div>
            <div className="flex-grow overflow-y-auto px-2">
                <ul className="space-y-2">
                    {playlists.map(playlist => (
                        <li key={playlist.id}>
                           <NavLink
                                to={`/playlist/${playlist.id}`}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `block text-sm truncate transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`
                                }
                            >
                                {playlist.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};
