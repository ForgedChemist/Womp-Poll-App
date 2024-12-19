import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { MyPolls } from './components/dashboard/MyPolls';

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
      <Router>
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
            <Route path="/poll/:pollId" element={<PollVoting />} />
            <Route path="/poll/:pollId/results" element={<PollResults />} />
            <Route path="/mypolls" element={<MyPolls />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;