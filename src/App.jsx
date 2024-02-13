import './App.css';
import DisplayCards from './Cards';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  return (
    <>
      <div className="header">
        <h1 className="heading">Pokemon!</h1>
        <div className="scoreboard">Score: {score}</div>
      </div>
      <DisplayCards score={score} setScore={setScore} />
    </>
  );
}

export default App;
