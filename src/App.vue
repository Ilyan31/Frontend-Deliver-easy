<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Condition pour afficher ou cacher le header
const showHeader = route.path !== '/';

const logout = () => {
  localStorage.removeItem('token'); // Supprimer le token
  router.push('/'); // Rediriger vers la page de connexion
};
</script>

<template>
  <div id="app">
    <header v-if="showHeader" class="header">
      <div class="logo-container">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" />
      </div>

      <nav class="nav">
        <RouterLink to="/dashboard" class="nav-link">Tableau de bord</RouterLink>
        <RouterLink to="/clients" class="nav-link">Clients</RouterLink>
        <RouterLink to="/deliveries" class="nav-link">Livraisons</RouterLink>
        <button @click="logout" class="logout-button">Déconnexion</button>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #264653;
  color: #fff;
}

.logo {
  width: 50px;
  height: auto;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #e9c46a;
}

.logout-button {
  background-color: #e76f51;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.logout-button:hover {
  background-color: #d9534f;
}

.main {
  padding: 2rem;
  background-color: #1d3557;
  color: white;
  min-height: 100vh;
}
</style>