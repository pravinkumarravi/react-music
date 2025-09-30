import React from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';

const SearchCategoryCard = ({ title, color, imageUrl }: { title: string; color: string; imageUrl: string }) => (
    <div className={`relative rounded-lg overflow-hidden h-48 ${color}`}>
        <h3 className="text-2xl font-bold p-4 text-white">{title}</h3>
        <img src={imageUrl} alt={title} className="absolute -bottom-4 -right-4 h-28 w-28 rotate-[25deg]"/>
    </div>
);

const Search = () => {
    return (
        <div className="p-6">
            <div className="relative mb-8 w-full max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="w-full pl-10 pr-4 py-3 text-white bg-slate-800 border border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            </div>
            <h2 className="text-2xl font-bold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <SearchCategoryCard title="Podcasts" color="bg-red-500" imageUrl="https://picsum.photos/seed/cat1/150" />
                <SearchCategoryCard title="Made For You" color="bg-blue-500" imageUrl="https://picsum.photos/seed/cat2/150" />
                <SearchCategoryCard title="Charts" color="bg-purple-500" imageUrl="https://picsum.photos/seed/cat3/150" />
                <SearchCategoryCard title="New Releases" color="bg-green-500" imageUrl="https://picsum.photos/seed/cat4/150" />
                <SearchCategoryCard title="Discover" color="bg-orange-500" imageUrl="https://picsum.photos/seed/cat5/150" />
                <SearchCategoryCard title="Live Events" color="bg-indigo-500" imageUrl="https://picsum.photos/seed/cat6/150" />
            </div>
        </div>
    );
};

export default Search;
