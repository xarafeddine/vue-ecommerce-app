import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchCategories");
  },
}).$mount("#app");
