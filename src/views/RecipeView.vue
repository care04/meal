<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
const props = defineProps<{
  id?: string;
}>();
const recipe = ref();
onBeforeMount(() => {
  fetch("/api/recipes/" + props.id)
    .then((res) => res.json())
    .then((json) => {
      recipe.value = json.recipe;
    });
});
</script>
<template>
  <div>
    <p>recipe box component</p>
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
