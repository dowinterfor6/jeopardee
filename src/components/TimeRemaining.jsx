import React, { useEffect, useState } from 'react';

const TimeRemaining = ({ resetTimer, timer }) => {
  const [currTime, setCurrTime] = useState();
  const [isActive, setIsActive] = useState(false);
  const [currInterval, setCurrInterval] = useState();

  useEffect(() => {
    if (!isActive && timer.startTimer) {
      setCurrTime(timer.currTime);
      setIsActive(true);
      setCurrInterval(setInterval(() => {
        setCurrTime(currTime => currTime - 1);
      }, 1000));
    } else if (isActive && currTime === 0) {
      setIsActive(false);
      clearInterval(currInterval);
      resetTimer();
    }
  }, [currTime, isActive, currInterval, timer, resetTimer]);

  return (
    <div className="time-remaining-container">
      TIME LEFT {currTime}
    </div>
  )
}

export default TimeRemaining;
