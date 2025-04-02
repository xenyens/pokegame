import { computed, onMounted, ref } from 'vue';
import { GameStatus, type PokemonListResponse, type Pokemon } from '../interfaces';
import { pokemonApi } from '../api/pokemonAPI';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemones = ref<Pokemon[]>([]);
  const theChosenOnes = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemones.value.length === 0);
  const randomPokemon = computed(
    () => theChosenOnes.value[Math.floor(Math.random() * theChosenOnes.value.length)],
  ); //Un pokemon de theChosenOnes

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

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getPokemonOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    theChosenOnes.value = pokemones.value.slice(0, howMany);
    pokemones.value = pokemones.value.slice(howMany);
  };

  onMounted(async () => {
    pokemones.value = await getPokemons();
    getPokemonOptions();
    console.log(theChosenOnes.value);
  });

  return {
    gameStatus,
    isLoading,
    theChosenOnes,
    randomPokemon,

    //methods
    getPokemonOptions,
  };
};
