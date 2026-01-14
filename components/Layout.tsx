
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
              ZenHub
            </Link>
            
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/events" className="text-stone-600 hover:text-teal-600 transition">Events</Link>
              <Link to="/content" className="text-stone-600 hover:text-teal-600 transition">Journal</Link>
              <Link to="/about" className="text-stone-600 hover:text-teal-600 transition">About</Link>
              
              {user ? (
                <div className="flex items-center space-x-4 pl-4 border-l border-stone-200">
                  {user.role === UserRole.ADMIN && (
                    <Link to="/admin" className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded">Admin Panel</Link>
                  )}
                  <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-stone-200">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </Link>
                  <button onClick={onLogout} className="text-sm text-stone-500 hover:text-red-500">Logout</button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-teal-600 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-700 transition shadow-sm"
                >
                  Join Community
                </button>
              )}
            </div>

            {/* Mobile Menu Button - Placeholder for brevity */}
            <div className="md:hidden">
              <button className="text-stone-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">ZenHub</h2>
            <p className="max-w-md text-stone-400">
              Your centralized hub for wellness. We bridge the gap between soulful experiences, professional organizers, and a conscious community.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="hover:text-teal-400">Retreats</Link></li>
              <li><Link to="/events" className="hover:text-teal-400">Workshops</Link></li>
              <li><Link to="/content" className="hover:text-teal-400">Latest Articles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-teal-400">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-teal-400">Our Story</Link></li>
              <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 ZenHub Wellness. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
