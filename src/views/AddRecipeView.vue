<script setup lang="ts">
import rotuer from "../router/index";
import { useRecipeStore } from "../stores/recipeStore";
import { ref } from "vue";
const recipeStore = useRecipeStore();
interface Ingredient {
  name: String;
  unit: String;
}
var ingredient: Ingredient = {
  unit: "",
  name: "",
};
var ingredientError = ref("");
var adding = ref(false);
function checkIngredient() {
  if (ingredient.unit === "" || ingredient.name === "") {
    ingredientError.value =
      "need both ingredient unit field and ingredient name field filled in";
  } else {
    ingredientError.value = "";
    addingredient();
  }
}
function checkNotEmpty() {
  //
}
function addingredient() {
  if (recipeStore.edit === true) {
    recipeStore.ingredientsToAdd.push(ingredient);
  }
  recipeStore.ingredients.push(ingredient);
  adding.value = false;
  ingredient = { unit: "", name: "" };
}
function save() {
  if (recipeStore.edit === false) {
    recipeStore.addRecipeSupa(recipeStore.recipe);
  } else {
    recipeStore.updateRecipeSupa(recipeStore.recipe);
  }
  rotuer.push("/");
}
function cancel() {
  adding.value = false;
  ingredient = { name: "", unit: "" };
  ingredientError.value = "";
}
function deleteIngredient(ingredient: Ingredient) {
  var arrayIndex = recipeStore.ingredients.indexOf(ingredient);
  var addArrayIndex = recipeStore.ingredientsToAdd.indexOf(ingredient);
  recipeStore.ingredients.splice(arrayIndex, 1);
  recipeStore.ingredientsToAdd.splice(addArrayIndex, 1);
  recipeStore.ingredientsToRemove.push(ingredient);
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
      <label>ingredients</label><button @click="adding = true">+</button><br />
      <li v-for="ingredient in recipeStore.ingredients" :key="ingredient.name">
        <button @click="deleteIngredient(ingredient)">delete</button>{{ ingredient.unit }} {{ "   " }} {{ ingredient.name }}
      </li>
      <div v-if="adding === true">
        <div v-if="ingredientError != ''">{{ ingredientError }}</div>
        <label>name</label><br />
        <input type="text" v-model="ingredient.name" /><br />
        <label>unit</label><br />
        <input type="text" v-model="ingredient.unit" /><br />
        <button @click="cancel()">cancel</button
        ><button @click="checkIngredient()">Add ingredient</button>
      </div>
    </div>
    <div class="form-floating mb-3">
      <label>Instructions </label><br />
      <input type="text" v-model="recipeStore.recipe.instructions" />
    </div>
    <button @click="save">Save Recipe</button>
  </div>
</template>
