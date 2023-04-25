<template>
  <div class="grid">
    <div v-for="(n, y) in boardSize.rows" :key="y" class="row">
      <span
        v-for="(v, x) in boardSize.columns"
        :key="x"
        class="cell"
        @click="() => changeColor(y, x)"
        :ref="(el) => {cells[y][x] = el as HTMLSpanElement}"
        >
      </span>
    </div>
    <button class='resetbtn' @click="() => gameSocket.emit('game-reset')">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref, type ComponentPublicInstance, watch } from 'vue'
import { gameSocket, gameState } from '../sockets/gameSocket'
import { useUserStore } from '@/stores/userStore'
import ColorChangeEmitBody from '@/models/ColorChangeEmitBody'
import create2dArrays from '../helpers/create2dArrays'

const user = useUserStore().$state.user[0]

const boardSize = ref({ rows: 15, columns: 20 }) // Bestämmer hur många rader och kolumner som ska renderas i <template>

watch(() => gameState.latestColorChange, () => {
  // Ändrar cellens färg när det kommer in en emit, gameState ligger i gameSocket.ts
  if (gameState.latestColorChange) {

    const {
    latestColorChange: { y, x, user }
  } = gameState
  cells.value[y][x].style.backgroundColor = user.color
}
})

watch(() => gameState.reset, () => {
  cells.value.forEach((row) => {
    row.forEach((cell) => {
      cell.style.backgroundColor = 'white'
    })
  })
  gameState.reset = false;
})

const cells = ref(create2dArrays(boardSize.value.rows))

const changeColor = (y: number, x: number) => {
  gameSocket.emit('color-change', new ColorChangeEmitBody(y, x, user))
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
