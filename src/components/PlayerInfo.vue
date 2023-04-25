<template>
    <div class="player-info-container">
        <h3 class="player-name">{{ props.playerName }}</h3>
        <p class="player-color" :style="{ backgroundColor: props.playerColor }"> {{ props.playerColor }}</p>
    </div>

</template>

<script setup lang="ts">

const props = defineProps({
  playerName: String,
  playerColor: String,
  playerId: String
})

</script>

<style scoped lang="scss">
.player-info-container {
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    padding: 0.2rem;
    h3 {
        text-align: center;
    }
}
.player-color {
    background-color: v-bind(playerColor);
    width: 100%;
    height: 10vh;
}

</style>