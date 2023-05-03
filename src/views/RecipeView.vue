<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
import { useListStore } from "../stores/listStore";
const listStore = useListStore();
const store = useRecipeStore();
function addToList(ingredient: String) {
  console.log(ingredient);
  listStore.addItems({ name: ingredient });
  window.alert("Item Added");
}
</script>
<template>
  <div v-if="store.recipe.name">
    <h2>
      {{ store.recipe.name ?? "recipe name" }}
    </h2>
    <h3>serving size: {{ store.recipe.serving }}</h3>
    <h2>Description</h2>
    <p>{{ store.recipe.description }}</p>
    <h2>Ingredients</h2>
    <li v-for="ingredient in store.recipe.ingredients" :key="ingredient.name">
      <p>{{ ingredient.unit }} {{ ingredient.name }}</p>
      <button @click="addToList(ingredient.name)">Add To Grocery List</button>
      <br />
    </li>
    <h2>Instructions:</h2>
    <br />
    <p>{{ store.recipe.instructions }}</p>
  </div>
</template>
