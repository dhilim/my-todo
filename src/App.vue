<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view /> -->
    <div>
      <div v-if="usersLoading">loading...</div>
      <ul id="users" v-else>
        <li v-for="user in users" v-bind:key="user.id">{{ user.name }}</li>
      </ul>
    </div>

    <div>
      <label class="my-2" for="uname">Username</label>
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
        v-model="user.name"
      />
      <div class="mt-3">
        <button
          class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded"
          @click="addUser"
        >
          Add User
        </button>
      </div>
    </div>

    <Login />
    <Footer />
    <button
      class="border-solid border-4 border-light-blue-500"
      @click="getUsers"
    >
      fetch
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";
@Component({
  components: {
    Login,
    Footer,
  },
})
export default class App extends Vue {
  users: Array<Record<string, unknown>> = [];
  usersLoading = false;
  user = {
    id: null,
    name: "",
  };

  created(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersLoading = true;

    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        this.users = json.users;
        this.usersLoading = false;
      });
  }

  addUser(): void {
    fetch("/api/users", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.getUsers();
      });
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
