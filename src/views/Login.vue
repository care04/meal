<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/index";
const userStore = useUserStore();
const userEmail = ref("");
const userPassword = ref("");
async function signIn() {
  const loggedIn = await userStore.login(userPassword.value, userEmail.value);
  console.log('login', loggedIn);
  if (loggedIn === true) {
    router.push("/recipies");
  } else {
    window.alert(userStore.pullErrorMessage());
  }
}
</script>
<template>
  <div class="form-signin w-100 m-auto">
    <h1>Sign In</h1>
    <form>
      <div class="form-floating"> 
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="userEmail"
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="userPassword"
        />
        <label for="password">Password</label>
      </div>
      <button
        class="w-100 btn btn-lg btn-primary"
        type="button"
        @click="signIn()"
      >
        Sign In
      </button>
    </form>
  </div>
</template>
