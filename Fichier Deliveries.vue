<template>
  <div>
    <h1>Deliveries</h1>
    <ul>
      <li v-for="delivery in deliveries" :key="delivery.id">{{ delivery.address }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const deliveries = ref([]);
    const loading = ref(false);
    const error = ref('');

    const fetchDeliveries = async () => {
      loading.value = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/deliveries', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        deliveries.value = response.data;
      } catch (err) {
        error.value = 'Failed to fetch deliveries';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchDeliveries();
    });

    return {
      deliveries,
      loading,
      error
    };
  }
});
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>