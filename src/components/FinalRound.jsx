import React, { useEffect, useState } from 'react';

const FinalRound = ({
  score,
  setDisplayQuestion,
  setIsAnswerable,
  startTimer,
  state,
  setRound
}) => {
  // TODO: Let's everyone do the last round
  // TODO: temp
  const category = "Youtube";
  const question = "What year was youtube founded?";
  const answer = "2005";

  const [wager, setWager] = useState(0);
  const [questionActive, setQuestionActive] = useState(false);
  const [userAnswerComponent, setUserAnswerComponent] = useState();

  const maxWager = score > 0 ? parseInt(score) : 2000;

  const handleSubmitWager = (e) => {
    e.preventDefault();

    setQuestionActive(true);

    // TODO: Delay?
    setDisplayQuestion(true, false, '');
    setIsAnswerable(false, answer, parseInt(wager));
    startTimer(5);
  }

  useEffect(() => {
    // TODO: does not display incorrect answer
    if (!state.gameState.displayQuestion.open && state.gameState.displayQuestion.userAnswer) {
      setUserAnswerComponent(
        <div className="user-answer-container">
          <div>{ state.username } said { state.gameState.displayQuestion.userAnswer }</div>
          <div className="correct-or-not">
            {state.gameState.displayQuestion.correct ? "Correct!" : "Incorrect!"}
          </div>
        </div>
      )
      setTimeout(() => {
        setRound(4);
      }, 3000);
    }
  }, [state])

  let content;

  if (questionActive) {
    content = 
      <div className="content-container">
        <div className="question-container">
          <div>For ${wager}: </div>
          {question}
        </div>
        {userAnswerComponent}
      </div>
  } else {
    content = 
      <form onSubmit={handleSubmitWager}>
        <input
          type="number"
          value={wager}
          min="0"
          max={maxWager}
          onChange={({currentTarget}) => setWager(currentTarget.value)}
        />
        <input
          type="range"
          value={wager}
          min="0"
          max={maxWager}
          onChange={({currentTarget}) => setWager(currentTarget.value)}
        />
        <button>
          Set Wager
        </button>
      </form>
  }

  return (
    <div className="final-round-container">
      <h4>Final Round!</h4>
      <p>Wager up to your current score (up to ${maxWager}) for this final question about: </p>
      <h4>{ category }</h4>
      { content }
    </div>
  )
}

export default FinalRound;
