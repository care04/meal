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
    <div v-for="recipe in recipes" :key="recipe.id">
      <router-link
        :to="{
          name: 'recipe',
          params: { id: recipe.id },
        }"
      >
        <button>{{ recipe.name }}</button>
      </router-link>
    </div>
  </main>
</template>
