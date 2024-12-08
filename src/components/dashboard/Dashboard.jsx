import React from 'react';
import { PlusCircle, ListOrdered, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreatePollForm } from './CreatePollForm';
import { MyPolls } from './MyPolls';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-black"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <PlusCircle className="w-6 h-6 text-black mr-2" />
              <h2 className="text-xl font-semibold">Create New Poll</h2>
            </div>
            <CreatePollForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <ListOrdered className="w-6 h-6 text-black mr-2" />
              <h2 className="text-xl font-semibold">My Polls</h2>
            </div>
            <MyPolls />
          </div>
        </div>
      </div>
    </div>
  );
}