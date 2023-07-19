import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ pokemonList, setSelectedType, selectedType }) {
  const [page, setPage] = useState(1);
  const pokemonPerPage = 18;

  const handleTypeSelect = (event) => {
    setSelectedType(event.target.value);
    setPage(1); // Reset the page to 1 whenever a type is selected
  };

  // Filter the Pokemon list by selected type
  const filteredPokemonList = selectedType
    ? pokemonList.filter((pokemon) => pokemon.type.includes(selectedType))
    : pokemonList;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);

  // Calculate the starting index and ending index for the current page
  const startIndex = (page - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;
  const currentPokemonList = filteredPokemonList.slice(startIndex, endIndex);

  // Function to handle changing the page
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

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
          {[...new Set(pokemonList.flatMap((pokemon) => pokemon.type))].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <ul className="pokemon-list">
        {currentPokemonList.map((pokemon) => (
          <li className="pokemon-card" key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <img className="pokemon-image-home" src={pokemon.imageUrl} alt={pokemon.name.english} />
              <h2 className="pokemon-name">{pokemon.name.english}</h2>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination mt-3">
  {/* Previous button */}
  <button
    className="btn btn-primary mr-2"
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
  >
    &laquo; Prev
  </button>

  {/* Page numbers */}
  {Array.from({ length: Math.min(totalPages,0) }).map((_, index) => {const pageNumber= page + index - 8; // Calculate the current page number to display
    return pageNumber > 0 && pageNumber <= totalPages ? (
      <button
        key={index}
        className={`btn btn-outline-primary mx-1 ${page === pageNumber ? 'active' : ''}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ) : null;
  })}

  {/* Next button */}
  <button
    className="btn btn-primary ml-2"
    onClick={() => handlePageChange(page + 1)}
    disabled={page === totalPages}
  >
    Next &raquo;
  </button>
</div>
    </div>
  );
}

export default Home;