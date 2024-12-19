import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { usePollData } from '../../hooks/usePollData';

export function CreatePollForm() {
  const [options, setOptions] = useState(['', '']);
  const [question, setQuestion] = useState('');
  const { refreshPolls } = usePollData();

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDateSelect = (index, date) => {
    const formattedDateTime = date.toString().replace(/GMT[+-]\d{4}\s/, '');
    handleOptionChange(index, formattedDateTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, options }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to create poll');
      }

      const data = await response.json();
      console.log('Poll created:', data);
      
      // Reset form
      setQuestion('');
      setOptions(['', '']);
      
      // Immediately refresh the polls list after successful creation
      refreshPolls();
      
      // Reload the page
      window.location.reload();

    } catch (error) {
      console.error('Error creating poll:', error);
      // TODO: Add error notification
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your question"
          required
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={`Option ${index + 1}`}
              required
            />
            <DatePicker
              value={option}
              onChange={(value) => handleOptionChange(index, value)}
            />
            {index >= 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-2 text-gray-500 hover:text-black"
              >
                <Minus className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addOption}
          className="flex items-center text-gray-600 hover:text-black"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Option
        </button>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Create Poll
        </button>
      </div>
    </form>
  );
}