import React from 'react';

export function AboutUs() {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700">
        We are software engineering students at Dogus University working on a project for our Software Design and Architecture course. Team 1 is responsible for this project, which is of notable quality.
        We believe in the power of collective input. Whether you're organizing a community event, brainstorming ideas with your team, or simply curious about people's preferences, our app is designed to simplify the process and make engagement seamless.
        </p>

      </div>
      <div className="flex justify-center">
        <hr className="border-t border-gray-300 w-1/2 my-8" />
      </div>
    </section>
  );
} 