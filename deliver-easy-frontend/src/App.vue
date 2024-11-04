<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* Ajoutez ici les styles globaux */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
}
</style>