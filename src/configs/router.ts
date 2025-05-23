import Home from "@/pages/index.vue";
import DetailPokemon from "@/pages/DetailPokemon.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  {
    path: "/detail/:id",
    component: DetailPokemon,
  },
];
