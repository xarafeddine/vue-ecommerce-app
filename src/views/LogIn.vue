<template>
  <form @submit.prevent="handleSubmit" class="loginForm">
    <h3 class="title">Login</h3>

    <input-component
      inputType="email"
      inputName="email"
      @on-change="onchange"
      :isRequired="true"
      inputLabel="Email"
      inputId="email"
      placehoder="enter your email"
    />

    <input-component
      inputType="password"
      inputName="password"
      @on-change="onchange"
      :isRequired="true"
      inputLabel="Password"
      inputId="password"
      placehoder="enter your password"
    />

    <button-component> Login </button-component>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  components: { InputComponent, ButtonComponent },
  data() {
    return {
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
      await this.$store.dispatch("login", {
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
.loginForm {
  padding: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}
.error {
  margin: 10px;
  color: red;
}
</style>
