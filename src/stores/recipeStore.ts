import { defineStore } from "pinia";
import type { Ingredient } from "../types/Recipe";
import { supabase } from "../supabase.js";
import type { Database } from "../types/schema";

interface RecipeState {
  recipes: Database.public.Tables.recipes.Row[];
  recipe: Database.public.Tables.recipes.Row | null;
  ingredients: Database.public.Tables.ingredient.row[];
  edit: boolean;
  ingredientsToRemove: Array;
  ingredientsToAdd: Array;
}

export const useRecipeStore = defineStore("recipe", {
  state: (): RecipeState => ({
    recipes: [],
    recipe: null,
    ingredients: [],
    edit: false,
    ingredientsToRemove: [],
    ingredientsToAdd: [],
  }),
  actions: {
    async getRecipesSupa() {
      const { data, error } = await supabase.from("recipes").select("*");
      this.recipes = data;
      if (error) {
        console.log(error);
      }
    },
    addoredit() {
      if (this.edit === true) {
        this.updateRecipeSupa(this.recipe);
      } else {
        this.addRecipeSupa(this.recipe);
      }
    },
    async updateRecipeSupa(recipe: any) {
      const { data, error } = await supabase
        .from("recipes")
        .update({
          name: recipe.name,
          serving: recipe.serving,
          instructions: recipe.instructions,
          description: recipe.description,
        })
        .eq("id", recipe.id)
        .select("*")
        .single();
      this.ingredientsToRemove.forEach((ingredient: any) => {
        this.deleteIngredient(ingredient.id);
      });
      this.ingredientsToAdd.forEach((ingredient: any) => {
        console.log("ingredient: ", ingredient, "recipe id: ", this.recipe.id);
        this.addIngredientSupa(ingredient, this.recipe.id);
      });
      this.recipes.forEach((recipe) => {
        if (recipe.id === this.recipe.id) {
          const recipeIndex = this.recipes.indexOf(recipe);
          this.recipes.splice(recipeIndex, 1);
          this.recipes.push(data);
          console.log(error);
        }
      });
      this.edit = false;
      this.ingredientsToRemove = [];
      this.ingredientsToAdd = [];
    },
    async deleteIngredient(id: number) {
      const { error } = await supabase
        .from("ingredients")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
      }
    },
    async addRecipeSupa(recipe: any) {
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
        .select("*")
        .single();
      if (error) {
        console.log(error);
      }
      this.ingredients.forEach((ingredient) => {
        this.addIngredientSupa(ingredient, data.id);
      });
      this.recipes.push(data);
    },
    async addIngredientSupa(ingredient: Ingredient, id: number) {
      const { error } = await supabase.from("ingredients").insert([
        {
          name: ingredient.name,
          unit: ingredient.unit,
          recipe_id: id,
        },
      ]);
      console.log(error);
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
        .single()
        .eq("id", id);
      this.recipe = data;
      this.ingredients = data.ingredients;
      if (error) {
        // this.error = error;`
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
      this.recipes.forEach((recipe) => {
        if (recipe.id === id) {
          this.recipes.pop();
        }
      });
    },
  },
});
