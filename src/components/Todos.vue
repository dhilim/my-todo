<template>
  <div class="text-center">
    <h2 class="text-h2">Todos</h2>
    <div>
      <label class="my-2" for="uname">Title</label>
      <input
        type="text"
        name="uname"
        class="
          mt-1
          mb-3
          shadow-md
          border-none
          focus:ring-transparent
          rounded-sm
          bg-gray-100
          text-pink-500
        "
        v-model="title"
      />
      <label class="my-2" for="uname">Note</label>
      <input
        type="text"
        name="note"
        class="
          mt-1
          mb-3
          shadow-md
          border-none
          focus:ring-transparent
          rounded-sm
          bg-gray-100
          text-pink-500
        "
        v-model="note"
      />
      <div class="mt-3">
        <button
          class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded"
          @click="addTodo"
        >
          Add Todo
        </button>
      </div>
    </div>

    <div class="my-4">
      <div v-if="loading">loading...</div>
      <ul id="Todos" v-else>
        <li v-for="todo in todos" v-bind:key="todo.id" class="my-2">
          {{ todo.title }}
          <span class="ml-4 cursor-pointer" @click="deleteTodo(todo.id)"
            >X</span
          >
          <div>{{ todo.note }}</div>
          <div>by {{ user.name }}</div>
        </li>
      </ul>
    </div>

    <button
      class="border-solid border-4 border-light-blue-500"
      @click="getTodos"
    >
      fetch
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Todos extends Vue {
  todos: Array<Record<string, unknown>> = [];
  loading = false;
  id = null;
  title = "";
  note = "";
  user = {
    id: 2,
    name: "Alice",
  };

  get input(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      note: this.note,
      user: this.user,
    };
  }

  mounted(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.loading = true;

    fetch("/api/todos")
      .then((res) => res.json())
      .then((json) => {
        this.todos = json.todos;
        this.loading = false;
      });
  }

  addTodo(): void {
    fetch("/api/todos", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.input),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getTodos();
      });
  }

  deleteTodo(id: number): void {
    fetch(`/api/todos/${id}`, {
      method: "delete",
    })
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getTodos();
      });
  }
}
</script>

<style scoped></style>
