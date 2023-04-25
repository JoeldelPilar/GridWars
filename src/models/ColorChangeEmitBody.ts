import type User from "./User";

export default class ColorChangeEmitBody {
  constructor(public y: number, public x: number, public user: User) {}
}