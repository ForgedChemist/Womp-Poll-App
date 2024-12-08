import { useState } from 'react';

const initialPolls = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    votes: 150,
    created: "2 hours ago",
    active: true,
    options: [
      { text: "JavaScript", percentage: 45 },
      { text: "Python", percentage: 30 },
      { text: "Java", percentage: 25 }
    ]
  },
  {
    id: 2,
    question: 'How often do you code?',
    votes: 89,
    created: '1 day ago',
    active: true,
    options: [
      { text: "Daily", percentage: 65 },
      { text: "Weekly", percentage: 25 },
      { text: "Monthly", percentage: 10 }
    ]
  }
];

export function usePollData() {
  const [polls, setPolls] = useState(initialPolls);

  const closePoll = (pollId) => {
    setPolls(polls.map(poll => 
      poll.id === pollId 
        ? { ...poll, active: false }
        : poll
    ));
  };

  return {
    polls,
    closePoll
  };
}