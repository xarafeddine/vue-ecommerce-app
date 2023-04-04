<template>
  <div id="app">
    <NavBar />
    <div class="main">
      <router-view />
    </div>
    <footer-element />
  </div>
</template>
<script>
/* eslint-disable */
import NavBar from "@/components/NavBar.vue";
import FooterElement from "./components/FooterElement.vue";
import ProductDetails from "./views/ProductDetails.vue";
export default {
  components: {
    NavBar,
    FooterElement,
    ProductDetails,
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  font-family: Hack, monospace;
}
.main {
  margin-bottom: 100px;
}
</style>
