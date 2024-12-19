import React, { useEffect, useState } from 'react';
import { Users, Clock, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function PollResults() {
  const { pollId } = useParams(); // Get pollId from URL parameters
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/polls/${pollId}/results`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch poll results');
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        console.error('Error fetching poll results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPollResults();
  }, [pollId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) return <div>Loading...</div>;
  if (!poll) return <div>Poll not found.</div>;

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
              {poll.total_votes} votes
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {poll.created_at}
            </span>
          </div>

          <div className="space-y-6">
            {poll.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{option.text}</span>
                  <span className="font-medium">{option.votes} votes ({option.percentage.toFixed(2)}%)</span>
                </div>
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-black transition-all duration-1000 ease-out"
                    style={{ width: `${option.percentage.toFixed(2)}%` }}
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