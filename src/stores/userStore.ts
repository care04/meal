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
    async currentAuth() {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session.access_token != undefined) {
          this.loggedIn = true;
        }
      });
    },
    async logout(): Promise<String | Boolean> {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
        return error.message;
      } else {
        this.loggedIn = false;
        return true;
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
