<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import api from '@/services/api';

// Interface pour un employé
interface Employe {
  id: number;
  nom: string;
  role: string;
  telephone: string;
  email: string;
  mot_de_passe: string;
}

// Références et état
const employes = ref<Employe[]>([]);
const showAddModal = ref(false);
const showEditModal = ref(false);

const newEmploye = reactive<Partial<Employe>>({ nom: '', role: '', telephone: '', email: '', mot_de_passe: '' });
const editedEmploye = reactive<Partial<Employe>>({});

// Récupérer les employés
const fetchEmployes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/employes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    employes.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des employés:', error);
  }
};

// Ajouter un employé
const addEmploye = async () => {
  try {
    const token = localStorage.getItem('token');
    await api.post(
      '/employes',
      newEmploye,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEmployes();
    showAddModal.value = false;
    Object.assign(newEmploye, { nom: '', role: '', telephone: '', email: '', mot_de_passe: '' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'employé:', error);
  }
};

// Modifier un employé
const editEmploye = async () => {
  if (!editedEmploye.id) return;
  try {
    const token = localStorage.getItem('token');
    await api.put(
      `/employes/${editedEmploye.id}`,
      editedEmploye,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEmployes();
    showEditModal.value = false;
  } catch (error) {
    console.error('Erreur lors de la modification de l\'employé:', error);
  }
};

// Supprimer un employé
const deleteEmploye = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    await api.delete(`/employes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEmployes();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'employé:', error);
  }
};

// Charger les employés au montage
onMounted(fetchEmployes);
</script>

<template>
  <div class="employes-container">
    <h1 class="title">Gestion des Employés</h1>
    <button @click="showAddModal = true" class="add-button">Ajouter un Employé</button>

    <!-- Liste des employés -->
    <ul class="employe-list">
      <li v-for="employe in employes" :key="employe.id" class="employe-item">
        <div>
          <strong>{{ employe.nom }}</strong> - <span class="role">{{ employe.role }}</span>
        </div>
        <div>
          <button @click="editedEmploye = { ...employe }; showEditModal = true" class="edit-button">
            Modifier
          </button>
          <button @click="deleteEmploye(employe.id)" class="delete-button">Supprimer</button>
        </div>
      </li>
    </ul>

    <!-- Modal pour ajouter un employé -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>Ajouter un Employé</h2>
        <form @submit.prevent="addEmploye">
          <label>Nom :</label>
          <input v-model="newEmploye.nom" type="text" required />
          <label>Rôle :</label>
          <input v-model="newEmploye.role" type="text" required />
          <label>Téléphone :</label>
          <input v-model="newEmploye.telephone" type="text" required />
          <label>Email :</label>
          <input v-model="newEmploye.email" type="email" required />
          <label>Mot de passe :</label>
          <input v-model="newEmploye.mot_de_passe" type="password" required />
          <div class="modal-actions">
            <button type="button" @click="showAddModal = false" class="cancel-button">Annuler</button>
            <button type="submit" class="submit-button">Ajouter</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal pour modifier un employé -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Modifier l'Employé</h2>
        <form @submit.prevent="editEmploye">
          <label>Nom :</label>
          <input v-model="editedEmploye.nom" type="text" required />
          <label>Rôle :</label>
          <input v-model="editedEmploye.role" type="text" required />
          <label>Téléphone :</label>
          <input v-model="editedEmploye.telephone" type="text" required />
          <label>Email :</label>
          <input v-model="editedEmploye.email" type="email" required />
          <label>Mot de passe :</label>
          <input v-model="editedEmploye.mot_de_passe" type="password" required />
          <div class="modal-actions">
            <button type="button" @click="showEditModal = false" class="cancel-button">Annuler</button>
            <button type="submit" class="submit-button">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.employes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}

.add-button {
  display: block;
  margin: 0 auto;
  background-color: #2a9d8f;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

.employe-list {
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
}

.employe-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.role {
  color: #f4a261;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border-radius: 5px;
}

.edit-button {
  background-color: #3498db;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}
</style>