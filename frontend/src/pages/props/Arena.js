import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import RandomPokemons from "../../components/RandomPokemons";

const Arena = () => {
  const location = useLocation();
  const { pokemon } = location.state;
  const [randomPokemon, setRandomPokemon] = useState(null);

  // Fetch a random pokemon when component mounts
  useEffect(() => {
    const fetchRandomPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898)}`
      );
      const data = await response.json();
      setRandomPokemon(data);
    };

    fetchRandomPokemon();
  }, []);

  // Declare a winner based on stats comparison
 
  const declareWinner = () => {
    let myPokemonStat = Object.values(pokemon.base).reduce((sum, stat) => sum + stat, 0);
    let randomPokemonStat = randomPokemon.stats?.reduce((sum, stat) => sum + stat.base_stat, 0);
    if (myPokemonStat > randomPokemonStat) {
      alert(`Congratulations! ${pokemon.name.english} wins!`);
    } else if (myPokemonStat < randomPokemonStat) {
      alert(`Sorry! ${randomPokemon.name} wins!`);
    } else {
      alert("It's a tie!");
    }
    console.log(`myPokemonStat: ${myPokemonStat}`);
console.log(`randomPokemonStat: ${randomPokemonStat}`);
  };
  
  // Return loading screen while fetching random pokemon
  if (!randomPokemon) {
    return <div>Loading...</div>;
  }

  // Render arena view once both myPokemon and randomPokemon are fetched
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <div className="pokemon-card">
            <div className="pokemon-image-container">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={`My ${pokemon.name}`}
                className="feature-pokemon-image"
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="pokemon-card">
            <div className="pokemon-image-container">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemon.id}.png`}
                alt={`Random ${randomPokemon.name}`}
                className="feature-pokemon-image"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" onClick={declareWinner}>
          Fight
        </Button>
      </div>
      <RandomPokemons />
    </Container>
  );
};

export default Arena;