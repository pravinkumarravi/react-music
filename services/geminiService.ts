
import { GoogleGenAI, Type } from "@google/genai";
import { Playlist, Song } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const playlistSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "A creative and fitting name for the playlist, max 4 words."
    },
    description: {
      type: Type.STRING,
      description: "A short, compelling description for the playlist."
    },
    songs: {
      type: Type.ARRAY,
      description: "A list of 8 song suggestions for the playlist.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "The title of the song."
          },
          artist: {
            type: Type.STRING,
            description: "The artist of the song."
          },
        },
        required: ["title", "artist"],
      },
    },
  },
  required: ["name", "description", "songs"],
};

export const generatePlaylistFromPrompt = async (prompt: string): Promise<Omit<Playlist, 'id'>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a music playlist based on this prompt: "${prompt}". Generate a playlist name, a short description, and a list of 8 songs with their titles and artists.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: playlistSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    const generatedSongs: Song[] = parsedData.songs.map((song: { title: string; artist: string }, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      title: song.title,
      artist: song.artist,
      album: 'AI Generated',
      duration: '3:30', // Placeholder duration
      coverArt: `https://picsum.photos/seed/${song.title}/100`, // Placeholder art
    }));
    
    return {
      name: parsedData.name,
      description: parsedData.description,
      songs: generatedSongs,
      coverArt: `https://picsum.photos/seed/${parsedData.name}/300`,
    };

  } catch (error) {
    console.error("Error generating playlist with Gemini:", error);
    throw new Error("Failed to generate AI playlist. Please check your prompt or API key.");
  }
};
