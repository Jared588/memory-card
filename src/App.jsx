import './App.css';
import DisplayCards from './Cards';
import { useState } from 'react';

function App() {
  const [highscore, setHighscore] = useState(0);
  const [score, setScore] = useState(0);
  return (
    <>
      <div className="header">
        <h1>Pokemon!</h1>
        <p>Highscore: {highscore}</p>
        <p>Score: {score}</p>
      </div>
      <DisplayCards score={score} setScore={setScore} highscore={highscore} setHighscore={setHighscore} />
    </>
  );
}

export default App;
