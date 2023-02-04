<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
const store = useRecipeStore();
</script>
<template>
  <div v-if="store.recipe.name">
    <h2>
      {{ store.recipe.name ?? "recipe name" }}
    </h2>
    <h3>serving size: {{ store.recipe.serving }}</h3>
    <h2>Description</h2>
    <p>{{ store.recipe.description }}</p>
    <h2>Ingrediants</h2>
    <div v-for="ingrediant in store.recipe.ingrediants" :key="ingrediant.name">
      <p>{{ ingrediant.amount }} {{ ingrediant.name }}</p>
      <br />
    </div>
    <p>Instructions: {{ store.recipe.instructions }}</p>
  </div>
</template>
