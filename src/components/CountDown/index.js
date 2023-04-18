import React from 'react';
import CountdownTimer from './CountdownTimer';

export default function App() {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const SEVEN_DAYS_IN_MS = 1 * 1 * 1 * 6 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;

  return (
    <div>
      <h1>Countdown Timer</h1>

      <h2>Expires after 3 days!!!</h2>
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />

      <h2>Expires after 7 days!!!</h2>
      <CountdownTimer targetDate={dateTimeAfterSevenDays} />
    </div>
  );
}