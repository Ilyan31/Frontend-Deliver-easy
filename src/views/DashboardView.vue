<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Tableau de bord</h1>

    <!-- Section de navigation -->
    <nav class="dashboard-nav">
      <router-link to="/clients" class="nav-link">Clients</router-link>
      <router-link to="/Employes" class="nav-link">Employés</router-link>
      <router-link to="/deliveries" class="nav-link">Livraisons</router-link>
      <router-link to="/reports" class="nav-link">Rapports</router-link>
    </nav>

    <!-- Statistiques clés -->
    <div class="stats-grid">
      <div class="stat-card">
        <h2 class="stat-title">Clients</h2>
        <p class="stat-value">120</p>
        <router-link to="/clients" class="stat-link">Voir tous les clients</router-link>
      </div>
      <div class="stat-card">
        <h2 class="stat-title">Employés</h2>
        <p class="stat-value">45</p>
        <router-link to="/Employes" class="stat-link">Voir tous les employés</router-link>
      </div>
      <div class="stat-card">
        <h2 class="stat-title">Livraisons</h2>
        <p class="stat-value">75</p>
        <router-link to="/deliveries" class="stat-link">Voir toutes les livraisons</router-link>
      </div>
      <div class="stat-card">
        <h2 class="stat-title">Rapports</h2>
        <p class="stat-value">20</p>
        <router-link to="/reports" class="stat-link">Voir tous les rapports</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* Styles similaires à ceux précédemment proposés */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #264653;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.dashboard-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.nav-link {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2a9d8f;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid #2a9d8f;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #2a9d8f;
  color: white;
  transform: scale(1.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background-color: #264653;
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.stat-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 3rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #e9c46a;
}

.stat-link {
  font-size: 1rem;
  color: #f4a261;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
  transition: color 0.3s ease;
}

.stat-link:hover {
  color: #e76f51;
}
</style>