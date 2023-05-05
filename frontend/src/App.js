import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Arena from './pages/props/Arena';
import './App.css';

function App() {

  const [pokemonList, setPokemonList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PROD_BACKEND}/pokemons`);
        const data = await response.json();
        console.log(data)
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
  console.log(pokemonList)


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home  pokemonList={pokemonList} selectedType={selectedType} setSelectedType={setSelectedType}/>} />
          <Route path="/pokemon/:id" element={<Pokemon pokemonList={pokemonList} selectedType={selectedType} setSelectedType={setSelectedType}/>} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/pokemon/:id/arena" element={<Arena  />} />

        </Routes>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
