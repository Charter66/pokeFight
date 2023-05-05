const db = require('../db');

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await db.collection('pokemons_data').find().toArray();
    res.json(pokemons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getPokemonsById = async (req, res) => {
  try {
    const pokemon = await db.collection('pokemons_data').findOne({ id: parseInt(req.params.id) });
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ message: 'Pokemon not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getPokemonByInfo = async(req, res) => {
  const { id, info } = req.params;
  const poke =  await db.collection('pokemons_data').findOne({ id: parseInt(req.params.id) });

  if (!poke) {
    return res.status(404).json({ message: 'Pokemon not found' });
  }

  const data = poke[info];

  if (!data) {
    return res.status(400).json({ message: 'Invalid info requested' });
  }

  return res.json(data);
};





module.exports = {
  getAllPokemons,
  getPokemonsById,
  getPokemonByInfo
};
