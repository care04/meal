import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecipeBox from "../views/RecipeView.vue";
import AddRecipe from "../views/AddRecipeView.vue";
import WelcomePage from "../views/WelcomePage.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import GroceryListView from "@/views/GroceryListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: WelcomePage,
    },
    {
      path: "/recipies",
      name: "recipies",
      component: HomeView,
      meta: {
        reload: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
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
    },
    {
      path: "/groceryList",
      name: "groceryList",
      component: GroceryListView,
    },
  ],
});

export default router;
