import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { User, Playlist, Song } from '../types';
import { MOCK_PLAYLISTS } from '../constants';

const parseDuration = (duration: string): number => {
  if (!duration) return 0;
  const parts = duration.split(':').map(Number);
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return 0;
  return parts[0] * 60 + parts[1];
};

interface AppContextType {
  user: User | null;
  playlists: Playlist[];
  currentSong: Song | null;
  isPlaying: boolean;
  isSidebarOpen: boolean;
  songQueue: Song[];
  currentSongIndex: number | null;
  playbackProgress: number;
  isShuffling: boolean;
  repeatMode: 'none' | 'one' | 'all';
  login: (name: string) => void;
  logout: () => void;
  playSong: (song: Song, queue?: Song[], songIndex?: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addPlaylist: (playlist: Omit<Playlist, 'id'>) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleShuffle: () => void;
  toggleRepeatMode: () => void;
  seekPlayback: (progress: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>(MOCK_PLAYLISTS);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [songQueue, setSongQueue] = useState<Song[]>([]);
  const [originalQueue, setOriginalQueue] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying && currentSong) {
      const durationInSeconds = parseDuration(currentSong.duration);
      if (durationInSeconds > 0) {
        intervalRef.current = window.setInterval(() => {
          setPlaybackProgress(prev => {
            const nextProgress = prev + (1 / durationInSeconds);
            if (nextProgress >= 1) {
              playNext();
              return 0;
            }
            return nextProgress;
          });
        }, 1000);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong, songQueue, repeatMode]);

  const resetPlayerState = () => {
    setCurrentSong(null);
    setIsPlaying(false);
    setSongQueue([]);
    setOriginalQueue([]);
    setCurrentSongIndex(null);
    setPlaybackProgress(0);
  };

  const login = (name: string) => {
    setUser({ id: 'u1', name, avatarUrl: `https://i.pravatar.cc/150?u=${name}` });
  };

  const logout = () => {
    setUser(null);
    resetPlayerState();
  };

  const playSong = (song: Song, queue?: Song[], songIndex?: number) => {
    const newQueue = queue || [song];
    const newIndex = songIndex !== undefined ? songIndex : 0;
    
    setCurrentSong(song);
    setPlaybackProgress(0);
    setIsPlaying(true);

    if (isShuffling) {
      const shuffledQueue = [song, ...newQueue.filter(s => s.id !== song.id).sort(() => Math.random() - 0.5)];
      setSongQueue(shuffledQueue);
      setOriginalQueue(newQueue);
      setCurrentSongIndex(0);
    } else {
      setSongQueue(newQueue);
      setOriginalQueue(newQueue);
      setCurrentSongIndex(newIndex);
    }
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const playNext = () => {
    if (songQueue.length === 0 || currentSongIndex === null) return;

    if (repeatMode === 'one') {
      setCurrentSong(songQueue[currentSongIndex]);
      setPlaybackProgress(0);
      setIsPlaying(true);
      return;
    }

    let nextIndex = currentSongIndex + 1;

    if (nextIndex >= songQueue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        resetPlayerState();
        return;
      }
    }
    
    setCurrentSongIndex(nextIndex);
    setCurrentSong(songQueue[nextIndex]);
    setPlaybackProgress(0);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (songQueue.length === 0 || currentSongIndex === null) return;
    
    if (currentSong && playbackProgress * parseDuration(currentSong.duration) > 3) {
      setPlaybackProgress(0);
      setIsPlaying(true);
      return;
    }

    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) {
      prevIndex = songQueue.length - 1;
    }
    
    setCurrentSongIndex(prevIndex);
    setCurrentSong(songQueue[prevIndex]);
    setPlaybackProgress(0);
    setIsPlaying(true);
  };
  
  const toggleShuffle = () => {
    const newShuffleState = !isShuffling;
    setIsShuffling(newShuffleState);

    if (newShuffleState) {
      if (currentSong && originalQueue.length > 1) {
        const restOfQueue = originalQueue.filter(s => s.id !== currentSong.id);
        const shuffledRest = restOfQueue.sort(() => Math.random() - 0.5);
        const newQueue = [currentSong, ...shuffledRest];
        setSongQueue(newQueue);
        setCurrentSongIndex(0);
      }
    } else {
      setSongQueue(originalQueue);
      const newIndex = originalQueue.findIndex(s => s.id === currentSong?.id);
      setCurrentSongIndex(newIndex !== -1 ? newIndex : null);
    }
  };

  const toggleRepeatMode = () => {
    if (repeatMode === 'none') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('none');
  };

  const seekPlayback = (progress: number) => {
    if(progress >= 0 && progress <= 1) {
        setPlaybackProgress(progress);
    }
  };
  
  const addPlaylist = (playlistData: Omit<Playlist, 'id'>) => {
    const newPlaylist: Playlist = {
        ...playlistData,
        id: `p${Date.now()}`,
    };
    setPlaylists(prevPlaylists => [newPlaylist, ...prevPlaylists]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider value={{ 
        user, playlists, currentSong, isPlaying, isSidebarOpen, 
        songQueue, currentSongIndex, playbackProgress, isShuffling, repeatMode,
        login, logout, playSong, togglePlay, playNext, playPrevious,
        addPlaylist, toggleSidebar, closeSidebar, toggleShuffle, toggleRepeatMode, seekPlayback 
    }}>
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
