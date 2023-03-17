<script setup lang="ts">
import rotuer from "../router/index";
import { useRecipeStore } from "../stores/recipeStore";
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
const schema = yup.object({
  name: yup.string().required(),
  serving: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be numeric"),
  description: yup.string().required(),
  instructions: yup.string().required(),
});
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
  rotuer.push("/recipies");
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
  <Form :validation-schema="schema" @submit="save">
    <h3>New Recipe</h3>
    <label>Name</label><br />
    <Field name="name" v-model="recipeStore.recipe.name" /><br />
    <ErrorMessage name="name" /><br />
    <label>Serving Size</label><br />
    <Field name="serving" v-model="recipeStore.recipe.serving" /><br />
    <ErrorMessage name="serving" /><br />
    <label>Description</label><br />
    <Field name="description" v-model="recipeStore.recipe.description" /><br />
    <ErrorMessage name="description" /><br />
    <label>ingredients</label
    ><button @click="adding = true" type="button">+</button><br />
    <li v-for="ingredient in recipeStore.ingredients" :key="ingredient.name">
      <button @click="deleteIngredient(ingredient)" type="button">delete</button
      >{{ ingredient.unit }} {{ "   " }} {{ ingredient.name }}
    </li><br />
    <div v-if="adding === true">
      <div v-if="ingredientError != ''">{{ ingredientError }}</div>
      <label>name</label><br />
      <input type="text" v-model="ingredient.name" /><br />
      <label>unit</label><br />
      <input type="text" v-model="ingredient.unit" /><br />
      <button @click="cancel()" type="button">cancel</button
      ><button @click="checkIngredient()" type="button">Add ingredient</button><br />
    </div>
    <label>Instructions </label><br />
    <Field name="instructions" v-model="recipeStore.recipe.instructions" /><br />
    <ErrorMessage name="instructions" /><br />
    <button type="submit">Save Recipe</button>
  </Form>
</template>
