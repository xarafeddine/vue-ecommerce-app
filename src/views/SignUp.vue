<template>
  <div class="signup-container">
    <form class="signup-form" @submit.prevent="handleSubmit">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required />

      <button>Sign Up</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$store.dispatch("signup", {
          username: this.username,
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

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-form label {
  margin-top: 1rem;
}

.signup-form input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.signup-form button {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #007bff;
  color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
