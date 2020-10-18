import React from 'react';
import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addDays,
  startOfDay,
  endOfDay,
  addHours,
  setMinutes,
  setSeconds,
  setHours,
  parseISO,
 } from 'date-fns';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Dinner {
  date: string;
  name: string;
}
function dinnerEvent(dinner: Dinner): Event {
  const date = parseISO(dinner.date);
  const dinnerStart = setHours(setMinutes(setSeconds(date, 0), 0), 18);
  const dinnerEnd = addHours(dinnerStart, 1)
  return {
    title: dinner.name,
    start: dinnerStart,
    end: dinnerEnd,
  }
}

function App() {
  const dinners: Dinner[] = [
    {
      name: 'Chicken & Squash & Mushrooms',
      date: '2020-10-18',
    },
    {
      name: 'Eggplant Parmesean',
      date: '2020-10-19',
    },
    {
      name: 'Buddah Bowls',
      date: '2020-10-20',
    },
    {
      name: 'Smoked Chicken Wings',
      date: '2020-10-21',
    },
    {
      name: 'Garlic Tofu & Broccoli',
      date: '2020-10-22',
    },
    {
      name: 'Take-Out',
      date: '2020-10-23',
    },
  ];

  const events = dinners.map(dinnerEvent);
  console.log(events);
  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        views={{
          month: true,
          week: true,
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 768}}
      />
    </div>
  );
}

export default App;
