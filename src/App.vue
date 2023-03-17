<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRecipeStore } from "./stores/recipeStore";
import { useUserStore } from "./stores/userStore";
import { onBeforeMount } from "vue";
import router from "./router/index";
const recipeStore = useRecipeStore();
const userStore = useUserStore();

onBeforeMount(() => {
  userStore.currentAuth();
  recipeStore.getRecipesSupa();
});
async function logOut() {
  const loggedOut = await userStore.logout();
  if (loggedOut === true) {
    recipeStore.recipes = [];
    router.push("/");
  } else {
    window.alert(loggedOut);
  }
}
</script>

<template>
  <div>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <RouterLink to="/" class="nav-link px-2 text-secondary"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/recipies"
              v-if="userStore.loggedIn === true"
              class="nav-link px-2 text-white"
              >Recipies</RouterLink
            >
          </li>
        </ul>
        <div class="text-end" v-if="userStore.loggedIn === false">
          <RouterLink to="/login" class="btn btn-outline-light me-2"
            >Login</RouterLink
          >
          <RouterLink to="/signup" class="btn btn-outline-light me-2"
            >Sign Up</RouterLink
          >
          <!-- <button type="button" class="btn btn-warning">Sign-up</button> -->
        </div>
        <div class="text-end" v-else>
          <button @click="logOut()">Logout</button>
        </div>
      </div>
    </div>
  </header>
  <div class="container"  style="width:880px;">
    <RouterView />
  </div>
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
