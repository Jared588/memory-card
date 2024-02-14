import './Cards.css';
import { useState, useEffect } from 'react';
import Card from './containers/Card';
import PropTypes from 'prop-types';

// Display logic
function DisplayCards({
  score,
  setScore,
  highscore,
  setHighscore,
  setOutcome,
  setModalDisplay,
  cardAmount,
}) {
  const [pokemonData, setPokemonData] = useState([]);
  const [trackedList, setTrackedList] = useState([]);
  const [flip, setFlip] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetches pokemon data
  function GetPokemon() {
    useEffect(() => {
      async function fetchData() {
        try {
          const responses = await Promise.all(
            Array.from({ length: 30 }, (_, i) =>
              fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`)
            )
          );
          const pokemons = await Promise.all(
            responses.map((response) => response.json())
          );
          setPokemonData(pokemons);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        }
      }
      fetchData();
    }, []);

    return pokemonData;
  }

  // Tracks selected pokemon
  function trackPokemon(name) {
    // Check if the pokemon has been previously selected
    if (!trackedList.includes(name)) {
      setTrackedList((prevData) => {
        return [...prevData, name]; // Log pokemon
      });
      setScore((score += 1)); // Add to score
      randomArray = shuffleArray(randomArray); // Refresh card order
      setFlip(true); // Start flip animation
      setTimeout(() => {
        setFlip(false);
      }, 1000); // Wait for animation to finish before changing state

      // Update highscore if necessary
      if (score > highscore) {
        setHighscore(score);
      }

      // Check for win condition
      if (trackedList.length === cardAmount - 1) {
        setOutcome('WIN');
        setModalDisplay(true);
        setTrackedList([]); // Reset list
        setScore(0); // Reset score
      }
    } else {
      setOutcome('LOSE');
      setModalDisplay(true);
      setTrackedList([]); // Reset list
      setScore(0); // Reset score
    }
  }

  let randomArray = shuffleArray([...Array(cardAmount).keys()]); // Set inital array between 0-7
  const data = GetPokemon(); // Get pokemon data

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.length > 0 && (
        <div className="cards-container">
          {randomArray.map((index) => (
            <Card
              key={index}
              id={index}
              data={data}
              handleClick={trackPokemon}
              flipStatus={flip}
            />
          ))}
        </div>
      )}
    </>
  );
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

DisplayCards.propTypes = {
  score: PropTypes.number,
  setScore: PropTypes.func,
  highscore: PropTypes.number,
  setHighscore: PropTypes.func,
  setOutcome: PropTypes.func,
  setModalDisplay: PropTypes.func,
  cardAmount: PropTypes.number,
};

export default DisplayCards;
