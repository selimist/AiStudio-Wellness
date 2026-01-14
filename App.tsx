
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import ContentDetail from './pages/ContentDetail';
import Admin from './pages/Admin';
import { User, UserRole } from './types';
import { INITIAL_USER, ADMIN_USER } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Simple persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('zenhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    const selectedUser = role === UserRole.ADMIN ? ADMIN_USER : INITIAL_USER;
    setUser(selectedUser);
    localStorage.setItem('zenhub_user', JSON.stringify(selectedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('zenhub_user');
  };

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail user={user} />} />
          <Route path="/content/:slug" element={<ContentDetail />} />
          
          <Route path="/login" element={
            user ? <Navigate to="/" /> : (
              <div className="max-w-md mx-auto py-20 px-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-200">
                  <h1 className="text-3xl font-bold mb-8 text-center text-stone-900">Welcome to ZenHub</h1>
                  <div className="space-y-4">
                    <button 
                      onClick={() => handleLogin(UserRole.USER)}
                      className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition"
                    >
                      Login as Regular User
                    </button>
                    <button 
                      onClick={() => handleLogin(UserRole.ADMIN)}
                      className="w-full py-4 border-2 border-stone-200 text-stone-700 rounded-2xl font-bold hover:bg-stone-50 transition"
                    >
                      Login as Admin
                    </button>
                  </div>
                  <p className="mt-8 text-center text-sm text-stone-400">
                    By joining, you agree to our terms of mindfulness.
                  </p>
                </div>
              </div>
            )
          } />

          <Route path="/profile" element={
            user ? (
              <div className="max-w-4xl mx-auto py-16 px-4">
                <div className="flex items-center space-x-6 mb-12">
                  <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                  <div>
                    <h1 className="text-3xl font-bold text-stone-900">{user.name}</h1>
                    <p className="text-stone-500">{user.email}</p>
                    <div className="flex gap-2 mt-2">
                      {user.interests.map(i => (
                        <span key={i} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded">{i}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-stone-900">Your Registered Events</h2>
                <div className="bg-stone-100 p-8 rounded-2xl text-center text-stone-500 border-2 border-dashed border-stone-200">
                  You haven't joined any events yet. <a href="#/events" className="text-teal-600 hover:underline">Find your next retreat.</a>
                </div>
              </div>
            ) : <Navigate to="/login" />
          } />

          <Route path="/admin" element={
            user?.role === UserRole.ADMIN ? <Admin /> : <Navigate to="/" />
          } />

          <Route path="/content" element={
            <div className="max-w-7xl mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold text-stone-900 mb-4">ZenHub Journal</h1>
              <p className="text-xl text-stone-500 mb-12">Insights and stories from the heart of wellness.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Content card reused logic or simplified listing */}
                <p className="text-stone-400 italic">Journal listing coming soon...</p>
              </div>
            </div>
          } />
          
          <Route path="/about" element={
            <div className="max-w-3xl mx-auto py-20 px-6 text-center">
              <h1 className="text-4xl font-bold mb-6">About ZenHub</h1>
              <p className="text-xl text-stone-600 leading-relaxed">
                We are a community-driven platform dedicated to making wellness accessible and organized.
              </p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
