<template>
  <div>
    <h1>Login</h1>
    <label for="email">Email</label><br />
    <input type="email" name="email" /><br />
    <label for="password">Password</label><br />
    <input name="password" /><br />
    <button>Login</button><br />
    <p>or</p>
    <button><router-link to="/signup">Sign Up</router-link></button>
  </div>
</template>
