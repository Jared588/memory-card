import './Cards.css';
import { useState, useEffect } from 'react';
import Card from './containers/Card';

function Cards() {
    const [pokemonData, setPokemonData] = useState([])

    useEffect(() => {
        const fetchPokemon = (id) => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                .then(response => {
                    if(!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPokemonData(prevData => [...prevData, data])
                })
                .catch(error => {
                    console.error('Error fetching Pokemon data:', error);
                });
        };

        // fetch 8 pokemon
        for (let i = 1; i <= 8; i++) {
            fetchPokemon(i);
        }
    }, []);

    console.log(pokemonData)
    
    return (
        <>
            <div className='cards-container'>
                {pokemonData[0] && (
                    <>
                        <Card id={0} data={pokemonData} />
                        <Card id={1} data={pokemonData} />
                        <Card id={2} data={pokemonData} />
                        <Card id={3} data={pokemonData} />
                        <Card id={4} data={pokemonData} />
                        <Card id={5} data={pokemonData} />
                        <Card id={6} data={pokemonData} />
                        <Card id={7} data={pokemonData} />
                    </>
                )}
            </div>
        </>
    )
}

export default Cards;