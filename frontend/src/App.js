import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Arena from './pages/props/Arena';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://pokefight-g0qz.onrender.com/pokemons`);
      const data = await response.json();
      // Fetch and add the image URL for each Pokemon
      const pokemonWithImages = await Promise.all(
        data.map(async (pokemon) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
          const pokemonData = await response.json();
          const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
          console.log(pokemon)

          return { ...pokemon, imageUrl };
        })
      );
      

      setPokemonList(pokemonWithImages);

      // Get the list of unique Pokemon types
      const types = [...new Set(pokemonWithImages.flatMap((pokemon) => pokemon.type))];
      setTypesList(types);

      // Store the fetched data in local storage with a unique key
      localStorage.setItem('pokemonData', JSON.stringify(pokemonWithImages));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check if the data is already in local storage
    const cachedPokemonData = localStorage.getItem('pokemonData');

    if (cachedPokemonData === null) {
      // If not cached, fetch the data from the API
      fetchData();
    } else {
      // If cached, parse and use the cached data
      const parsedCachedData = JSON.parse(cachedPokemonData);
      setPokemonList(parsedCachedData);

      // Update the types list from the cached data as well
      const types = [...new Set(parsedCachedData.flatMap((pokemon) => pokemon.type))];
      setTypesList(types);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home pokemonList={pokemonList} selectedType={selectedType} setSelectedType={setSelectedType} />} />
          <Route path="/pokemon/:id" element={<Pokemon pokemonList={pokemonList} />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/pokemon/:id/arena" element={<Arena />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
