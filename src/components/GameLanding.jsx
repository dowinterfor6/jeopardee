import React, { useState } from 'react';

const GameLanding = ({ setRound, setUsername }) => {
  const [uname, setUname] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setRound(1);
    setUsername(uname);
  }

  return (
    <section className="game-landing-container">
      <form onSubmit={handleSubmit}>
        <label>
          Enter a name!
          <input
            type="text"
            required
            value={uname}
            onChange={({ currentTarget }) => setUname(currentTarget.value)}/>
        </label>
        <button
          className="game-button"
        >
          Start the game!
        </button>
      </form>
    </section>
  )
}

export default GameLanding;
