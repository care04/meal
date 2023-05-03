import { defineStore } from "pinia";
import { supabase } from "../supabase.js";
import { useUserStore } from "./userStore";
;
interface GroceryListItem {
  name: String;
  id: Number;
}
interface GroceryListState {
  items: Array<GroceryListItem>;
  errorValue: String;
}

export const useListStore = defineStore("list", {
  state: (): GroceryListState => ({
    items: [],
    errorValue: "",
  }),
  actions: {
    async addItems(item: any) {
      const userStore = useUserStore();
      console.log("item sent", item.name);
      const { data, error } = await supabase
        .from("GroceryList")
        .insert([
          {
            name: item.name,
            owner: userStore.id,
          },
        ])
        .select("*")
        .single();
      if (error) {
        this.errorValue = error.message;
        console.log("error: ", error.message);
      }
      if (data) {
        this.items.push(data);
        console.log(data);
      }
    },
    async getItems() {
      const { data, error } = await supabase
        .from("GroceryList")
        .select("*")
        .single();
      if (error) {
        this.errorValue = error.message;
      }
      if (data) {
        this.items = data;
      }
    },
    async deleteItems(id: number) {
      const { error } = await supabase
        .from("GroceryList")
        .delete()
        .eq("id", id);
      if (error) {
        this.errorValue = error.message;
      }
      this.items.forEach((ingredient) => {
        if (ingredient.id === id) {
          this.items.pop();
        }
      });
    },
    pullErrorMessage() {
      const error = this.errorValue;
      this.errorValue = "";
      return error;
    },
  },
});
