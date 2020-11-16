import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing-container">
      <h1 className="landing-header">Jeopardy: Scuffed Edition</h1>
      <Link className="landing-button" to="/room/69420">
        Start a game
      </Link>
      <Link className="landing-button" to="/">
        Join a game
      </Link>
    </section>
  )
}

export default Landing;
