<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
import rotuer from "../router/index";
import type { DeepRecipe } from "../types/global";

const recipeStore = useRecipeStore();
function route(id: number) {
  recipeStore.recipe = {} as DeepRecipe;
  recipeStore.getRecipeSupa(id);
  rotuer.push({ name: "recipe", params: { id: id } });
}
function edit(id: number) {
  recipeStore.recipe = {} as DeepRecipe;
  recipeStore.getRecipeSupa(id);
  recipeStore.edit = true;
  rotuer.push("/newRecipe");
}
function add() {
  recipeStore.recipe = {} as DeepRecipe;
  recipeStore.ingredients = [];
  rotuer.push("/newRecipe");
}
</script>
<template>
  <main>
    <p>Add New Recipe</p>
    <button @click="add()">+</button>
    <h1>Recipes</h1>
    <div v-if="recipeStore.recipes.length > 0">
      <div v-for="recipe in recipeStore.recipes" :key="recipe.id">
        <button @click="edit(recipe.id)">edit</button>
        <button @click="route(recipe.id)">{{ recipe.name }}</button>
        <button @click="recipeStore.deleteRecipeSupa(recipe.id)">delete</button>
      </div>
    </div>
  </main>
</template>
