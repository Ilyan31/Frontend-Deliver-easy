<template>
  <div class="deliveries-container">
    <header class="header">
      <h1>Gestion des Livraisons</h1>
      <button class="add-button" @click="openAddModal">+ Ajouter une Livraison</button>
    </header>

    <!-- Barre de recherche -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par livreur..."
        class="search-input"
      />
    </div>

    <!-- Tableau des livraisons -->
    <div class="table-container">
      <table class="delivery-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Livreur</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(delivery, index) in filteredDeliveries" :key="delivery.id">
            <td>{{ index + 1 }}</td>
            <td>{{ delivery.livreur }}</td>
            <td>{{ formatDate(delivery.date) }}</td>
            <td>
              <span>{{ delivery.statut }}</span>
            </td>
            <td class="actions">
              <button @click="openEditModal(delivery)" class="action-button edit">🖊 Modifier</button>
              <button @click="deleteDelivery(delivery.id)" class="action-button delete">🗑 Supprimer</button>
            </td>
          </tr>
          <tr v-if="filteredDeliveries.length === 0">
            <td colspan="5" class="empty-message">Aucune livraison trouvée.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--" class="page-button">
        Précédent
      </button>
      <span>Page {{ currentPage }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-button">
        Suivant
      </button>
    </div>

    <!-- Modal Ajouter une Livraison -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>Nouvelle Livraison</h2>
        <form @submit.prevent="addDelivery">
          <label>Livreur</label>
          <input v-model="newDelivery.livreur" type="text" required class="input-field" />

          <label>Date</label>
          <input v-model="newDelivery.date" type="date" required class="input-field" />

          <div class="modal-actions">
            <button type="button" @click="closeAddModal" class="cancel-button">Annuler</button>
            <button type="submit" class="submit-button">Ajouter</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Modifier une Livraison -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Modifier la Livraison</h2>
        <form @submit.prevent="saveEditDelivery">
          <label>Livreur</label>
          <input v-model="editDeliveryForm.livreur" type="text" required class="input-field" />

          <label>Date</label>
          <input v-model="editDeliveryForm.date" type="date" required class="input-field" />

          <label>Statut</label>
          <select v-model="editDeliveryForm.statut" required class="input-field">
            <option value="Livré">Livré</option>
            <option value="En cours">En cours</option>
            <option value="Annulé">Annulé</option>
          </select>

          <div class="modal-actions">
            <button type="button" @click="closeEditModal" class="cancel-button">Annuler</button>
            <button type="submit" class="submit-button">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import api from '@/services/api';

export default defineComponent({
  name: 'DeliveriesView',
  setup() {
    const deliveries = ref<any[]>([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 5;

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const editDeliveryForm = ref({ id: 0, livreur: '', date: '', statut: '' });

    const newDelivery = ref({ livreur: '', date: '' });

    const fetchDeliveries = async () => {
      const response = await api.get('/deliveries');
      deliveries.value = response.data;
    };

    const addDelivery = async () => {
      await api.post('/deliveries', newDelivery.value);
      fetchDeliveries();
      showAddModal.value = false;
    };

    const deleteDelivery = async (id: number) => {
      await api.delete(`/deliveries/${id}`);
      fetchDeliveries();
    };

    const openEditModal = (delivery: any) => {
      editDeliveryForm.value = { ...delivery };
      showEditModal.value = true;
    };

    const saveEditDelivery = async () => {
      await api.put(`/deliveries/${editDeliveryForm.value.id}`, editDeliveryForm.value);
      fetchDeliveries();
      showEditModal.value = false;
    };

    const filteredDeliveries = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return deliveries.value
        .filter((d) => d.livreur.toLowerCase().includes(searchQuery.value.toLowerCase()))
        .slice(start, start + itemsPerPage);
    });

    const totalPages = computed(() => Math.ceil(deliveries.value.length / itemsPerPage));

    onMounted(fetchDeliveries);

    return {
      deliveries,
      searchQuery,
      currentPage,
      itemsPerPage,
      filteredDeliveries,
      totalPages,
      showAddModal,
      newDelivery,
      showEditModal,
      editDeliveryForm,
      fetchDeliveries,
      addDelivery,
      deleteDelivery,
      openEditModal,
      saveEditDelivery,
      formatDate: (date: string) => new Date(date).toLocaleDateString(),
      closeAddModal: () => (showAddModal.value = false),
      closeEditModal: () => (showEditModal.value = false),
      openAddModal: () => (showAddModal.value = true),
    };
  },
});
</script>