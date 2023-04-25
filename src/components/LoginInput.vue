<template>
  <div>
    <form class="form-container" @submit.prevent="createUser">
      <label class="visually-hidden" for="playerInput">Enter player name</label>
      <input
        type="text"
        name="playername"
        id="playerInput"
        placeholder="Enter player name"
        v-model="playerName"
      />
      <LoginColor class="login-color-container" @player-selected-color="setPlayerColor" />
      <button class="play-btn" type="submit" :disabled="btnDisabled">Play</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import LoginColor from './LoginColor.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { usersSocket, usersState } from '@/sockets/usersSocket'
import { v4 as uuidv4 } from 'uuid'
import User from '@/models/User'
import router from '@/router'

const store = useUserStore()

const playerName = ref('')
const playerColor = ref('')

const btnDisabled = computed(() => {
  return playerName.value === '' || playerColor.value === ''
})

function createUser() {
  if (isDuplicateName()) {
    alert("Duplicate Name")
    return;
  }
  const id = uuidv4()
  store.addUser(playerName.value, playerColor.value, id)
  const newUser = new User(playerName.value, playerColor.value, id)
  usersSocket.emit('create-user', newUser)
  router.push('/game')
  isDuplicateName();
}

function isDuplicateName() {
  const users = usersState.users
  const duplicateUser = users.find((user) => user.name === playerName.value)
  if (duplicateUser) return true
}



function setPlayerColor(color: string) {
  playerColor.value = color
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

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  input {
    width: 100%;
    padding: 1rem;
    border: solid 1px #009576;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }
}

.login-color-container {
  width: 20rem;
}

.play-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #009576;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #009193;
  }
}

.play-btn:disabled {
  background: #797979;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
