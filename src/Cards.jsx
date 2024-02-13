import './Cards.css';
import { useState, useEffect } from 'react';
import Card from './containers/Card';
import PropTypes from 'prop-types';

// Display logic
function DisplayCards({ score, setScore }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [trackedList, setTrackedList] = useState([]);
  const [flip, setFlip] = useState(false);

  // Fetches pokemon data
  function GetPokemon() {
    useEffect(() => {
      const fetchPokemon = (id) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setPokemonData((prevData) => {
              // Replace the existing data with the new data (prevents duplicates)
              const newData = [...prevData];
              newData[id - 1] = data;
              return newData;
            });
          })
          .catch((error) => {
            console.error('Error fetching Pokemon data:', error);
          });
      };

      // Fetch 8 pokemon
      for (let i = 1; i <= 8; i++) {
        fetchPokemon(i);
      }
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

      // Check for win condition
      if (trackedList.length === 7) {
        alert('you win!');
      }
    } else {
      alert('you lose!');
      setTrackedList([]); // Reset list
      setScore(0); // Reset score
    }
  }

  let randomArray = shuffleArray([...Array(8).keys()]); // Set inital array between 0-7
  const data = GetPokemon(); // Get pokemon data

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
};

export default DisplayCards;
