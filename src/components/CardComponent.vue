<template>
  <div
    class="product"
    focus
    @click="
      $router.push({ name: 'product-details', params: { id: product.id } })
    "
  >
    <img :src="product.image" alt="product image" />
    <h3>{{ product.title }}</h3>

    <p>Category: {{ product.category }}</p>
    <strong style="color: green">${{ product.price }}</strong>
    <div class="rating">
      <star-component :stars="parseInt(product.rating.rate)" />
    </div>
  </div>
</template>

<script>
import StarComponent from "./StarComponent.vue";
export default {
  components: { StarComponent },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methodes: {},
};
</script>

<style scoped>
.product {
  cursor: pointer;
  width: 75%;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0px 2px 2px #ccc;
}

.product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.product h3 {
  font-size: 20px;
  margin: 10px 0;
}

.product p {
  margin: 10px 0;
}

.rating {
  margin: 10px 0;
}
</style>
