<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="title">{{ msg }}</h1>
    <h3 class="subtitle">
      Félicitations ! Vous avez créé un projet avec
      <a href="https://vite.dev/" target="_blank" rel="noopener" class="link">Vite</a>
      +
      <a href="https://vuejs.org/" target="_blank" rel="noopener" class="link">Vue 3</a>.
      Que souhaitez-vous faire ensuite ?
    </h3>
    <div class="buttons">
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener" class="button">Guide Vue 3</a>
      <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener" class="button">Guide Vite</a>
    </div>
  </div>
</template>

<style scoped>
/* Ajout d'une palette de couleurs modernes */
:root {
  --primary-color: #2a9d8f;
  --secondary-color: #264653;
  --accent-color: #e9c46a;
  --text-color: #f4f4f4;
  --background-color: #1d3557;
}

.greetings {
  background: var(--background-color);
  color: var(--text-color);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 700px;
  margin: 50px auto;
}

.title {
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  color: var(--accent-color);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
  line-height: 1.8;
}

.subtitle .link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.subtitle .link:hover {
  color: var(--accent-color);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.button {
  display: inline-block;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: var(--text-color);
  background: var(--primary-color);
  border: none;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button:hover {
  background: var(--accent-color);
  transform: translateY(-3px);
}

.button:active {
  transform: translateY(1px);
}

/* Responsive design */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1.3rem;
  }
  .button {
    font-size: 0.9rem;
  }
}
</style>