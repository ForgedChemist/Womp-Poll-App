import React from 'react';
import { Vote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Vote className="h-8 w-8 text-black" />
            <span className="ml-2 text-xl font-bold text-black">Womp</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-black">How It Works</a>
            <a href="#about" className="text-gray-600 hover:text-black">About Us</a>
            <a href="#blog" className="text-gray-600 hover:text-black">Blog</a>
            <button
              onClick={() => navigate('/auth')}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}