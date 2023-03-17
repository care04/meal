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
    <div class="form-floating">
      <Field
        name="name"
        class="form-control"
        id="name"
        placeholder="name"
        v-model="recipeStore.recipe.name"
      />
      <label for="name">Name</label>
      <ErrorMessage name="name" />
    </div>
    <div class="form-floating">
      <Field
        name="serving"
        class="form-control"
        id="serving"
        placeholder="serving"
        v-model="recipeStore.recipe.serving"
      />
      <label for="serving">Serving Size</label>
      <ErrorMessage name="serving" />
    </div>
    <div class="form-floating">
      <Field
        name="description"
        class="form-control"
        id="description"
        placeholder="description"
        v-model="recipeStore.recipe.description"
      />
      <label for="description">Description</label>
      <ErrorMessage name="description" />
    </div>
    <div class="mb-3">
      <label>ingredients
      <button @click="adding = true" type="button" class="btn btn-outline-info btn-sm">+</button></label
      >
    </div>
    <li v-for="ingredient in recipeStore.ingredients" :key="ingredient.name">
      <button @click="deleteIngredient(ingredient)" type="button">delete</button
      >{{ ingredient.unit }} {{ "   " }} {{ ingredient.name }}
    </li>
    <div v-if="adding === true">
      <div v-if="ingredientError != ''">{{ ingredientError }}</div>
      <div class="form-floating">
        <input
          type="text"
          v-model="ingredient.name"
          class="form-control"
          id="ingredient_name"
          placeholder="Ingredient Name"
        />
        <label for="ingredient_name">Ingredient Name</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          v-model="ingredient.unit"
          class="form-control"
          id="unit"
          placeholder="unit"
        />
        <label for="unit">unit</label>
      </div>
      <div class="mb-3">
        <button @click="cancel()" type="button" class="btn">cancel</button
        ><button @click="checkIngredient()" type="button" class="btn">Add ingredient</button>
      </div>
    </div>
    <div class="form-floating">
      <Field
        name="instructions"
        v-model="recipeStore.recipe.instructions"
        class="form-control"
        id="instructions"
        placeholder="instructions"
        />
      <label for="instructions">Instructions</label>
      <ErrorMessage name="instructions" />
    </div>
    <button type="submit">Save Recipe</button>
  </Form>
</template>
<style scoped>
.form-floating>label {
  color: #888;
}
.form-floating {
  margin-bottom: 0.5cm;
}
.mb-3>button {
  color:rgb(233, 240, 246)
}
</style>
