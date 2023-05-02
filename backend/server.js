const express = require('express');
const cors =require('cors');
const app = express();
const pokemonRouter = require('./routes/pokemon');

app.use(cors())
// Set up routes
app.use('/pokemons', pokemonRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
