import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      recipe: Model,
    },

    seeds(server) {
      server.create("recipe", { name: "recipe one" });
      server.create("recipe", { name: "recipe two" });
    },

    routes() {
      this.namespace = "api";

      this.get("/recipes", (schema) => {
        return schema.recipes.all();
      });
    },
  });

  return server;
}
