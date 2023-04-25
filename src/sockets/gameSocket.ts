import type ChatMessage from '@/models/ChatMessage';
import { reactive } from 'vue'
import { io } from 'socket.io-client'
import type ColorChangeEmitBody from '@/models/ColorChangeEmitBody';
import ColorOption from '@/models/ColorOption';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';

// const user = useUserStore()?.$state.user[0]

interface IGameState {
  latestColorChange: ColorChangeEmitBody | null;
  reset: boolean;
  gameStarted: boolean;
}


export const gameState = reactive<IGameState>({
  latestColorChange: null,
  reset: false,
  gameStarted: false,
})

export const gameSocket = io('http://localhost:3000');

gameSocket.on('color-change', (colorInfo: ColorChangeEmitBody) => {
  gameState.latestColorChange = colorInfo;
})

gameSocket.on('game-reset', () => {
  gameState.reset = true;
})

gameSocket.on('start-game', (startMessage) => {
  console.log(startMessage);
  gameState.gameStarted = startMessage.gameStarted;
})

gameSocket.on('ship-hit', (ship) => {
  if (ship.user.color === useUserStore().$state.user[0]?.color) {
    router.push('/result');
  }
})

// gameSocket.on('hitter', ((hitInfo) => {
//   console.log(hitInfo);
//   if (hitInfo.hit) {

//   }
  
// }))

// <option value="#0074cc" class="option-one" name="blue"></option>