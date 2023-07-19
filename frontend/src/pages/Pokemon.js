import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Badge, ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RandomPokemons from "../components/RandomPokemons";
import ('../App.css');



const Pokemon = ({pokemonList, selectedPokemon}) => {
  const [pokemon, setPokemon] = useState(null)
  const { id } = useParams();
 console.log(selectedPokemon)
  useEffect(() => {
   
    const clickedPokemon = pokemonList.find(pokemon => pokemon.id === parseInt(id))
    setPokemon(clickedPokemon);
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }


    return (
        <Container className="my-5">
          <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center retro-bg">
  <div className="pokemon-card">
    <div className="pokemon-image-container">
      <Image src={pokemon.imageUrl} alt={pokemon.name.english} className="feature-pokemon-image" />
    </div>
  </div>
</Col>
            <Col md={6}>
            <div className="feature-name-container">
  <h2 className="mb-3 feature-name">{pokemon.name.english}</h2>
</div>
              <p className="mb-3">
                {pokemon.type.map((type, index) => (
                  <Badge pill variant="danger" key={index} className="mr-1 type">{type}</Badge>
                ))}
              </p>
              <div className="pokemon-stats-container">
                <div className="pokemon-stat mb-2">
                  <span className="pokemon-stat-label-single">HP:</span>
                  <span className="pokemon-stat-value">{pokemon.base.HP}</span>
                  <ProgressBar variant="success" now={pokemon.base.HP} max={100} className="mx-2" />
                </div>
                <div className="pokemon-stat mb-2">
                  <span className="pokemon-stat-label-single">Attack:</span>
                  <span className="pokemon-stat-value">{pokemon.base.Attack}</span>
                  <ProgressBar variant="danger" now={(pokemon.base.Attack / 100) * 100} className="mx-2" />
                </div>
                <div className="pokemon-stat mb-2">
                  <span className="pokemon-stat-label-single">Defense:</span>
                  <span className="pokemon-stat-value">{pokemon.base.Defense}</span>
                  <ProgressBar variant="warning" now={(pokemon.base.Defense / 100) * 100} className="mx-2" />
                </div>
                <div className="pokemon-stat mb-2">
                  <span className="pokemon-stat-label-single">Sp. Defense:</span>
                  <span className="pokemon-stat-value">{pokemon.base['Sp. Defense']}</span>
                  <ProgressBar variant="warning" now={(pokemon.base['Sp. Defense'] / 100) * 100} className="mx-2" />
                </div>
                <div className="pokemon-stat mb-2">
                  <span className="pokemon-stat-label-single">Speed:</span>
                  <span className="pokemon-stat-value">{pokemon.base.Speed}</span>
                  <ProgressBar variant="info" now={(pokemon.base.Speed /100 ) * 100} className="mx-2" />
                </div>
              </div>
              <Link to='/pokemon/:id/arena' state={{pokemon: pokemon}}>
              <Button  className="mt-3 btn">Choose {pokemon.name.english} Pokemon</Button>
              </Link>                 
            </Col>
          </Row>
          <div>
      <RandomPokemons 
          pokemonList={pokemonList}
      />
    </div>

        </Container>
      );
};

export default Pokemon;
