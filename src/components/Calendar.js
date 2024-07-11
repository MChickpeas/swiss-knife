// src/components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = newDate => {
    setDate(newDate);
  };

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;
