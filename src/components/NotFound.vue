<template>
  <div class="notfound">
    <h1>ERROR 404</h1>
    <h1>Page not found</h1>
    <router-link to="/"><button-component>Home</button-component></router-link>
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";
export default {
  components: { ButtonComponent },
};
</script>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
