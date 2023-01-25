<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { onMounted } from "vue";

onMounted(() => {
  fetch("/api/recipes")
    .then((res) => res.json())
    .then((json) => {
      console.log(json.recipes);
    });
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
