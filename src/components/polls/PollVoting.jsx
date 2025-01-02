import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, Clock } from 'lucide-react';

export function PollVoting() {
  const navigate = useNavigate();
  const { pollId } = useParams(); // Get pollId from URL parameters
  const [poll, setPoll] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/polls/${pollId}`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch poll');
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        console.error('Error fetching poll:', error);
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (selectedOptions.size > 0) {
      try {
        const response = await fetch(`http://localhost:5000/api/polls/${pollId}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ options: Array.from(selectedOptions) }),
        });

        if (response.status === 403) {
          setErrorMessage('This poll is closed.'); // Set error message
          return; // Prevent further execution
        }

        if (!response.ok) throw new Error('Failed to submit vote');
        navigate(`/poll/${pollId}/results`);
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-black mb-4">{poll.question}</h1>
          
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

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

  <form onSubmit={handleVote} className="space-y-4">
  {poll.options.map((option, index) => (
    <label
      key={index}
      className={`block p-4 border rounded-lg cursor-pointer transition-all ${
        selectedOptions.has(index) ? 'bg-orange-500 text-white' : 'bg-white'
      }`}
      onClick={() => {
        const newSelectedOptions = new Set(selectedOptions);
        if (newSelectedOptions.has(index)) {
          newSelectedOptions.delete(index);
        } else {
          newSelectedOptions.add(index);
        }
        setSelectedOptions(newSelectedOptions);
      }}
    >
      {option}
    </label>
  ))}

  <button
    type="submit"
    disabled={selectedOptions.size === 0 || errorMessage !== ''}
    className={`w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors ${
      errorMessage ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {errorMessage ? 'Cannot Submit Vote' : 'Submit Vote'}
  </button>
</form>
        </div>
      </div>
    </div>
  );
}