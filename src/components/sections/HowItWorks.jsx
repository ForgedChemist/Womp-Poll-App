import React from 'react';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-700">
          Create, share, and analyze polls with ease. Our platform allows you to engage with your audience and gather valuable insights.
        </p>
        {/* Add more content or features here */}
      </div>
      <div className="flex justify-center">
        <hr className="border-t border-gray-300 w-1/2 my-8" /> {/* Shorter dividing bar */}
      </div>
    </section>
  );
}