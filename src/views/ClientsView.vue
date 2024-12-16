<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import api from '@/services/api';

interface Client {
  id: number;
  name: string;
  email: string;
}

export default defineComponent({
  name: 'ClientsView',
  setup() {
    const clients = ref<Client[]>([]);
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const newClient = reactive<Partial<Client>>({ name: '', email: '' });
    const editedClient = reactive<Partial<Client>>({});

    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/clients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        clients.value = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des clients :', error);
      }
    };

    const addClient = async () => {
      try {
        const token = localStorage.getItem('token');
        await api.post('/clients', newClient, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchClients();
        showAddModal.value = false;
        Object.assign(newClient, { name: '', email: '' });
      } catch (error) {
        console.error('Erreur lors de l\'ajout du client :', error);
      }
    };

    const editClient = async () => {
      if (!editedClient.id) return;
      try {
        const token = localStorage.getItem('token');
        await api.put(`/clients/${editedClient.id}`, editedClient, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchClients();
        showEditModal.value = false;
      } catch (error) {
        console.error('Erreur lors de la modification du client :', error);
      }
    };

    const deleteClient = async (id: number) => {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchClients();
      } catch (error) {
        console.error('Erreur lors de la suppression du client :', error);
      }
    };

    onMounted(fetchClients);

    return {
      clients,
      showAddModal,
      showEditModal,
      newClient,
      editedClient,
      fetchClients,
      addClient,
      editClient,
      deleteClient,
    };
  },
});
</script>

<template>
  <div class="clients-container">
    <h1 class="title">Gestion des Clients</h1>

    <!-- Bouton Ajouter -->
    <button class="add-button" @click="showAddModal = true">Ajouter un Client</button>

    <!-- Liste des clients -->
    <ul class="client-list">
      <li v-for="client in clients" :key="client.id" class="client-item">
        <div class="client-details">
          <p class="client-name">{{ client.name }}</p>
          <p class="client-email">{{ client.email }}</p>
        </div>
        <div class="actions">
          <button @click="editedClient = { ...client }; showEditModal = true" class="action-button edit">
            Modifier
          </button>
          <button @click="deleteClient(client.id)" class="action-button delete">
            Supprimer
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal Ajouter un Client -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>Ajouter un Client</h2>
        <form @submit.prevent="addClient">
          <div class="form-group">
            <label>Nom</label>
            <input v-model="newClient.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="newClient.email" type="email" required />
          </div>
          <div class="modal-actions">
            <button class="modal-button cancel" @click="showAddModal = false">Annuler</button>
            <button type="submit" class="modal-button submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Modifier un Client -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Modifier le Client</h2>
        <form @submit.prevent="editClient">
          <div class="form-group">
            <label>Nom</label>
            <input v-model="editedClient.name" type="text" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="editedClient.email" type="email" required />
          </div>
          <div class="modal-actions">
            <button class="modal-button cancel" @click="showEditModal = false">Annuler</button>
            <button type="submit" class="modal-button submit">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clients-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to right, #74b9ff, #0984e3);
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
}

.client-list {
  list-style: none;
  padding: 0;
}

.client-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  color: #2d3436;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.client-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.edit {
  background: #74b9ff;
  color: white;
}

.delete {
  background: #d63031;
  color: white;
}

.edit:hover {
  background: #0984e3;
}

.delete:hover {
  background: #e17055;
}

.add-button {
  display: block;
  margin: 20px auto;
  background: #55efc4;
  color: #2d3436;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease, background 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  background: #00cec9;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  animation: slide-in 0.3s ease;
}

@keyframes slide-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  padding: 8px 16px;
  border-radius: 8px;
}

.cancel {
  background: #b2bec3;
}

.submit {
  background: #0984e3;
  color: white;
}
</style>