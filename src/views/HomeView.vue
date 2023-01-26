<script setup lang="ts">
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
    <div v-for="recipe in recipes" :key="recipe.name">
      <h2>
        {{ recipe.name ?? "recipe name" }}{{ "             Serving Size: "
        }}{{ recipe.serving }}
      </h2>
      <h3>serving size: {{ recipe.serving }}</h3>
      <p>{{ recipe.description }}</p>
      <div v-for="ingrediant in recipe.ingrediants" :key="ingrediant.name">
        <p>{{ ingrediant.amount }} {{ ingrediant.name }}</p>
      </div>
      <p>Instructions: {{ recipe.instructions }}</p>
    </div>
  </main>
</template>
