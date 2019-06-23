import { useState, useEffect } from 'react';

function formatDate(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = date.getDate();
  const monthIndex = date.getMonth();

  return `${days[date.getDay()]}, ${monthNames[monthIndex]} ${day}`;
}

function now(nowTime) {
  const hour = nowTime
    .getHours()
    .toString()
    .padStart(2, '0');
  const minute = nowTime
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const seconds = nowTime
    .getSeconds()
    .toString()
    .padStart(2, '0');

  return `${hour}:${minute}:${seconds}`;
}
function today(nowTime) {
  return formatDate(nowTime);
}

function useDate() {
  const [nowTime, setNowTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { today: today(nowTime), now: now(nowTime) };
}

export default useDate;
