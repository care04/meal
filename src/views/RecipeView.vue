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
    <li v-for="ingredient in store.recipe.ingredients" :key="ingredient.name">
      <p>{{ ingredient.amount }} {{ ingredient.name }}</p>
      <br />
    </li>
    <h2>Instructions:</h2>
    <br />
    <p>{{ store.recipe.instructions }}</p>
  </div>
</template>
