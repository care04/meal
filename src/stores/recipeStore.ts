import { defineStore } from "pinia";
import type { Ingredient, Recipe } from "../types/Recipe";
import { supabase } from "../supabase.js";
export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [] as Recipe[],
    recipe: {} as Recipe,
    edit: false,
    error: {},
  }),
  getters: {
    getrecipe: (state) => state.recipe,
    getrecipeDescription: (state) => state.recipe.description,
  },
  actions: {
    async getRecipesSupa() {
      const { data, error } = await supabase.from("recipes").select("*");
      this.recipes = data;
      this.error = error;
    },
    async addRecipeSupa(recipe: Recipe) {
      const { data, error } = await supabase
        .from("recipes")
        .insert([
          {
            name: recipe.name,
            serving: recipe.serving,
            instructions: recipe.instructions,
            description: recipe.description,
          },
        ])
        .select("*");
      if (data) {
        recipe.ingredients.forEach((ingredient) => {
          this.addIngredientSupa(ingredient, data[0].id);
        });
        console.log(data[0].id ?? error);
      }
    },
    async addIngredientSupa(ingredient: Ingredient, id: number) {
      const { data, error } = await supabase.from("ingredients").insert([
        {
          name: ingredient.name,
          unit: ingredient.amount,
          recipe_id: id,
        },
      ]);
      console.log("INGREDIENT", ingredient, "ID", id, data ?? error);
    },
    async getRecipeSupa(id: number) {
      const { data, error } = await supabase
        .from("recipes")
        .select(
          `
          *,
          ingredients (
            *
          )
        `
        )
        .eq("id", id);
      this.recipe = data[0];
      if (error) {
        this.error = error;
        console.log(error);
      }
    },
    async deleteRecipeSupa(id: number) {
      const { ierror } = await supabase
        .from("ingredients")
        .delete()
        .eq("recipe_id", id);
      const { error } = await supabase.from("recipes").delete().eq("id", id);
      console.log(error, ierror);
    },
  },
});
