<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase";
import router from "../router/index";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const regEmail = ref();
const regPassword = ref();
async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    window.alert(error.message);
  } else {
    console.log({ data: data });
    router.push("/recipies");
    userStore.loggedIn = true;
  }
}
</script>
<template>
  <div class="form-signin w-100 m-auto">
    <h1>Sign UP</h1>
    <form>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="regEmail"
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="regPassword"
        />
        <label for="password">Password</label>
      </div>
      <button
        class="w-100 btn btn-lg btn-primary"
        type="button"
        @click="signUp(regEmail, regPassword)"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-floating>label {
  color: #888;
}
.form-floating {
  margin-bottom: 0.5cm;
}
</style>
