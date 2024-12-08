import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function LoginForm({ onSubmit }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({
      email: e.target.email.value,
      password: e.target.password.value
    });

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use demo@womp.com / demo123');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          defaultValue="demo@womp.com"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          defaultValue="demo123"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
      >
        Login
      </button>
    </form>
  );
}