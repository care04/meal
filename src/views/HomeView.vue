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
function edit(id: number) {
  recipes.recipe = {} as Recipe;
  recipes.getRecipe(id);
  recipes.edit = true;
  rotuer.push("/newRecipe");
}
function add() {
  recipes.recipe = {} as Recipe;
  rotuer.push("/newRecipe");
}
</script>
<template>
  <main v-if="recipes.recipes.length > 0">
    <button @click="add()">+</button>
    <h1>Recipes</h1>
    <div v-for="recipe in recipes.recipes" :key="recipe.id">
      <button @click="edit(recipe.id)">edit</button>
      <button @click="route(recipe.id)">{{ recipe.name }}</button>
    </div>
  </main>
</template>
