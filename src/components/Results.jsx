import React from 'react';
import { Link } from 'react-router-dom';

const Results = ({ username, score }) => {
  const scoreDisplay = `you finished with $${score} ${score >= 0 ? '' : 'in debt'}!`;
  
  return (
    <div className="results-container">
      <div className="results-wrapper">
        <h3>
          Congratulations '{ username }' {scoreDisplay}
        </h3>
        <Link to="/" className="button">
          <button>
            Back to main page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Results;
