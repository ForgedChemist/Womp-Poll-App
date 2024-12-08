import React from 'react';
import { Users, Clock, Share2 } from 'lucide-react';

export function PollResults({ pollId }) {
  // Mock poll data - in production this would come from an API
  const poll = {
    id: pollId,
    question: "What's your favorite programming language?",
    created: "2 hours ago",
    votes: 151,
    options: [
      { id: 1, text: "JavaScript", votes: 68, percentage: 45 },
      { id: 2, text: "Python", votes: 45, percentage: 30 },
      { id: 3, text: "Java", votes: 38, percentage: 25 }
    ]
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-black">{poll.question}</h1>
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
              title="Share Poll"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {poll.votes} votes
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {poll.created}
            </span>
          </div>

          <div className="space-y-6">
            {poll.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{option.text}</span>
                  <span className="font-medium">{option.votes} votes ({option.percentage}%)</span>
                </div>
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-black transition-all duration-1000 ease-out"
                    style={{ width: `${option.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}