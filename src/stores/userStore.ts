import { defineStore } from "pinia";
import { supabase } from "../supabase"

interface UserState {
  loggedIn: Boolean;
  errorValue: String;
}
export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    loggedIn: false,
    errorValue: "",
  }),
  actions: {
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      } else {
        this.loggedIn = false;
      }
    },
    async login(password: string, email: string): Boolean {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (user) {
        console.log("user", user);
        this.loggedIn = true;
        return true;
      }
      if (error) {
        console.log(error);
        this.errorValue = error.message;
        return false;
      }
    },
    pullErrorMessage() {
      const error = this.errorValue;
      this.errorValue = "";
      return error;
    }
  },
});
