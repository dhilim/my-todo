<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view /> -->

    <Users class="mt-6" />
    <Todos class="mt-6" />

    <div class="text-center my-10">
      <div>{{ counter }}</div>
      <div>
        <button
          class="px-4 py-1 mx-2 font-semibold text-white bg-red-500 rounded"
          @click="decrement"
        >
          -
        </button>
        <button
          class="px-4 py-1 mx-2 font-semibold text-white bg-green-500 rounded"
          @click="increment"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mapState } from "vuex";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";
import Todos from "./components/Todos.vue";
import Users from "./components/Users.vue";
// import store from "./store";

@Component({
  components: {
    Login,
    Footer,
    Todos,
    Users,
  },
  // computed: {
  //   ...mapState({
  //     counter: (state): number => state.count,
  //   }),
  // },
})
export default class App extends Vue {
  get counter(): number {
    return this.$store.state.count;
  }

  increment(): void {
    // this.$store.commit("increment");
    this.$store.commit("SET_USERS_LOADING", true);
  }

  decrement(): void {
    // this.$store.commit("decrement");
    this.$store.commit("SET_USERS_LOADING", false);
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
