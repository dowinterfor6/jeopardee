import React from 'react';

const Results = ({ username, score }) => {
  return (
    <div className="results-container">
      <span>{ username }</span>
      <span>{ score }</span>
      {/* TODO: This lol */}
      <button>New Game</button>
    </div>
  )
}

export default Results;
