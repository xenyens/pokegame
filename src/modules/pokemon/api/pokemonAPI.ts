import axios from 'axios';

const pokemonApi = axios.create({
  baseURL: 'http://pokeapi.co/api/v2/pokemon',
});

export { pokemonApi };
