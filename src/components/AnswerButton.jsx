import React, { useState } from 'react';

const AnswerButton = ({
  state,
  setIsAnswerable,
  addScore,
  resetTimer,
  setDisplayQuestion
}) => {
  const [answer, setAnswer] = useState("");

  // TODO: Alt method, press button, then type answer

  // To handle both button press or enter
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!state.answerable.locked) {
      if (answer === state.answerable.answer) {
        // Add score
        addScore(state.answerable.score)
        setDisplayQuestion(false, true);
        console.log("YAY: ", state.answerable.score);
      } else {
        // Minus score
        addScore(-1 * state.answerable.score)
        setDisplayQuestion(false, false);
        console.log("wrong");
      }
      setAnswer("");
      setIsAnswerable(true, "", 0);
      resetTimer();
    };
  };

  return (
    <div className="answer-button-container">
      <form onSubmit={handleAnswerSubmit}>
        <button type="submit" className="answer-button"></button>
        <input
          type="text"
          placeholder="Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
        />
      </form>
    </div>
  )
}

export default AnswerButton;
