<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const username = ref('');
      const password = ref('');
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', {
            username: username.value,
            password: password.value,
          });
          localStorage.setItem('token', response.data.token);
          router.push('/deliveries');
        } catch (error) {
          console.error('Login failed', error);
        }
      };
  
      return { username, password, login };
    },
  });
  </script>