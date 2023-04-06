<template>
  <div class="ProductDetails" v-if="product">
    <h1>{{ product.title }}</h1>
    <div class="product">
      <div class="left">
        <img :src="selectedImage" :alt="product.title" />
      </div>
      <div class="right">
        <strong>Category:</strong>
        <p>{{ product.category }}</p>

        <strong>Rating: </strong>
        <star-component :stars="parseInt(product.rating.rate)" />

        <strong>Price:</strong>
        <p>${{ product.price }}</p>

        <strong>Description:</strong>
        <p>{{ product.description }}</p>

        <button-component
          v-if="product.isInCart"
          @on-click="$router.push({ name: 'cart' })"
        >
          go to cart
        </button-component>

        <button-component v-else @on-click="addToCart"
          >Add to cart</button-component
        >
      </div>
    </div>
    <modal-component v-if="showModal" @closeModal="showModal = false">
      <ul class="selector">
        <li :class="hasAccount && 'active'" @click="hasAccount = true">
          Login
        </li>
        <li :class="!hasAccount && 'active'" @click="hasAccount = false">
          Signup
        </li>
      </ul>

      <log-in v-if="hasAccount" />
      <sign-up v-else />
    </modal-component>
    <div class="reviews">
      <div class="review-list">
        <h2 class="title">Customer Reviews</h2>
        <ul v-if="product.reviews?.length">
          <li v-for="review in product.reviews" :key="review.id">
            by <strong>{{ review.author }}</strong> - {{ review.rating }} stars
            <p>
              <i>{{ review.comment }}</i>
            </p>
          </li>
        </ul>
        <p v-else>no reviews are available :(</p>
      </div>

      <div class="review-form">
        <h2 class="title">Make your own review</h2>
        <reviews-form
          v-if="userIsAuthenticated"
          @add-review="addReview"
        ></reviews-form>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>no product with this id</h2>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import { mapState } from "vuex";
import ModalComponent from "@/components/ModalComponent.vue";
import LogIn from "./LogIn.vue";
import SignUp from "./SignUp.vue";
import ReviewsForm from "@/components/ReviewsForm.vue";
import StarComponent from "@/components/StarComponent.vue";

export default {
  props: ["id"],
  components: {
    ButtonComponent,
    ModalComponent,
    LogIn,
    SignUp,
    ReviewsForm,
    StarComponent,
  },
  data() {
    return {
      selectedIndex: 0,
      showModal: false,
      hasAccount: true,
    };
  },

  methods: {
    async addReview(payload) {
      await this.$store.dispatch("createReview", {
        ...payload,
        productId: this.id,
      });
      this.$store.dispatch("fetchProducts");
    },
    select(bool) {
      this.hasAccount = bool;
    },
    addToCart() {
      if (!this.userIsAuthenticated) return (this.showModal = true);
      const cart = [...this.$store.state.user.cart];
      cart.push({
        id: Date.now(),
        productId: this.id,
        quantity: 1,
      });
      this.product.isInCart = true;
      this.$store.dispatch("updateCart", cart);
    },
    // showModal() {
    //   return !this.userIsAuthenticated;
    // },
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
  padding: auto;
}

.product {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 60px;
  padding: 100px;
}

.right {
  display: flex;
  flex-direction: column;
  padding: 15% 0px;
}
.left img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.ProductDetails p {
  color: gray;
  font-size: 15px;
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

.selector {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  width: 100%;
}

.selector li {
  text-decoration: none;
  text-decoration-style: none;
  background-color: #cecccc;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9e9e9e;
  cursor: pointer;
}

.selector .active {
  background-color: rgb(255, 255, 255);
  color: black;
}
.reviews {
  display: flex;
  gap: 100px;
}
.title {
  margin-bottom: 50px;
}
@media screen and (max-width: 800px) {
  .reviews {
    flex-direction: column;
  }
}
</style>
