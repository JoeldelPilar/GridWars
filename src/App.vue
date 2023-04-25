<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/game">Game</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="sass" scoped></style>
