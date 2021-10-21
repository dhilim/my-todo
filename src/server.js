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

      server.create("todo", {
        id: 1,
        title: "Alice's todo #1",
        note: "This is note",
        user: {
          id: 2,
          name: "Alice",
        },
      });
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
          timing: 100,
        }
      );

      this.delete("/users/:id", (schema, request) => {
        const id = request.params.id;

        return schema.users.find(id).destroy();
      });

      this.get("/todos", (schema) => {
        return schema.todos.all();
      });

      this.post(
        "/todos",
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);

          return schema.todos.create(attrs);
        },
        {
          timing: 100,
        }
      );

      this.delete("/todos/:id", (schema, request) => {
        const id = request.params.id;

        return schema.todos.find(id).destroy();
      });
    },
  });

  return server;
}
