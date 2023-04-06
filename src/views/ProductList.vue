<template>
  <div class="products-list">
    <div class="filters">
      <h2>Filters</h2>
      <div class="filter-group">
        <label>Category:</label>
        <select v-model="selectedCategory">
          <option value="">All</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label>Price:</label>
        <select v-model="selectedPrice">
          <option value="">All</option>
          <option value="under-50">$50 or less</option>
          <option value="50-100">$50 - $100</option>
          <option value="over-100">$100 or more</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Rating:</label>
        <select v-model="selectedRating">
          <option value="">All</option>
          <option value="4">4 stars or more</option>
          <option value="3">3 stars or more</option>
          <option value="2">2 stars or more</option>
          <option value="1">1 star or more</option>
        </select>
      </div>
    </div>
    <div class="products">
      <h2>Products</h2>
      <div v-if="filteredProducts.length !== 0" class="product-list">
        <CardComponentVue
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <p v-else>empty</p>
    </div>
  </div>
</template>

<script>
import CardComponentVue from "@/components/CardComponent.vue";
import { mapState } from "vuex";

export default {
  props: ["category"],
  components: {
    CardComponentVue,
  },
  data() {
    return {
      selectedCategory: this.$route.query.category || "",
      selectedPrice: "",
      selectedRating: "",
    };
  },
  computed: {
    ...mapState(["products", "categories"]),

    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory !== "")
        filtered = filtered.filter(
          (product) => product.category === this.selectedCategory
        );

      if (this.selectedPrice !== "") {
        if (this.selectedPrice === "under-50") {
          filtered = filtered.filter(
            (product) => parseFloat(product.price) <= 50
          );
        } else if (this.selectedPrice === "50-100") {
          filtered = filtered.filter(
            (product) =>
              parseFloat(product.price) > 50 && parseFloat(product.price) <= 100
          );
        } else if (this.selectedPrice === "over-100") {
          filtered = filtered.filter(
            (product) => parseFloat(product.price) > 100
          );
        }
      }

      if (this.selectedRating !== "") {
        filtered = filtered.filter((product) => {
          const rating = product.rating.rate;
          return rating >= this.selectedRating;
        });
      }

      return filtered;
    },
  },
};
</script>

<style scoped>
.products-list {
  display: flex;
  flex-wrap: row;
  justify-content: space-between;
  padding: 50px 0px;
  gap: 100px;
  margin-bottom: 20px;
}

.filters {
  width: 25%;
  padding: 30px;
}

.filter-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
}

.filter-group label {
  margin-right: 10px;
}

.products {
  width: 70%;
}

.product-list {
  padding: 50px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 1000px) {
  .product-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 650px) {
  .products-list {
    flex-direction: column;
    align-items: center;
  }
}
</style>
