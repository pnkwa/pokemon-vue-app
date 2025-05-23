<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
console.log("route >>", route);
</script>

<template>
  <div>
    <span>Detail Pokemon</span>
  </div>
</template>
