import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecipeBox from "../views/RecipeView.vue";
import AddRecipe from "../views/AddRecipeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:id",
      name: "recipe",
      component: RecipeBox,
    },
    {
      path: "/newRecipe",
      name: "newRecipe",
      component: AddRecipe,
    }
  ],
});

export default router;
