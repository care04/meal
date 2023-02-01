<script setup lang="ts">
import RecipeView from "../components/RecipeView.vue";
import { onBeforeMount, ref } from "vue";
const recipes = ref();
onBeforeMount(() => {
  fetch("/api/recipes")
    .then((res) => res.json())
    .then((json) => {
      recipes.value = json.recipes;
    });
});
</script>
<template>
  <main>
    <h1>Recipes</h1>
    <RecipeView v-for="recipe in recipes" :recipe="recipe" :key="recipe.name"/>
  </main>
</template>
