import './App.css';
import DisplayCards from './Cards';
import { useState } from 'react';
import DisplayModal from './Modal';

function App() {
  const [highscore, setHighscore] = useState(0);
  const [score, setScore] = useState(0);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [outcome, setOutcome] = useState('');
  return (
    <>
      <div className="header">
        <h1>Pokemon!</h1>
        <p>Highscore: {highscore}</p>
        <p>Score: {score}</p>
      </div>
      <DisplayModal
        outcome={outcome}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
      <DisplayCards
        score={score}
        setScore={setScore}
        highscore={highscore}
        setHighscore={setHighscore}
        setOutcome={setOutcome}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
    </>
  );
}

export default App;
