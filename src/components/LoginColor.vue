<template>
  <div class="color-container">
    <label class="visually-hidden" for="color-picker">Välj din färg</label>
    <select :class="selectColor" name="color picker" id="color-picker" @change="setSelectedColor">
      <option value="" class="option">Välj din färg</option>
      <option
        v-for="({ color, name }, i) in usersState.availableColorOptions"
        :key="i"
        :value="color"
        :class="name"
        :name="name"
      >
        {{ name }}
      </option>
      <!-- <option value="#0074cc" class="option-one" name="blue"></option>
      <option value="#ff0000" class="option-two" name="red"></option>
      <option value="#00ff00" class="option-three" name="green"></option>
      <option value="#ffff00" class="option-four" name="yellow"></option>
      <option value="#57076b" class="option-five" name="purple"></option> -->
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { usersState } from '@/sockets/usersSocket'

const emit = defineEmits(['player-selected-color'])

const selectColor = ref('')

const playerSelectedColor = ref('')

function setSelectedColor(e: any) {
  playerSelectedColor.value = e.currentTarget.value
  selectColor.value = e.currentTarget.selectedOptions[0].classList.value

  emit('player-selected-color', playerSelectedColor.value)
}
</script>

<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.color-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

select {
  cursor: pointer;
  width: 100%;
}

.blue {
  background-color: #0074cc;
}

.red {
  background-color: #ff0000;
}

.green {
  background-color: #00ff00;
}

.yellow {
  background-color: #ffff00;
}

.purple {
  background-color: #57076b;
}

option::selection {
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
}
</style>
