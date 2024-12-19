import React from 'react';

export function AboutUs() {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700">
          We are dedicated to providing a seamless polling experience. Our mission is to empower users to make informed decisions through data-driven insights.
        </p>
        {/* Add more information about your company here */}
      </div>
      <div className="flex justify-center">
        <hr className="border-t border-gray-300 w-1/2 my-8" />
      </div>
    </section>
  );
} 