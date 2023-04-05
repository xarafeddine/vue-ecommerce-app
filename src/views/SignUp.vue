<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>Signup</h1>

    <input-component
      inputType="text"
      inputName="username"
      @on-change="onchange"
      :isRequired="true"
      inputLabel="Username"
      inputId="username"
      placehoder="enter a username"
    />

    <input-component
      inputType="email"
      inputName="email"
      @on-change="onchange"
      :isRequired="true"
      inputLabel="Email"
      inputId="email"
      placehoder="enter an email"
    />

    <input-component
      inputType="password"
      inputName="password"
      @on-change="onchange"
      :isRequired="true"
      inputLabel="Password"
      inputId="password"
      placehoder="enter a password"
    />

    <button-component>Sign Up</button-component>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
export default {
  components: { ButtonComponent, InputComponent },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    onchange({ key, value }) {
      this[key] = value;
    },
    async handleSubmit() {
      await this.$store.dispatch("signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      if (this.$store.getters.error)
        return (this.error = this.$store.getters.error.message.slice(10));
      else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.signup-form h1 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}

.error {
  margin: 10px;
  color: red;
}
</style>
