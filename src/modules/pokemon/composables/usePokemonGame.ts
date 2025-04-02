import { onMounted, ref } from 'vue';
import { GameStatus, type PokemonListResponse, type Pokemon } from '../interfaces';
import { pokemonApi } from '../api/pokemonAPI';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=200');

    // Hacer que la respuesta sea random
    const pokemonArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonArray;
  };

  onMounted(async () => {
    const pokemones = await getPokemons();
    console.log(pokemones);
  });

  return {
    gameStatus,
  };
};
