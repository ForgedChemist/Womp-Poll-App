import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Create Engaging Polls in Minutes!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your ideas into interactive polls. Engage your audience and gather meaningful insights with our intuitive polling platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/auth')}
                className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors text-lg font-semibold"
              >
                Get Started
              </button>
              <button className="border-2 border-black text-black px-8 py-3 rounded hover:bg-gray-50 transition-colors text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070"
              alt="Team collaborating on polls"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}