<template>
  <div class="checkout-page">
    <h1 class="title">Checkout</h1>
    <div class="customer-info">
      <h2 class="subtitle">Customer Information</h2>
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="customer.name" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="customer.email" />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input id="address" type="text" v-model="customer.address" />
      </div>
    </div>
    <div class="payment-details">
      <h2 class="subtitle">Payment Details</h2>
      <div class="form-group">
        <label for="card-number">Card Number:</label>
        <input id="card-number" type="text" v-model="payment.cardNumber" />
      </div>
      <div class="form-group">
        <label for="expiry-date">Expiry Date:</label>
        <input id="expiry-date" type="text" v-model="payment.expiryDate" />
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input id="cvv" type="text" v-model="payment.cvv" />
      </div>
    </div>
    <button class="submit-button" @click="submitOrder">Submit Order</button>
  </div>
</template>

<script>
export default {
  props: ["cart"],
  data() {
    return {
      customer: {
        name: "",
        email: "",
        address: "",
      },
      payment: {
        cardNumber: "p43kjh534kh54k3",
        expiryDate: "03/04",
        cvv: "324",
      },
    };
  },
  created() {
    const { username, email } = this.$store.getters.user;
    this.customer = { ...this.customer, email, name: username };
  },
  methods: {
    submitOrder() {
      // submit order logic here
      this.$router.push({
        name: "confirmation",
        params: {
          customer: this.customer,
          payment: this.payment,
          cart: this.cart,
        },
      });
    },
  },
};
</script>

<style scoped>
.submit-button {
  background-color: #007aff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.submit-button:hover {
  background-color: #0062cc;
}

.payment-details {
  margin-top: 20px;
}

.checkout-page input[type="text"],
.checkout-page input[type="email"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.checkout-page input[type="text"]:focus,
.checkout-page input[type="email"]:focus {
  outline: none;
  border-color: #007aff;
}

.checkout-page label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.checkout-page .form-group {
  margin-bottom: 10px;
}
</style>
