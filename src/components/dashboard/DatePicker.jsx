import React, { useEffect, useRef, useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [view, setView] = useState('date'); // 'date' or 'time'
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        setView('date'); // Reset view when closing
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setView('time');
  };

  function handleTimeSelect(time) {
    setSelectedTime(time);
    const dateObj = selectedDate || new Date();
    const [hours, minutes] = time.split(':');
    dateObj.setHours(parseInt(hours), parseInt(minutes));
    
    // Format the dateObj to "name of the day dd/mm/yyyy HH:mm (timezone)"
    const dayName = format(dateObj, 'EEEE'); // Get the full name of the day
    const formattedDate = format(dateObj, 'dd/MM/yyyy'); // Format the date
    const timezone = dateObj.toLocaleString('en-US', { timeZoneName: 'short' }).split(' ').pop(); // Get timezone

    // Include hours and minutes in the final formatted date
    const finalFormattedDate = `${dayName} ${formattedDate} ${hours}:${minutes} (${timezone})`; // Combine all parts
    onChange(finalFormattedDate); // Pass the formatted date to onChange

    setIsOpen(false);
    setView('date');
}

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

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return slots;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-black transition-colors"
      >
        {view === 'date' ? (
          <CalendarIcon className="w-5 h-5" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
          {view === 'date' ? (
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
          ) : (
            <div className="grid grid-cols-4 gap-1">
              {generateTimeSlots().map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="p-1 text-sm hover:bg-gray-100 rounded transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}