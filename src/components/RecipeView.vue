<template>
  <div>
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
</template>
<script lang="ts">
export default {
  props: {
    recipe: null,
  },
};
</script>
