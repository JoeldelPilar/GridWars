<template>
  <div class="grid">
    <h2>Place your ship</h2>
    <div v-for="(n, y) in boardSize.rows" :key="y" class="row">
      <span
        v-for="(v, x) in boardSize.columns"
        :key="x"
        class="cell"
        @click="() => placeShip(y, x)"
        :ref="(el) => {cells[y][x] = el as HTMLSpanElement}"
      >
      </span>
    </div>
    <button @click="sendCoordinates">Place ship</button>
  </div>
</template>

<script setup lang="ts">
import create2dArrays from '@/helpers/create2dArrays'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { gameSocket } from '../sockets/gameSocket'

const user = useUserStore().$state.user[0]

const boardSize = ref({ rows: 15, columns: 20 })

const cells = ref(create2dArrays(boardSize.value.rows))

const placed = ref(false)

const shipCoordinates = ref<{y: null | number, x: null | number}>({ y: null, x: null })

const placeShip = (y: number, x: number) => {
  if (!placed.value) {
    cells.value[y][x].style.backgroundColor = user.color
    shipCoordinates.value.y = y
    shipCoordinates.value.x = x
    placed.value = true;
  }
}

const sendCoordinates = () => {
  const { y, x } = shipCoordinates.value
  gameSocket.emit('ship-placement', { y, x, user })
}
</script>

<style lang="scss" scoped>
.cell {
  display: inline-block;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-right: 5px;
  border: 1px solid black;
}

.grid {
  display: grid;
  place-content: center;
  margin: 0 auto;
}
</style>
