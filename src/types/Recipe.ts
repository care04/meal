export interface Recipe {
  name: string;
  serving: number;
  ingredients: Ingredient[];
  description: string;
  instructions: string;
  id: number;
}
export interface Ingredient {
  unit: string;
  name: string;
}
