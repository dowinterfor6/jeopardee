import React, { useEffect, useState } from 'react';

const TimeRemaining = ({
  resetTimer,
  timer,
  maxTime,
  setIsAnswerable,
  setDisplayQuestion,
  gameState
}) => {
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
    } else if (isActive && (currTime === 0 || !timer.startTimer)) {
      setCurrTime(0);
      setIsAnswerable(true, "", 0);
      setIsActive(false);
      if (gameState.displayQuestion.open && !gameState.displayQuestion.correct) {
        setDisplayQuestion(false, false, '');
      }
      clearInterval(currInterval);
      resetTimer();
    }
  }, [currTime, isActive, currInterval, timer, resetTimer]);

  
  const buildTimerBar = (maxTime) => {
    let timerArr = [];
    for (let i = 1; i <= maxTime; i++) {
      timerArr.push(i <= currTime);
    }
    return timerArr;
  }

  const timerBar = (
    <div className="timer-container">
      {buildTimerBar(maxTime).map((isTime, idx) => (
        <div
          className={`timer-piece ${isTime ? 'active' : ''}`}
          key={`timer-${idx}`}
        >
        </div>
      ))}
    </div>
  )
  
  return (
    <div className="time-remaining-container">
      TIME LEFT {currTime}
      {timerBar}
    </div>
  )
}

export default TimeRemaining;
