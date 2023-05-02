import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/pokemons');
        const data = await response.json();

        // Fetch and add the image URL for each Pokemon
        const pokemonWithImages = await Promise.all(
          data.map(async (pokemon) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            const pokemonData = await response.json();
            const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
            return { ...pokemon, imageUrl };
          })
        );

        setPokemonList(pokemonWithImages);

        // Get the list of unique Pokemon types
        const types = [...new Set(pokemonWithImages.flatMap(pokemon => pokemon.type))];
        setTypesList(types);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleTypeSelect = (event) => {
    setSelectedType(event.target.value);
  };

  // Filter the Pokemon list by selected type
  const filteredPokemonList = selectedType ? pokemonList.filter((pokemon) => pokemon.type.includes(selectedType)) : pokemonList;
  const uniqueTypes = new Set(pokemonList.flatMap(pokemon => pokemon.type));

  return (
    <div>
      <div className="title-container">
        <h1 className="title">Pokemon List</h1>
      </div>
      <div className="dropdown-home">
        {/* Render a dropdown list of Pokemon types */}
        <label htmlFor="type-select">Select a type:</label>
        <select id="type-select" onChange={handleTypeSelect}>
          <option value="">All types</option>
          {[...uniqueTypes].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <ul className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <li className="pokemon-card" key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <img className="pokemon-image-home" src={pokemon.imageUrl} alt={pokemon.name.english} />
              <h2 className="pokemon-name">{pokemon.name.english}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
