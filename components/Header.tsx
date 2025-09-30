import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { MenuIcon } from './icons/MenuIcon';

export const Header = () => {
    const navigate = useNavigate();
    const { user, logout, toggleSidebar } = useAppContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (!user) return null;

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <button onClick={toggleSidebar} className="p-2 bg-black rounded-full hover:bg-slate-800 transition-colors md:hidden" aria-label="Open sidebar">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <button onClick={() => navigate(-1)} className="p-2 bg-black rounded-full hover:bg-slate-800 transition-colors hidden sm:block">
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button onClick={() => navigate(1)} className="p-2 bg-black rounded-full hover:bg-slate-800 transition-colors hidden sm:block">
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 bg-black p-1 rounded-full hover:bg-slate-800 transition-colors">
                    <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                    <span className="font-bold text-sm hidden sm:block">{user.name}</span>
                    <svg className={`h-4 w-4 transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 z-20">
                        <a href="#/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">Profile</a>
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
