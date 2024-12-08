import React from 'react';
import { BarChart3, Users, Clock } from 'lucide-react';

const benefits = [
  {
    icon: <BarChart3 className="w-8 h-8 text-black" />,
    title: 'Real-time Analytics',
    description: 'Track responses and analyze results as they come in with our powerful analytics dashboard.'
  },
  {
    icon: <Users className="w-8 h-8 text-black" />,
    title: 'Audience Engagement',
    description: 'Engage your audience with interactive polls that encourage participation and feedback.'
  },
  {
    icon: <Clock className="w-8 h-8 text-black" />,
    title: 'Quick Setup',
    description: 'Create and launch polls in minutes with our intuitive and user-friendly interface.'
  }
];

export function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-black">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}