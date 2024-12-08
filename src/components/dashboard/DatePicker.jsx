import React, { useEffect, useRef, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(format(date, 'dd/MM/yyyy'));
    setIsOpen(false);
  };

  const generateDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-black transition-colors"
      >
        <CalendarIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-1">
                {day}
              </div>
            ))}
            {generateDates().map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className="p-1 text-sm hover:bg-gray-100 rounded transition-colors"
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}