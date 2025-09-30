import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Player } from './components/Player';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Library = lazy(() => import('./pages/Library'));
const PlaylistPage = lazy(() => import('./pages/Playlist'));
const CreatePlaylistWithAI = lazy(() => import('./pages/CreatePlaylistWithAI'));

const MainLayout = () => {
    const { isSidebarOpen, closeSidebar } = useAppContext();
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-20 md:hidden"
                        onClick={closeSidebar}
                        aria-hidden="true"
                    ></div>
                )}
                <main className="flex-1 overflow-y-auto md:pl-64">
                    <Header />
                    <Suspense fallback={<div className="p-6">Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/library" element={<Library />} />
                            <Route path="/playlist/:id" element={<PlaylistPage />} />
                            <Route path="/create-playlist" element={<CreatePlaylistWithAI />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
            <Player />
        </div>
    );
};


const AppRoutes = () => {
    const { user } = useAppContext();
    return (
        <Routes>
            {user ? (
                <Route path="/*" element={<MainLayout />} />
            ) : (
                <>
                    <Route path="/login" element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Login />
                        </Suspense>
                    } />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}

export default App;
