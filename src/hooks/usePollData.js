import { useState, useEffect } from 'react';

export function usePollData() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/polls', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch polls');
      const data = await response.json();
      setPolls(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closePoll = async (pollId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/polls/${pollId}/close`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to close poll');
      
      // Update local state to reflect the closed poll
      setPolls(polls.map(poll => 
        poll.id === pollId ? { ...poll, is_open: false } : poll
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return { polls, loading, error, closePoll, refreshPolls: fetchPolls };
}