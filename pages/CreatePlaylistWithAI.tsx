import React, { useState } from 'react';
import { generatePlaylistFromPrompt } from '../services/geminiService';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { SongRow } from '../components/SongRow';
import { Playlist } from '../types';

const CreatePlaylistWithAI = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<Omit<Playlist, 'id'> | null>(null);
  const { addPlaylist } = useAppContext();
  const navigate = useNavigate();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedPlaylist(null);

    try {
      const playlist = await generatePlaylistFromPrompt(prompt);
      setGeneratedPlaylist(playlist);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlaylist = () => {
    if (generatedPlaylist) {
      addPlaylist(generatedPlaylist);
      navigate('/library'); // or to the new playlist page
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">Create with AI</h1>
      <p className="text-slate-400 mb-6">Describe the vibe, and let AI build the perfect playlist for you.</p>
      
      <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A workout playlist with high-energy 80s rock anthems'"
          className="flex-grow px-4 py-3 text-white bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-6 py-3 font-bold text-black bg-cyan-500 rounded-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}

      {generatedPlaylist && (
        <div className="mt-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-2xl font-bold">{generatedPlaylist.name}</h2>
                <p className="text-slate-400">{generatedPlaylist.description}</p>
            </div>
            <button
              onClick={handleSavePlaylist}
              className="px-5 py-2 font-semibold text-white bg-slate-700 rounded-full hover:bg-slate-600 transition-colors"
            >
              Save to Library
            </button>
          </div>
          <div className="space-y-1">
            {generatedPlaylist.songs.map((song, index) => (
              <SongRow key={song.id} song={song} index={index} queue={generatedPlaylist.songs} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlaylistWithAI;
