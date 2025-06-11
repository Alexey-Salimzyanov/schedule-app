import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const isToday = (date) => {
  const today = new Date();
  return isSameDay(today, date);
};

const DatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date(date.getFullYear(), date.getMonth(), 1));

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const getCalendarDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
    const totalCells = 42; // 6 недель по 7 дней

    for (let i = 0; i < totalCells; i++) {
      let dayNum;
      let cellDate;

      if (i < startDayIndex) {
        dayNum = prevMonthLastDate - startDayIndex + 1 + i;
        cellDate = new Date(year, month - 1, dayNum);
      } else if (i >= startDayIndex + currentMonthDaysCount) {
        dayNum = i - (startDayIndex + currentMonthDaysCount) + 1;
        cellDate = new Date(year, month + 1, dayNum);
      } else {
        dayNum = i - startDayIndex + 1;
        cellDate = new Date(year, month, dayNum);
      }
      days.push(cellDate);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    if (onDateChange) {
      onDateChange(clickedDate);
    }
  };

  const calendarDays = getCalendarDays();

  return (
    <Card style={{ width: '100%', maxWidth: '250px', margin: '0 auto', padding: '10px' }}>
      <Card.Body style={{ padding: '0.5rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button className="btn btn-secondary btn-sm" onClick={handlePrevMonth} style={{ padding: '0 8px' }}>‹</button>
          <h5 className="mb-0" style={{ fontSize: '1rem' }}>
            {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
          </h5>
          <button className="btn btn-secondary btn-sm" onClick={handleNextMonth} style={{ padding: '0 8px' }}>›</button>
        </div>
        <div className="d-flex justify-content-between font-weight-bold mb-1" style={{ fontSize: '0.75rem' }}>
          {dayNames.map((name, idx) => (
            <div key={idx} style={{ width: 'calc(100% / 7)', textAlign: 'center' }}>{name}</div>
          ))}
        </div>
        <div className="d-flex flex-wrap" style={{ minHeight: '180px' }}>
          {calendarDays.map((cellDate, idx) => {
            const isCurrentMonth = cellDate.getMonth() === currentMonth.getMonth();
            const isSelected = isSameDay(cellDate, date);
            const todayHighlight = isToday(cellDate);

            const cellStyle = {
              width: 'calc(100% / 7)',
              padding: '4px 0',
              textAlign: 'center',
              cursor: isCurrentMonth ? 'pointer' : 'default',
              backgroundColor: isSelected ? '#007bff' : todayHighlight ? '#c6e0ff' : isCurrentMonth ? 'white' : '#f0f0f0',
              color: isSelected ? 'white' : isCurrentMonth ? 'black' : '#aaa',
              borderRadius: '5px',
              margin: '0',
              fontSize: '0.8rem',
              fontWeight: todayHighlight ? '600' : 'normal',
              boxShadow: todayHighlight && !isSelected ? 'inset 0 0 5px #5b9bd5' : 'none',
              height: '28px',
              lineHeight: '24px'
            };

            return (
              <div
                key={idx}
                style={cellStyle}
                onClick={() => isCurrentMonth && handleDateClick(cellDate)}
                role="button"
                tabIndex={isCurrentMonth ? 0 : -1}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    isCurrentMonth && handleDateClick(cellDate);
                  }
                }}
              >
                {cellDate.getDate()}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-2 font-weight-bold" style={{ fontSize: '0.85rem' }}>
          Выбранная дата: {date.toLocaleDateString()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DatePicker;

