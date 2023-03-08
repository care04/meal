import { defineStore } from "pinia";
interface UserState {
  loggedIn: Boolean;
}
export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    loggedIn: true,
  }),
});
