import './App.css';
import DisplayCards from './Cards';
import { useState } from 'react';
import DisplayModal from './Modal';

function App() {
  const [highscore, setHighscore] = useState(0);
  const [score, setScore] = useState(0);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [outcome, setOutcome] = useState('');
  const [cardAmount, setCardAmount] = useState(8); // Default card amount

  // Event handler for numOfCards input
  const handleCardAmountChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value > 30 || value < 0) {
      setCardAmount('');
    } else {
      setCardAmount(value);
    }
  };

  return (
    <>
      <div className="header">
        <h1>Pokémon!</h1>
        <div className="scoreboard">
          <p>Highscore: {highscore}</p>
          <p>Score: {score}</p>
        </div>
      </div>
      <div className="card-input">
        Cards(30Max):
        <input
          type="number"
          min={1}
          max={30}
          value={cardAmount}
          onChange={handleCardAmountChange}
        />
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
        cardAmount={cardAmount}
      />
    </>
  );
}

export default App;
