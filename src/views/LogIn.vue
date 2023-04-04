<template>
  <form @submit.prevent="handleSubmit" class="mt-4 flex flex-col">
    <h3 class="text-xl underline">Login</h3>

    <label for="email">Email:</label>
    <input
      class="border w-4/12"
      type="email"
      name="email"
      v-model="email"
      required
    />

    <label for="email">Password:</label>
    <input
      class="border w-4/12"
      type="password"
      name="password"
      v-model="password"
      required
    />

    <button
      class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white"
    >
      Login
    </button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>
