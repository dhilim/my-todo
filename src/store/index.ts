import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    users: [],
    usersLoading: false,
    inputUserSaving: false,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_USERS_LOADING(state, payload) {
      state.usersLoading = payload;
    },
    SET_INPUT_USER_SAVING(state, payload) {
      state.inputUserSaving = payload;
    },
  },
  actions: {
    getUsers(context): void {
      context.commit("SET_USERS_LOADING", true);

      fetch("/api/users")
        .then((res) => res.json())
        .then((json) => {
          // this.users = json.users;
          // this.usersLoading = false;
          context.commit("SET_USERS", json.users);
          context.commit("SET_USERS_LOADING", false);
        });
    },

    addUser(context, user): void {
      context.commit("SET_INPUT_USER_SAVING", true);

      fetch("/api/users", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          // this.user.name = "";
          // this.name.focus();

          context.dispatch("getUsers");
          return res;
        })
        .finally(() => {
          context.commit("SET_INPUT_USER_SAVING", false);
        });
    },

    deleteUser(context, userId): void {
      fetch(`/api/users/${userId}`, {
        method: "delete",
      })
        // .then((res) => res.json())
        .then(() => {
          context.dispatch("getUsers");
        });
    },
  },
  modules: {},
});
