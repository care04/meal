<script setup lang="ts">
import rotuer from "../router/index";
import { useRecipeStore } from "../stores/recipeStore";
const recipeStore = useRecipeStore();
var ingrediant = {
  amount: "",
  name: "",
};
function addIngrediant() {
  if (recipeStore.recipe.ingredients) {
    recipeStore.recipe.ingredients.push(ingrediant);
  } else {
    recipeStore.recipe.ingredients = [ingrediant];
  }
  ingrediant = { amount: "", name: "" };
}
function save() {
  // recipeStore.saveRecipe(recipeStore.recipe);
  recipeStore.addRecipeSupa(recipeStore.recipe);
  rotuer.push("/");
}
</script>
<template>
  <div>
    <h3>New Recipe</h3>
    <div class="form-floating mb-3">
      <label>Name</label><br />
      <input type="text" v-model="recipeStore.recipe.name" />
    </div>
    <div class="form-floating mb-3">
      <label>Serving Size</label><br />
      <input type="text" v-model="recipeStore.recipe.serving" />
    </div>
    <div class="form-floating mb-3">
      <label>Description</label><br />
      <input type="text" v-model="recipeStore.recipe.description" />
    </div>
    <div class="form-floating mb-3">
      <label>Ingrediants</label><br />
      <li
        v-for="ingredient in recipeStore.recipe.ingredients"
        :key="ingredient.name"
      >
        {{ ingredient.amount }} {{ "   " }} {{ ingredient.name }}
      </li>
      <div>
        <label>name</label><br />
        <input type="text" v-model="ingrediant.name" /><br />
        <label>amount</label><br />
        <input type="text" v-model="ingrediant.amount" /><br />
        <button @click="addIngrediant()">Add Ingrediant</button>
      </div>
    </div>
    <div class="form-floating mb-3">
      <label>Instructions </label><br />
      <input type="text" v-model="recipeStore.recipe.instructions" />
    </div>
    <button @click="save">Save Recipe</button>
  </div>
</template>
