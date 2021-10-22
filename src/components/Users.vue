<template>
  <div class="text-center">
    <div>
      <div v-if="usersLoading">loading...</div>
      <ul id="users" v-else>
        <li v-for="user in users" v-bind:key="user.id">
          {{ user.name }}
          <span class="ml-4 cursor-pointer" @click="deleteUser(user.id)"
            >X</span
          >
        </li>
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
        :disabled="saving"
        v-model="user.name"
        ref="name"
        @keydown.ctrl.enter="addUser"
      />
      <div class="mt-3">
        <button
          class="px-7 py-2 mx-2 font-semibold text-white bg-pink-600 rounded"
          @click="addUser"
          :disabled="saving"
          :class="{ 'disabled:bg-pink-300': saving }"
        >
          <span v-if="saving">Saving...</span>
          <span v-else>Add User</span>
        </button>
      </div>
    </div>
    <button
      class="border-solid border-4 border-light-blue-500"
      @click="getUsers"
    >
      fetch
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class Users extends Vue {
  //   users: Array<Record<string, unknown>> = [];
  //   usersLoading = false;
  //   saving = false;
  user = {
    name: "",
  };

  get users(): Array<Record<string, unknown>> {
    return this.$store.state.users;
  }

  get usersLoading(): boolean {
    return this.$store.state.usersLoading;
  }

  get saving(): boolean {
    return this.$store.state.inputUserSaving;
  }

  @Ref("name") readonly name!: HTMLInputElement;

  created(): void {
    // this.getUsers();
    this.$store.dispatch("getUsers");
  }

  getUsers(): void {
    this.$store.dispatch("getUsers");
  }

  addUser(): void {
    this.$store.dispatch("addUser", this.user).finally(() => {
      this.user.name = "";
      this.name.focus();
    });
  }

  deleteUser(id: number): void {
    this.$store.dispatch("deleteUser", id);
  }
}
</script>

<style scoped></style>
