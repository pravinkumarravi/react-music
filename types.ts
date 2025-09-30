
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverArt: string;
  songs: Song[];
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
