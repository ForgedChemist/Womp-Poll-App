import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';

export function PollVoting({ pollId }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Mock poll data - in production this would come from an API
  const poll = {
    id: pollId,
    question: "What's your favorite programming language?",
    created: "2 hours ago",
    votes: 150,
    options: [
      { id: 1, text: "JavaScript" },
      { id: 2, text: "Python" },
      { id: 3, text: "Java" }
    ]
  };

  const handleVote = (e) => {
    e.preventDefault();
    if (selectedOption) {
      // In production, this would be an API call
      navigate(`/poll/${pollId}/results`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-black mb-4">{poll.question}</h1>
          
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

          <form onSubmit={handleVote} className="space-y-4">
            {poll.options.map((option) => (
              <label
                key={option.id}
                className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="poll-option"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    className="w-4 h-4 text-black"
                  />
                  <span className="ml-3">{option.text}</span>
                </div>
              </label>
            ))}

            <button
              type="submit"
              disabled={!selectedOption}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Vote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}