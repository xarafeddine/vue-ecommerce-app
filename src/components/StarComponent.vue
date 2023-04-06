<template>
  <div class="container">
    <span v-for="star in stars" :key="star" class="star">&#9733;</span>
  </div>
</template>

<script>
export default {
  props: {
    stars: Number,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 0;
}
.star {
  color: #ffc107;
  font-size: 20px;
}
</style>
