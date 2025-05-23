// services/pokemonApi.ts
import axios from "axios";
import type { Ref } from "vue";

export const fetchPokemon = async (offset: number, limit: number) => {
  const url = `${
    import.meta.env.VITE_POKEAPI_URL
  }?limit=${limit}&offset=${offset}`;
  const res = await axios.get(url);
  const results = res.data.results;

  const detailed = await Promise.all(
    results.map(async (pokemon: { name: string; url: string }) => {
      const detail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: detail.data.sprites.front_default,
      };
    })
  );

  return detailed;
};

export const fetchPokemonByType = async (
  pokemons: Ref<{ name: string; image: string }[]>,
  typeId: number
) => {
  try {
    const url = `${import.meta.env.VITE_POKEAPI_TYPE_URL}/${typeId}`;
    const res = await axios.get(url);
    const results = res.data.pokemon;

    const detailed = await Promise.all(
      results.map(async (entry: any) => {
        const detail = await axios.get(entry.pokemon.url);
        return {
          name: detail.data.name,
          image: detail.data.sprites.front_default,
        };
      })
    );

    pokemons.value = detailed;
  } catch (err) {
    console.error("Error filtering Pokémon by type:", err);
  }
};
