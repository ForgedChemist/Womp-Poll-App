import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { useAuth } from '../../contexts/AuthContext';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (formData) => {
    setError('');
    
    try {
      if (isLogin) {
        const success = await login({
          email: formData.email,
          password: formData.password
        });
        
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        const result = await register({
          email: formData.email,
          password: formData.password
        });
        
        if (!result.success) {
          setError(result.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2 text-sm">
              {error}
            </div>
          )}
          <div className="relative">
            <div className="flex transition-all duration-500 ease-in-out" 
                 style={{ transform: `translateX(${isLogin ? '0%' : '-50%'})`, width: '200%' }}>
              {/* Login Panel */}
              <div className="w-1/2 min-w-[50%] p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Welcome Back</h2>
                <LoginForm onSubmit={handleSubmit} />
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setIsLogin(false)}
                    className="flex items-center text-sm text-gray-600 hover:text-black"
                  >
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Create account
                  </button>
                  <a href="#" className="text-sm text-gray-600 hover:text-black">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Signup Panel */}
              <div className="w-1/2 min-w-[50%] p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Create Account</h2>
                <SignupForm onSubmit={handleSubmit} />
                <div className="mt-6">
                  <button
                    onClick={() => setIsLogin(true)}
                    className="flex items-center text-sm text-gray-600 hover:text-black"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}