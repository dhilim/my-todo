import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// const moduleUser: Module<any, any> = {
//   state() {
//     return {
//       users: [],
//       usersLoading: false,
//       inputUserSaving: false,
//     };
//   },
//   mutations: {
//     SET_USERS(state: Record<string, unknown>, payload: Array<User>) {
//       state.users = payload;
//     },
//     SET_USERS_LOADING(state: Record<string, unknown>, payload: boolean) {
//       state.usersLoading = payload;
//     },
//     SET_INPUT_USER_SAVING(state: Record<string, unknown>, payload: boolean) {
//       state.inputUserSaving = payload;
//     },
//   },
//   actions: {
//     getUsers(context: any): void {
//       context.commit("SET_USERS_LOADING", true);

//       fetch("/api/users")
//         .then((res) => res.json())
//         .then((json) => {
//           context.commit("SET_USERS", json.users);
//           context.commit("SET_USERS_LOADING", false);

//           return json;
//         });
//     },

//     async addUser(context: any, user: User): Promise<void> {
//       context.commit("SET_INPUT_USER_SAVING", true);

//       await fetch("/api/users", {
//         method: "post",
//         headers: {
//           Accept: "application/json, text/plain, */*",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       context.dispatch("getUsers");
//       context.commit("SET_INPUT_USER_SAVING", false);
//     },

//     deleteUser(context: any, userId: number): void {
//       fetch(`/api/users/${userId}`, {
//         method: "delete",
//       })
//         // .then((res) => res.json())
//         .then(() => {
//           context.dispatch("getUsers");
//         });
//     },
//   },
// };

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
          context.commit("SET_USERS", json.users);
          context.commit("SET_USERS_LOADING", false);
          return json;
        });
    },
    async addUser(context, user): Promise<void> {
      context.commit("SET_INPUT_USER_SAVING", true);
      await fetch("/api/users", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      context.dispatch("getUsers");
      context.commit("SET_INPUT_USER_SAVING", false);
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
  modules: {
    // user: moduleUser,
  },
});
