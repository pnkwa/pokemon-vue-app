<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import PokemonCard from "./components/PokemonCard.vue";
import { fetchPokemon, fetchPokemonByType } from "./services/pokemonApi";
import CircularProgress from "./components/CircularProgress.vue";
import SelectFilter, { type TypeOption } from "./components/SelectFilter.vue";
import PokemonLogo from "./assets/pokemon-23.svg";

const pokemons = ref<{ name: string; image: string }[]>([]);
const loading = ref(false);
const offset = ref(0);
const limit = 9;

const scrollContainer = ref<HTMLElement | null>(null);
const selectedType = ref<TypeOption | null>(null);

const loadMorePokemon = async () => {
  if (loading.value) return;
  loading.value = true;
  await fetchPokemon(pokemons, offset.value, limit);
  offset.value += limit;
  loading.value = false;
};

const selectedTypeLabel = computed(() => selectedType.value?.label || "All");

const filterByType = async () => {
  pokemons.value = [];
  offset.value = 0;
  loading.value = true;

  if (selectedType.value?.value) {
    await fetchPokemonByType(pokemons, selectedType.value.value);
  } else {
    await loadMorePokemon();
  }

  loading.value = false;
};

const handleScroll = () => {
  const container = scrollContainer.value;
  if (!container) return;

  const nearBottom =
    container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

  if (nearBottom) loadMorePokemon();
};

onMounted(() => {
  loadMorePokemon();
});

watch(selectedType, () => {
  filterByType();
});
</script>

<template>
  <div class="app-container">
    <header class="sticky-header">
      <img :src="PokemonLogo" alt="Pokémon Logo" class="pokemon-logo" />
      <SelectFilter v-model:type="selectedType" />

      <p>Filtering by: {{ selectedTypeLabel }}</p>
    </header>

    <main
      class="scrollable-content"
      @scroll.passive="handleScroll"
      ref="scrollContainer"
    >
      <div class="pokemon-grid">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.name"
          :name="pokemon.name"
          :image="pokemon.image"
        />
      </div>
      <div v-if="loading" class="loader">
        <CircularProgress />
      </div>
    </main>
  </div>
</template>

<style>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sticky-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.pokemon-logo {
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: auto;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.scrollable-content {
  overflow-y: auto;
  flex-grow: 1;
  padding: 20px;
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.loader {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
