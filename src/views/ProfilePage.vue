<template>
  <div class="container">
    <h1>Profile</h1>

    <p>Username: {{ user.username }}</p>

    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
