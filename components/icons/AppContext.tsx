
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Playlist, Song } from '../types';
import { MOCK_PLAYLISTS } from '../constants';

interface AppContextType {
  user: User | null;
  playlists: Playlist[];
  currentSong: Song | null;
  isPlaying: boolean;
  login: (name: string) => void;
  logout: () => void;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  addPlaylist: (playlist: Omit<Playlist, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>(MOCK_PLAYLISTS);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const login = (name: string) => {
    setUser({ id: 'u1', name, avatarUrl: `https://i.pravatar.cc/150?u=${name}` });
  };

  const logout = () => {
    setUser(null);
    setCurrentSong(null);
    setIsPlaying(false);
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const addPlaylist = (playlistData: Omit<Playlist, 'id'>) => {
    const newPlaylist: Playlist = {
        ...playlistData,
        id: `p${Date.now()}`,
    };
    setPlaylists(prevPlaylists => [newPlaylist, ...prevPlaylists]);
  };

  return (
    <AppContext.Provider value={{ user, playlists, currentSong, isPlaying, login, logout, playSong, togglePlay, addPlaylist }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
