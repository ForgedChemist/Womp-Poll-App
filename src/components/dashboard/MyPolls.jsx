import React from 'react';
import { PollCard } from './PollCard';
import { usePollData } from '../../hooks/usePollData';

export function MyPolls() {
  const { polls, loading, error, closePoll } = usePollData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg h-96 overflow-y-auto">
      <div className="space-y-4">
        {polls.map((poll) => (
          <PollCard 
            key={poll.id} 
            poll={poll} 
            onClose={() => closePoll(poll.id)} 
          />
        ))}
      </div>
    </div>
  );
}