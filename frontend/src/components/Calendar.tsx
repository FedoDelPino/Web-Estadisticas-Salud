import React, { useState } from 'react';


const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState('');

  // Calcula la fecha mínima (1 de Febrero)
  const minDate = new Date();
  minDate.setMonth(1); // Febrero (índice 1)
  minDate.setDate(1); // Primer día del mes
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear();
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0;

  // Calcula la fecha máxima para febrero
  const maxDate = new Date(currentYear, 1, isLeapYear ? 29 : 28);
  const handleDateChange = (event)  => {
    const newDate = event.target.value;
    setSelectedDate(event.target.value);
    onDateChange(newDate)
  };

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={minDate.toISOString().split('T')[0]} // Formato YYYY-MM-DD
        max={maxDate.toISOString().split('T')[0]} // Formato YYYY-MM-DD
      />
    </div>
  );
};

export default Calendar;