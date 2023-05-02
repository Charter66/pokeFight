const express = require('express');
const router = express.Router();

const {getAllPokemons, getPokemonsById , getPokemonByInfo} = require('../controllers/pokemonController')

router.get('/', getAllPokemons)
router.get('/:id' , getPokemonsById)
router.get('/:id/:info', getPokemonByInfo)

module.exports = router