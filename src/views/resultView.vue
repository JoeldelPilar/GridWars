<template>
    <main class="container-container">
      <div class="main-container">
        <h1 class="heading">Result</h1>
        <gameResult class="main-container" v-for="(user, i) in resultState.users" :key="i" :player-place="usersState.users.length-i" :player-color="user.color" :player-name="user.name"/> 
      </div>
      <div class="main-container">
        <h1 class="heading">Stats</h1>
        <gameStats class="main-container" v-for="(user, i) in statsState.stats" :key="i" :hitter-color="user.hit" :hittee-color="user.hitted"/>
      </div>
    </main>
</template>
  
<script setup lang="ts">
  import gameResult from '@/components/gameResult.vue'
  import gameStats from '@/components/gameStats.vue'
  import { resultState } from '@/sockets/resultSocket'
  import { statsState } from '@/sockets/resultSocket'
  import { usersState } from '@/sockets/usersSocket'

</script>
  
<style lang="scss" scoped>

  .container-container {
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 75px;
  }

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