// export async function fetchRandomPokemon() {
//     const randomId = Math.floor(Math.random() * 898) + 1; // Choose a random number between 1 and 898
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
//     const data = await response.json();
//     const imageUrl = data.sprites.other['official-artwork'].front_default;
//     return { id: randomId, imageUrl };
//   }