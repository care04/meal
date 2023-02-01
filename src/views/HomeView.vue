<script setup lang="ts">
import RecipeBox from "../components/RecipeBox.vue";
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
    <RecipeBox v-for="recipe in recipes" :recipe="recipe" :key="recipe.name"/>
  </main>
</template>
