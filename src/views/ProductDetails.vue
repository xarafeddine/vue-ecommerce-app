<template>
  <div class="ProductDetails" v-if="product">
    <h1>{{ product.title }}</h1>
    <div class="product">
      <div class="right">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="left">
        <strong>Category:</strong>
        <p>{{ product.category }}</p>

        <strong>Rating: {{ Math.round(Math.random() * 5) }}</strong>

        <strong>Price:</strong>
        <p>${{ product.price }}</p>

        <strong>Description:</strong>
        <p>{{ product.description }}</p>

        <button
          v-if="product.isInCart"
          @click="$router.push({ name: 'cart' })"
          class="cartBtn"
        >
          go to cart
        </button>

        <button v-else @click="addToCart" class="cartBtn">Add to cart</button>
      </div>
    </div>
    <div class="reviews">
      <h3>Customer Reviews</h3>
      <ul v-if="product.reviews?.length">
        <li v-for="review in product.reviews" :key="review.id">
          <strong>{{ review.author }}</strong> - {{ review.rating }} stars
          <p>{{ review.comment }}</p>
        </li>
      </ul>
      <p v-else>no reviews are available :(</p>
    </div>
  </div>
  <div v-else>
    <h2>no product with this id</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      selectedIndex: 0,
    };
  },

  methods: {
    addToCart() {
      if (!this.userIsAuthenticated) return alert("Signup to purshase");
      const cart = [...this.$store.state.user.cart];
      cart.push({
        id: Math.round(Math.random() * 10000).toString(),
        productId: this.id,
        quantity: 1,
      });
      this.product.isInCart = true;
      this.$store.dispatch("updateCart", cart);
    },
    addOne() {
      this.selectedIndex = (this.selectedIndex + 1) % 3;
    },
    subtractOne() {
      this.selectedIndex = (this.selectedIndex - 1) % 3;
    },
  },
  computed: {
    ...mapState(["products"]),
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    product() {
      console.log(this.id);
      console.log(this.products);
      return this.products.find((prod) => prod.id === this.id);
    },
    selectedImage() {
      //   console.log(this.selectedIndex);
      //   return this.product.images[Math.abs(this.selectedIndex)];
      return this.product.image;
    },
  },
};
</script>
<style scoped>
.ProductDetails {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.ProductDetails h1 {
  font-size: 30px;
  margin-bottom: 10px;
}

.product {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 60px;
  padding: 100px;
}

.left {
  padding: 50px;
}
.right img {
  width: 400px;
  height: auto;
  margin-bottom: 20px;
}

.ProductDetails p {
  color: gray;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.ProductDetails h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.ProductDetails ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ProductDetails li {
  margin-bottom: 10px;
}

.ProductDetails li strong {
  font-weight: bold;
}

.ProductDetails li p {
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.5;
}

.cartBtn {
  display: inline-block;
  padding: 10px 20px;
  background: #ddd;
  border-radius: 5px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}
</style>
