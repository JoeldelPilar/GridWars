import type ChatMessage from '@/models/ChatMessage';
import { reactive } from 'vue'
import { io } from 'socket.io-client'
// import { socket } from '@/socket';

export const chatState = reactive({
  chatMessages: [] as ChatMessage[]
})

export const chatSocket = io('http://localhost:3000');

chatSocket.on('chat', (message: ChatMessage) => {
  console.log('Mottaget message');
  
  chatState.chatMessages.push(message)
})

