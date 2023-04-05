<template>
  <div class="Cart">
    <header><h2>Shopping Cart</h2></header>
    <div v-if="items?.length">
      <ul>
        <li v-for="item in items" :key="item.id" class="line">
          <p class="title">{{ item.product.title }}</p>
          <div>
            <span>Qty:</span>
            <input
              class="inputQty"
              type="number"
              @change="changeCart(item.id)"
              v-model="item.quantity"
              min="1"
            />
          </div>
          <div>
            <p style="color: green">
              ${{ parseFloat(+item.product.price * +item.quantity).toFixed(2) }}
            </p>
          </div>
          <div>
            <button class="removeBtn" @click="removeItem(item.id)">
              Remove
            </button>
          </div>
        </li>
      </ul>
      <div>
        <button-component @on-click="checkout()">Checkout</button-component>
      </div>
    </div>
    <div v-else>
      <p>the cart is empty: add some product from product list</p>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
export default {
  components: { ButtonComponent },
  data() {
    return {};
  },
  methods: {
    changeCart() {
      // eslint-disable-next-line no-unused-vars
      const cart = this.items.map(({ product, ...rest }) => ({ ...rest }));

      this.$store.dispatch("updateCart", cart);
    },
    removeItem(id) {
      const cart = this.items
        .filter((item) => item.id !== id)
        // eslint-disable-next-line no-unused-vars
        .map(({ product, ...rest }) => ({ ...rest }));

      this.$store.dispatch("updateCart", cart);
      // code to remove item
    },
    checkout() {
      // code to proceed to checkout
      this.$router.push({ name: "checkout", params: { cart: this.items } });
    },
  },
  computed: {
    items() {
      const items = this.$store.state.user.cart;
      const products = this.$store.state.products;
      return items.map((item) => {
        const product = products.find((prod) => prod.id == item.productId);
        return {
          ...item,
          product,
        };
      });
    },
  },
};
</script>

<style scoped>
.Cart {
  padding: 20px;
  background: #f2f2f2;
  border-radius: 10px;
  text-align: center;
}

.Cart header {
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.Cart ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.Cart ul li {
  padding: 10px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.removeBtn {
  display: inline-block;
  padding: 10px 20px;
  background: #ddd;
  border-radius: 5px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.line {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.title {
  width: 55%;
  padding: 5px;
}
.inputQty {
  width: 50px;
  height: 30px;

  padding: 5px;
  margin-left: 10px;
}
</style>
