
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { user, login } = useAppContext();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Welcome to TuneStream AI</h1>
        <p className="text-center text-slate-400">Enter your name to begin</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-black bg-cyan-500 rounded-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
