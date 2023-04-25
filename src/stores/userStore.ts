import { defineStore } from "pinia";
import User from "@/models/User";
import { gameSocket } from "@/sockets/gameSocket";

const STORE_NAME = 'userStore'

export const useUserStore = defineStore(STORE_NAME, {
  state: () => ({
    user: [] as User[],
    hits: 0
  }),
  actions: {
    addUser(userName: string, color: string, id: string) {
    this.user.push(new User(userName, color, id))
    console.log(this.user);
    }
  }
})

gameSocket.on('hitter', ((hitInfo) => {
  if (hitInfo.hit) {
    useUserStore().$state.hits += 1
    console.log(useUserStore().$state.hits);
  }
}))