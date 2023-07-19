import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RandomPokemons({ pokemonList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState(pokemonList);

  const fetchRandomPokemons = () => {
    setIsLoading(true);
    // Shuffle the pokemonList array
    const shuffledPokemons = pokemonList.sort(() => 0.5 - Math.random());
    // Take the first six elements as randomPokemons
    const randomPokemons = shuffledPokemons.slice(0, 6);
    setIsLoading(false);
    return randomPokemons;
  };

  useEffect(() => {
    setPokemons(pokemonList);
  }, [pokemonList]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleShuffleClick = () => {
    const randomPokemons = fetchRandomPokemons();
    setPokemons(randomPokemons);
  };

  return (
    <div>
      <h1 className="title-random-pokemons">Choose Another Pokemon</h1>
      <button className="shuffle-button" onClick={handleShuffleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Shuffle'}
      </button>
      <ul className="pokemon-list">
        {pokemons && pokemons.map((pokemon) => (
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
