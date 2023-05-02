import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RandomPokemons() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomPokemons = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3000/pokemons');
    const data = await response.json();

    const getRandomPokemonList = () => {
      const randomPokemons = [];
      while (randomPokemons.length < 6) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!randomPokemons.includes(data[randomIndex])) {
          randomPokemons.push(data[randomIndex]);
        }
      }
      return randomPokemons;
    };

    const randomPokemonList = getRandomPokemonList();

    const pokemonWithImages = await Promise.all(
      randomPokemonList.map(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const pokemonData = await response.json();
        const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
        return { ...pokemon, imageUrl };
      })
    );
    setPokemonList(pokemonWithImages);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleShuffleClick = () => {
    fetchRandomPokemons();
  };

  return (
    <div >
      <h1 className="title-random-pokemons">Choose Another Pokemon</h1>
      <button className="shuffle-button" onClick={handleShuffleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Shuffle'}
      </button>
      <ul className="pokemon-list">
      
        {pokemonList.map((pokemon) => (
          <li className="pokemon-card" key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.id}`} onClick={scrollToTop}>

              <img className="random-pokemon-image" src={pokemon.imageUrl} alt={pokemon.name.english} />
              <h2 className="pokemon-name">{pokemon.name.english}</h2>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomPokemons;

