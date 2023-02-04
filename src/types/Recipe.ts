export interface Recipe {
  name: string;
  serving: number;
  ingrediants: Ingrediant[];
  description: string;
  instructions: string;
  id: number;
}
export interface Ingrediant {
  amount: string;
  name: string;
}
