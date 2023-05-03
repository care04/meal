<script setup lang="ts">
import { useListStore } from "../stores/listStore";
import { onBeforeMount, ref } from "vue";
const listStore = useListStore();
var ingredientError = ref("");
var adding = ref(false);
var ingredient = {
  name: "",
};
function deleteIngredient(ingredient: any) {
  console.log(ingredient);
  var arrayIndex = listStore.items.indexOf(ingredient);
  listStore.items.splice(arrayIndex, 1);
  listStore.deleteItems(ingredient.id);
}
function cancel() {
  adding.value = false;
  ingredient.value = {};
}
function addItem() {
  listStore.addItems(ingredient);
  console.log("GroceryListView 14 ingredient value", ingredient);
  ingredient = { name: "" };
  adding.value = false;
}
function checkIngredient() {
  if (ingredient.name === "") {
    ingredientError.value =
      "need to fill out name unit and unit amount before saving";
  } else {
    ingredientError.value = "";
    addItem();
  }
}

onBeforeMount(() => {
  listStore.getItems();
});
</script>
<template>
  <main>
    <h1>Grocery List</h1>
    <div class="mb-3">
      <label
        >ingredients
        <button
          @click="adding = true"
          type="button"
          class="btn btn-outline-info btn-sm"
        >
          +
        </button></label
      >
    </div>
    <div v-if="adding === true">
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
      <div class="mb-3">
        <button @click="cancel()" type="button" class="btn">cancel</button
        ><button @click="checkIngredient()" type="button" class="btn">Add ingredient</button>
      </div>
    </div>
    <div v-if="listStore.items.length > 0">
      <ol>
        <li v-for="item in listStore.items" :key="item.id">
          <button @click="deleteIngredient(item)" type="button" class="btn">
            <span style="font-size: 1em; color: White">
              <i class="fa-solid fa-trash"></i>
            </span></button
          >{{ item.name }}
        </li>
      </ol>
    </div>
  </main>
</template>
