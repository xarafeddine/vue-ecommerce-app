<template>
  <div class="order-confirmation">
    <h1>Order Confirmation</h1>
    <div class="order-summary">
      <h2>Order Summary</h2>
      <div class="summary-row">
        <span class="summary-label">Order ID:</span>
        <span class="summary-value">{{
          Math.floor(Math.random() * 1234)
        }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Order info:</span>
        <span class="product-list">
          <p v-for="item in cart" :key="item.id">
            ProductId: {{ item.productId }} - Qty: {{ item.quantity }}
          </p>
        </span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Custmer name:</span>
        <span class="summary-value">{{ customer.name }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">customer email:</span>
        <span class="summary-value">{{ customer.email }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Shipping Address:</span>
        <span class="summary-value">{{ customer.address }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Payment Method:</span>
        <span class="summary-value">{{ "Debit Card" }}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Card Number:</span>
        <span class="summary-value">{{ payment.cardNumber }}</span>
      </div>

      <div class="summary-row">
        <span class="summary-label">Expiry Date:</span>
        <span class="summary-value">{{ payment.expiryDate }}</span>
      </div>

      <div class="summary-row">
        <span class="summary-label">CVV:</span>
        <span class="summary-value">{{ payment.cvv }}</span>
      </div>

      <div class="summary-row">
        <span class="summary-label">Order Total:</span>
        <span class="summary-value">{{ totalPrice }}</span>
      </div>
    </div>

    <button class="print-button" @click="printConfirmation">
      Print Confirmation
    </button>
  </div>
</template>

<script>
export default {
  props: ["customer", "payment", "cart"],
  methods: {
    printConfirmation() {
      window.print();
    },
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((accu, curr) => {
        return accu + curr.product.price * curr.quantity;
      }, 0);
    },
  },
};
</script>

<style scoped>
.order-confirmation {
  max-width: fit-content;
  margin: 0 auto;
  padding: 20px;
}

.order-confirmation h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
.product-list {
  display: flexbox;
}
.order-summary {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.order-summary h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 5px;
}

.summary-label {
  font-weight: bold;
}

.print-button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #428bca;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.print-button:hover {
  background-color: #3071a9;
}
</style>
