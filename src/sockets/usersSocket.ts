import type User from '@/models/User'
import { reactive } from 'vue'
import { io } from 'socket.io-client'
import ColorOption from '@/models/ColorOption'

export const usersState = reactive({
  users: [] as User[],
  availableColorOptions: [
    new ColorOption('#0074cc', 'blue'),
    new ColorOption('#ff0000', 'red'),
    new ColorOption('#00ff00', 'green'),
    new ColorOption('#ffff00', 'yellow'),
    new ColorOption('#57076b', 'purple')
  ]
})

const filterColorOptions = () => {
  const { availableColorOptions } = usersState
  for (let index = 0; index < usersState.users.length; index++) {
    const { color } = usersState.users[index]
    const duplicateColor = availableColorOptions.find((option) => option.color === color)
    if (duplicateColor) {
      const duplicateColorIndex = availableColorOptions.map((color) => color.color).indexOf(duplicateColor.color)
      availableColorOptions.splice(duplicateColorIndex, 1)
    }
  }
}

export const usersSocket = io('http://localhost:3000')

usersSocket.on('create-user', (users: User[]) => {
  usersState.users = []
  console.log('Mottagen user', users)
  usersState.users = users
  filterColorOptions()
})
