<template>
  <main class="main-container">
    <h1 class="heading">GridWars</h1>
    <LoginInput class="login-component" />
  </main>
</template>

<script setup lang="ts">
import LoginInput from '@/components/LoginInput.vue'
</script>

<style lang="scss" scoped>
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heading {
  font-size: 3rem;
  margin-bottom: 2rem;
}
</style>
