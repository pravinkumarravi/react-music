
import { Playlist, Song } from './types';

export const MOCK_SONGS: Song[] = [
  { id: 's1', title: 'Starlight Echoes', artist: 'Cosmic Waves', album: 'Galaxy Drifters', duration: '3:45', coverArt: 'https://picsum.photos/seed/s1/100' },
  { id: 's2', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:01', coverArt: 'https://picsum.photos/seed/s2/100' },
  { id: 's3', title: 'Ocean Drive', artist: 'Duke Dumont', album: 'Blasé Boys Club', duration: '3:26', coverArt: 'https://picsum.photos/seed/s3/100' },
  { id: 's4', title: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '3:49', coverArt: 'https://picsum.photos/seed/s4/100' },
  { id: 's5', title: 'Solar Sailer', artist: 'Daft Punk', album: 'TRON: Legacy', duration: '2:42', coverArt: 'https://picsum.photos/seed/s5/100' },
  { id: 's6', title: 'Aurora', artist: 'Tycho', album: 'Awake', duration: '5:21', coverArt: 'https://picsum.photos/seed/s6/100' },
  { id: 's7', title: 'Neon Sunset', artist: 'Synth Riders', album: 'Retro Futures', duration: '4:15', coverArt: 'https://picsum.photos/seed/s7/100' },
  { id: 's8', title: 'Crystal Caverns', artist: 'Pixel Dreams', album: '8-Bit Odyssey', duration: '3:55', coverArt: 'https://picsum.photos/seed/s8/100' },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Cyberpunk Beats',
    description: 'Dark, synth-heavy tracks for rainy nights in a neon-lit city.',
    coverArt: 'https://picsum.photos/seed/p1/300',
    songs: [MOCK_SONGS[0], MOCK_SONGS[1], MOCK_SONGS[4], MOCK_SONGS[6]],
  },
  {
    id: 'p2',
    name: 'Lofi Focus',
    description: 'Chill instrumental hip-hop beats for studying, relaxing, or coding.',
    coverArt: 'https://picsum.photos/seed/p2/300',
    songs: [MOCK_SONGS[5], MOCK_SONGS[7]],
  },
  {
    id: 'p3',
    name: 'Indie Dance Party',
    description: 'Upbeat anthems to get you moving.',
    coverArt: 'https://picsum.photos/seed/p3/300',
    songs: [MOCK_SONGS[2], MOCK_SONGS[3]],
  },
  {
    id: 'p4',
    name: 'Cosmic Drift',
    description: 'Ambient and spacey tracks for floating through the cosmos.',
    coverArt: 'https://picsum.photos/seed/p4/300',
    songs: [MOCK_SONGS[0], MOCK_SONGS[4], MOCK_SONGS[5]],
  },
];
