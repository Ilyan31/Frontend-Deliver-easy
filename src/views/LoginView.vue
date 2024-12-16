<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const email = ref('');
    const mot_de_passe = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const login = async () => {
      errorMessage.value = ''; // Réinitialiser le message d'erreur
      if (!email.value || !mot_de_passe.value) {
        errorMessage.value = 'Veuillez remplir tous les champs.';
        return;
      }

      try {
        const response = await api.post('/auth/login', {
          email: email.value,
          mot_de_passe: mot_de_passe.value,
        });

        // Enregistrement du token
        localStorage.setItem('token', response.data.token);

        // Redirection vers le tableau de bord
        router.push('/dashboard');
      } catch (error: any) {
        console.error('Erreur lors de la connexion :', error);

        if (error.response && error.response.status === 404) {
          errorMessage.value = 'Utilisateur non trouvé.';
        } else if (error.response && error.response.status === 400) {
          errorMessage.value = 'Mot de passe incorrect.';
        } else {
          errorMessage.value = 'Erreur serveur. Veuillez réessayer plus tard.';
        }
      }
    };

    return {
      email,
      mot_de_passe,
      errorMessage,
      login,
    };
  },
});
</script>

<template>
  <div class="login-container">
    <h1 class="text-xl font-bold mb-4">Connexion</h1>
    <form @submit.prevent="login">
      <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          name="email"
          class="border rounded px-3 py-2 w-full"
          autocomplete="email"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div class="mb-4">
        <label for="mot_de_passe" class="block text-sm font-medium">Mot de passe</label>
        <input
          type="password"
          v-model="mot_de_passe"
          id="mot_de_passe"
          name="mot_de_passe"
          class="border rounded px-3 py-2 w-full"
          autocomplete="current-password"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Se connecter
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-red-500 {
  color: #f56565;
}
</style>