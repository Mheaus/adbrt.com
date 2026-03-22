import { useState, useEffect } from 'react';

function formatDate(date: Date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatTime(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

export default function useDate() {
  const [nowTime, setNowTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNowTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return { today: formatDate(nowTime), now: formatTime(nowTime) };
}
