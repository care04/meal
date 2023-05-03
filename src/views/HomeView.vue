<script setup lang="ts">
import { useRecipeStore } from "../stores/recipeStore";
import rotuer from "../router/index";
import type { DeepRecipe } from "../types/global";
import { onBeforeMount } from "vue";

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
onBeforeMount(() => {
  recipeStore.getRecipesSupa();
});
</script>
<template>
  <main>
    <p>Add New Recipe</p>
    <button @click="add()">+</button>
    <h1>Recipes</h1>
    <div v-if="recipeStore.recipes.length > 0">
      <div v-for="recipe in recipeStore.recipes" :key="recipe.id">
        <button @click="edit(recipe.id)" style="margin-right: 10px" class="btn">
          <span style="font-size: 1em; color: white">
            <i class="fa-solid fa-file-pen"></i>
          </span>
        </button>
        <span style="font-size: 1em; color: White"
          ><button @click="route(recipe.id)" style="margin-right: 10px">
            {{ recipe.name }}
          </button></span
        >
        <button
          @click="recipeStore.deleteRecipeSupa(recipe.id)"
          type="button"
          class="btn"
        >
          <span style="font-size: 1em; color: White">
            <i class="fa-solid fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </main>
</template>
