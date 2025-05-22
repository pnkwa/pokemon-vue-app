<script setup lang="ts">
const props = defineProps<{
  name: string;
  image: string;
}>();
</script>

<template>
  <div class="card">
    <img :src="props.image" :alt="props.name" class="pokemon-img" />
    <div class="card-title">{{ props.name }}</div>
  </div>
</template>

<style scoped>
.card {
  width: 250px;
  background-color: #fff8dc;
  border: 2px solid #f2c94c;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  font-family: "Comic Sans MS", cursive, sans-serif;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

.pokemon-img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background-color: #fff3b0;
  border-radius: 12px;
  padding: 10px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #e67e22;
  margin: 12px 0;
  text-transform: capitalize;
}

.card-detail {
  margin-top: 10px;
  font-size: 14px;
  color: #444;
}
</style>
