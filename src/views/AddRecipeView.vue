<script setup lang="ts">
import { ref } from "vue";
import rotuer from "../router/index";
import type { Ingrediant } from "../types/Recipe";
import { useRecipeStore } from "../stores/recipeStore";
const recipeStore = useRecipeStore();
const ingrediant = ref<Ingrediant>({
  name: "",
  amount: "",
});
const ingrediants = ref<Array<Ingrediant>>([]);
const recipe = ref({
  name: "",
  serving: 0,
  description: "",
  instructions: "",
  ingrediants: ingrediants,
});
function addIngrediant() {
  if (ingrediant.value.name != "" && ingrediant.value.amount != "") {
    recipe.value.ingrediants.push(ingrediant.value);
    ingrediant.value = {
      name: "",
      amount: "",
    };
  }
}
function saveRecipe() {
  recipeStore.saveRecipe(recipe.value);
  rotuer.push("/");
}
</script>
<template>
  <div>
    <h3>New Recipe</h3>
    <div class="form-floating mb-3">
      <label>Name</label><br />
      <input type="text" v-model="recipe.name" />
    </div>
    <div class="form-floating mb-3">
      <label>Serving Size</label><br />
      <input type="text" v-model="recipe.serving" />
    </div>
    <div class="form-floating mb-3">
      <label>Description</label><br />
      <input type="text" v-model="recipe.description" />
    </div>
    <div class="form-floating mb-3">
      <label>Ingrediants</label><br />
      <li v-for="ingrediant in ingrediants" :key="ingrediant.name">
        {{ ingrediant.amount }} {{ "   " }} {{ ingrediant.name }}
      </li>
      <div>
        <label>name</label><br />
        <input type="text" v-model="ingrediant.name" /><br />
        <label>amount</label><br />
        <input type="text" v-model="ingrediant.amount" /><br />
        <button @click="addIngrediant">Add Ingrediant</button>
      </div>
    </div>
    <div class="form-floating mb-3">
      <label>Instructions </label><br />
      <input type="text" v-model="recipe.instructions" />
    </div>
    <button @click="saveRecipe">Save Recipe</button>
  </div>
</template>
