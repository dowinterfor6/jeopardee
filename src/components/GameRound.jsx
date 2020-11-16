import React from 'react';
import { Link, useParams } from 'react-router-dom';
import tempData from '../temp-backend';
import { shuffle } from 'lodash';
import QuestionCard from './QuestionCard';
import TimeRemaining from './TimeRemaining';
import AnswerButton from './AnswerButton';

const GameRound = ({ state, dispatch, RESET_TIMER, START_TIMER }) => {
  const resetTimer = () => dispatch({
    type: RESET_TIMER
  });

  const startTimer = (time) => dispatch({
    type: START_TIMER,
    payload: {
      time,
      currTime: 0,
      startTimer: true,
    }
  })

  const { roomId, round } = useParams();
  const finalRound = parseInt(round) === 3;
  const baseScore = 200 * round;
  let questionBoardContainer;

  if (!finalRound) {
    const questions = tempData.questions.slice(0, 6);

    const parseQuestions = (questions, number, scoreMultiplier) => (
      shuffle(questions).slice(0, number).map(({ question, answer }, idx) => (
        <li className="card" key={`card-${idx}`}>
          <QuestionCard
            question={question}
            answer={answer}
            score={scoreMultiplier * baseScore + baseScore * idx}
            startTimer={startTimer}
          />
        </li>
      ))
    );

    const categoryContainer = questions.map(({ category, easy, medium, hard}, idx) => (
      <ul className="category-container" key={`category-${idx}`}>
        <li className="category-header">{category}</li>
        {parseQuestions(easy, 2, 1)}
        {parseQuestions(medium, 2, 3)}
        {parseQuestions(hard, 1, 5)}
      </ul>
    ));

    questionBoardContainer = (
      <section className="question-board-container">
        {categoryContainer}
      </section>
    )
  } else {
    questionBoardContainer = (
      <section className="question-board-final">
        FINAL ROUND
      </section>
    )
  }

  return (
    <section className="game-round-container">
      <div className="top-bar">
        <div className="top">
          <div className="score">
            Score
          </div>
          <div className="round-display">
            Round {round}
          </div>
        </div>
        <div className="round-header">
          Select a question
        </div>
        <Link className="dev" to={`/room/${roomId}/round/${parseInt(round) + 1}`}>
          Next Round (Dev only)
        </Link>
      </div>

      <div className="content">
        {questionBoardContainer}
      </div>

      <div className="bottom-bar">
        <TimeRemaining resetTimer={resetTimer} timer={state.timer}/>
        <AnswerButton />
      </div>
    </section>
  )
}

export default GameRound;
