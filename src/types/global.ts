import type { Database } from "./schema";

export interface DeepRecipe extends Database.public.Tables.recipes.Row {
  ingredients: Database.public.Tables.ingredients.Row[] | null;
}
