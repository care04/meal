import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      recipe: Model,
    },

    seeds(server) {
      server.create("recipe", {
        name: "recipe one",
        serving: 2,
        id: 3,
        ingrediants: [
          { name: "Ingrediant 1", amount: "1 cup" },
          { name: "Ingrediant 2", amount: "3 tsp" },
          { name: "Ingrediant 3", amount: "1/2 cup" },
          { name: "Ingrediant 4", amount: "1 TBSP" }
        ],
        description: "this is the description for the first recipe",
        instructions:
          "these are the instrucitions for the first recipe in the recipe server",
      });
      server.create("recipe", {
        name: "recipe two",
        serving: 4,
        id: 2,
        ingrediants: [
          { name: "Ingrediant 1", amount: "3 cup" },
          { name: "Ingrediant 2", amount: "3 tsp" },
          { name: "Ingrediant 3", amount: "1/4 cup" },
        ],
        description: "this is the description for the second recipe",
        instructions:
          "these are the instrucitions for the first recipe in the recipe server",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/recipes", (schema) => {
        return schema.recipes.all();
      });
      this.get("/recipes/:id", (schema, request) => {
        const id = request.params.id;

        return schema.recipes.find(id);
      });
      this.post("/recipes", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        schema.recipes.create(attrs);
        return schema.recipes.all();
      });
      this.patch("/recipes/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const id = attrs.id;
        schema.recipes.find(id).update(attrs);
        return schema.recipes.all();
      });
    },
  });

  return server;
}
