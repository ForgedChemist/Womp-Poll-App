import React from 'react';
import { BarChart, Users, Clock } from 'lucide-react';

const mockPolls = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    votes: 150,
    created: "2 hours ago",
    active: true
  },
  {
    id: 2,
    question: 'How often do you code?',
    votes: 89,
    created: '1 day ago',
    active: true
  },
  {
    id: 3,
    question: 'Best development environment?',
    votes: 234,
    created: '3 days ago',
    active: false
  }
];

export function RecentPolls() {
  return (
    <div className="space-y-4">
      {mockPolls.map((poll) => (
        <div
          key={poll.id}
          className="p-4 border border-gray-200 rounded hover:shadow-md transition-shadow"
        >
          <h3 className="font-medium text-black mb-2">{poll.question}</h3>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {poll.votes} votes
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {poll.created}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs ${
                poll.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {poll.active ? 'Active' : 'Closed'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}