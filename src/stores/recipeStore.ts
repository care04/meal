import { defineStore } from "pinia";
import type { Recipe } from "../types/Recipe";
import axios from "axios";
export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [] as Recipe[],
    recipe: {} as Recipe,
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRecipes() {
      axios.get("/api/recipes").then(({ data }) => {
        this.recipes = data.recipes;
      });
    },
    getRecipe(id) {
      axios.get("/api/recipes/" + id).then(({ data }) => {
        this.recipe = data.recipe;
      });
    },
    saveRecipe(recipe) {
      axios.post("/api/recipes", recipe).then(({ data }) => {
        this.recipes.push(data.recipes[data.recipes.length - 1]);
      });
    },
  },
});
