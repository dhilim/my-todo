/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      todo: Model,
    },

    seeds(server) {
      server.create("user", { id: 1, name: "Bob" });
      server.create("user", { id: 2, name: "Alice" });

      server.create("todo", { id: 1, title: "Alice" });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      this.post(
        "/users",
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);

          return schema.users.create(attrs);
        },
        {
          timing: 1000,
        }
      );
    },
  });

  return server;
}
