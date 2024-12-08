import React from 'react';
import { Users, Clock, X } from 'lucide-react';
import { PollCard } from './PollCard';
import { usePollData } from '../../hooks/usePollData';

export function MyPolls() {
  const { polls, closePoll } = usePollData();

  return (
    <div className="space-y-4">
      {polls.map((poll) => (
        <PollCard 
          key={poll.id} 
          poll={poll} 
          onClose={() => closePoll(poll.id)} 
        />
      ))}
    </div>
  );
}