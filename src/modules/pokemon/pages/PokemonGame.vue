<script setup lang="ts">
import PokemonImage from '../components/PokemonImage.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { gameStatus } = usePokemonGame();
</script>

<template>
  <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3>Cargando pokemons</h3>
  </section>

  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1>¿Quién soy?</h1>

    <!-- Pokemon picture -->
    <PokemonImage />
    <!-- Pokemon options -->
    <PokemonOptions />
  </section>
</template>
