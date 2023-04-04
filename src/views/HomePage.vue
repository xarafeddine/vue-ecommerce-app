<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <div class="featured-products">
      <h2>Featured Products</h2>
      <div class="product-list">
        <CardComponentVue
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <div class="categories">
      <h2>Categories</h2>
      <div class="category-list">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="category"
          @click="$router.push({ name: 'products', query: { category } })"
        >
          <h3>{{ category }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardComponentVue from "@/components/CardComponent.vue";

export default {
  components: {
    CardComponentVue,
  },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapState(["products", "categories"]),
    featuredProducts() {
      const categories = [];
      return this.products.filter((product) => {
        if (!categories.includes(product.category)) {
          categories.push(product.category);
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.user = this.$store.getters.user;
    console.log("homepage", this.user);
    
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  margin: 20px 0px 100px 0px;
}

.featured-products {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin: 20px 0;
}

.product {
  width: 30%;
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

.product span {
  font-weight: bold;
}

.categories {
  width: 100%;
  max-width: 1200px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin: 20px 0;
}

.category {
  cursor: pointer;
  width: 20%;
  text-align: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0px 2px 2px #ccc;
}

.category img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.category h3 {
  font-size: 20px;
  margin: 10px 0;
}

.category p {
  margin: 10px 0;
}
</style>
