<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="p-6 max-w-sm w-full bg-white rounded-md shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Email" class="w-full px-3 py-2 border rounded mb-4" />
          <input v-model="password" type="password" placeholder="Password" class="w-full px-3 py-2 border rounded mb-4" />
          <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
  
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', { email: email.value, password: password.value });
          localStorage.setItem('token', response.data.token);
          router.push('/deliveries');
        } catch (error) {
          errorMessage.value = 'Invalid credentials';
        }
      };
  
      return { email, password, errorMessage, handleLogin };
    },
  });
  </script>