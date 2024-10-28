// src/views/Deliveries.vue
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Deliveries</h1>
    <ul v-if="deliveries.length">
      <li v-for="delivery in deliveries" :key="delivery.id" class="border-b py-2">
        {{ delivery.address }} - {{ delivery.deliveryDate }}
      </li>
    </ul>
    <p v-else>No deliveries available</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Delivery {
  id: number;
  address: string;
  deliveryDate: string;
}

export default defineComponent({
  setup() {
    const deliveries = ref<Delivery[]>([]);

    const fetchDeliveries = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8889/api/deliveries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      deliveries.value = response.data;
    };

    onMounted(fetchDeliveries);

    return { deliveries };
  },
});
</script>