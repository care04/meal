<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
interface Recipe {
  name: string;
  serving: number;
  ingrediants: Ingrediant[];
  description: string;
  instructions: string;
}
interface Ingrediant {
  amount: string;
  name: string;
}

// const video: Video = {
//       name: doc.data().name,
//       ytUrl: doc.data().ytUrl,
//       id: doc.data().id,
//       docId: doc.id,
//       creators: [""],
//     };
const name = ref("");
const serving = ref(0);
const description = ref("");
const instructions = ref("");
function view() {
  const recipe: Recipe = {
    name: name.value,
    serving: serving.value,
    description: description.value,
    instructions: instructions.value,
    ingrediants: [
      { amount: " 1tbsp", name: "butter" },
      { amount: " 1tbsp", name: "flour" },
    ],
  };
  axios.post("/api/recipes", recipe).then(({ data }) => {
    console.log(data);
  });
}
</script>
<template>
  <div>
    <h3>New Recipe</h3>
    <div class="form-floating mb-3">
      <label>Name</label><br />
      <input type="text" v-model="name" />
    </div>
    <div class="form-floating mb-3">
      <label>Serving Size</label><br />
      <input type="text" v-model="serving" />
    </div>
    <div class="form-floating mb-3">
      <label>Description</label><br />
      <input type="text" v-model="description" />
    </div>
    <div class="form-floating mb-3">
      <label>Instructions </label><br />
      <input type="text" v-model="instructions" />
    </div>
    <button @click="view">Save Recipe</button>
  </div>
</template>
