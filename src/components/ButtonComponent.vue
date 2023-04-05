<template>
  <button @click="emit()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    emit() {
      this.$emit("on-click");
    },
  },
};
</script>

<style scoped>
button {
  margin: 30px 0px;
  display: inline-block;
  padding: 10px 20px;
  background: #0055ff;
  border-radius: 5px;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  color: white;
}
</style>
