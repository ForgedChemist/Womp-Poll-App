import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Benefits } from './components/sections/Benefits';
import { Footer } from './components/layout/Footer';
import { Auth } from './components/auth/Auth';
import { Dashboard } from './components/dashboard/Dashboard';
import { PollVoting } from './components/polls/PollVoting';
import { PollResults } from './components/polls/PollResults';

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Benefits />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/poll/:id" element={<PollVoting />} />
            <Route path="/poll/:id/results" element={<PollResults />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;