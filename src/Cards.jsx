import './Cards.css';
import { useState, useEffect } from 'react';
import Card from './containers/Card';

// Set initial sequence/order of cards
let randomArray = shuffleArray([...Array(8).keys()]); // Array between 0-7

// Fetches pokemon data
function GetPokemon() {
  const [pokemonData, setPokemonData] = useState([]);

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

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Display logic
function DisplayCards() {
  const [trackedList, setTrackedList] = useState([]);
  const data = GetPokemon();

  // Track pokemon
  function trackPokemon(name) {
    if(!trackedList.includes(name)) {
      setTrackedList((prevData) => {
        return [...prevData, name]
      })
      if(trackedList.length === 7) { // Check for win condition
        alert('you win!');
      }
      randomArray = shuffleArray(randomArray); // Refresh card order
    } else {
      alert('you lose!');
      setTrackedList([]); // Reset list
    }
    console.log(trackedList)
  }

  return (
    <>
      {data.length > 0 && (
        <div className="cards-container">
          {randomArray.map((index) => (
            <Card key={index} id={index} data={data} handleClick={trackPokemon} />
          ))}
        </div>
      )}
    </>
  );
}

export default DisplayCards;
