import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Arena from './pages/Arena';
import RandomPokemons from './components/RandomPokemons';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  const fetchData = async (limit, page) => {
    try {
      const response = await fetch(`https://pokefight-g0qz.onrender.com/pokemons?limit=${limit}&page=${page}`);
      const data = await response.json();
      // Fetch and add the image URL for each Pokemon
      const pokemonWithImages = await Promise.all(
        data.map(async (pokemon) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}?`);
          const pokemonData = await response.json();
          const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
  
          return { ...pokemon, imageUrl };
        })
      );
  
      setPokemonList((prevPokemonList) => [...prevPokemonList, ...pokemonWithImages]);
  
      // Get the list of unique Pokemon types
      const types = [...new Set(pokemonWithImages.flatMap((pokemon) => pokemon.type))];
      setTypesList(types);
  
      const pokemonIds = pokemonWithImages.map((pokemon) => pokemon.id);
      setSelectedPokemon(pokemonIds);
  
      // Store the fetched data in local storage with a unique key
      localStorage.setItem('pokemonData', JSON.stringify(pokemonList));
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    // Call fetchData to fetch the first 20 Pokémon
    fetchData(20);
  }, []); // Run only once on component mount

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home pokemonList={pokemonList} selectedPokemon={selectedPokemon} selectedType={selectedType} setSelectedType={setSelectedType} />}
          />
          <Route
            path="/pokemon/:id"
            element={<Pokemon pokemonList={pokemonList} fetchData={fetchData} />}selectedPokemon={selectedPokemon} selectedType={selectedType} />
          <Route exact path="/pokemon/:id/arena" element={<Arena pokemonList={pokemonList} /> }   />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
