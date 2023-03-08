<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRecipeStore } from "./stores/recipeStore";
import { useUserStore } from "./stores/userStore";
import { onBeforeMount } from "vue";
const recipeStore = useRecipeStore();
const userStore = useUserStore()

onBeforeMount(() => {
  recipeStore.getRecipesSupa();
})
</script>

<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><RouterLink to="/" class="nav-link px-2 text-secondary"
            >Home</RouterLink
          ></li>
          <li><RouterLink
            to="/recipies"
            v-if="userStore.loggedIn === true"
            class="nav-link px-2 text-white"
            >Recipies</RouterLink
          ></li>
          <!-- <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li> -->
        </ul>
<!-- 
        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">
        </form> -->

        <div class="text-end">
          <RouterLink to="/login" class="btn btn-outline-light me-2">Login</RouterLink>
          <!-- <button type="button" class="btn btn-warning">Sign-up</button> -->
        </div>
      </div>
    </div>
  </header>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            
          </li>
          <li>
            
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div class="container"  style="width:880px;">
    <RouterView />
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin:auto;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
</style>
