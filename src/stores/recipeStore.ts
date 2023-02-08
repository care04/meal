import { defineStore } from "pinia";
import type { Recipe } from "../types/Recipe";
import axios from "axios";
export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [] as Recipe[],
    recipe: {} as Recipe,
    edit: false,
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRecipes() {
      axios.get("/api/recipes").then(({ data }) => {
        this.recipes = data.recipes;
      });
    },
    getRecipe(id: number) {
      axios.get("/api/recipes/" + id).then(({ data }) => {
        this.recipe = data.recipe;
      });
    },
    saveRecipe(recipe: Recipe) {
      if (this.edit === true) {
        axios
          .patch("/api/recipes/" + this.recipe.id, recipe)
          .then(({ data }) => {
            this.recipes = data.recipes;
            this.edit = false;
          });
      } else {
        axios.post("/api/recipes", recipe).then(({ data }) => {
          this.recipes.push(data.recipes[data.recipes.length - 1]);
        });
      }
    },
  },
});
