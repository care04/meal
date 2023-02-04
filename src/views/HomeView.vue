<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
import rotuer from "../router/index";
import type { Recipe } from "../types/Recipe";
const recipes = useRecipeStore();
function route(id: number) {
  recipes.recipe = {} as Recipe;
  recipes.getRecipe(id);
  rotuer.push({ name: "recipe", params: { id: id } });
}
</script>
<template>
  <main v-if="recipes.recipes.length > 0">
    <router-link :to="{ name: 'newRecipe' }"><button>+</button></router-link>
    <h1>Recipes</h1>
    <div v-for="recipe in recipes.recipes" :key="recipe.id">
      <button @click="route(recipe.id)">{{ recipe.name }}</button>
    </div>
  </main>
</template>
