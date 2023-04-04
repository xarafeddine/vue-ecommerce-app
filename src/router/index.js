import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage";
import ProductList from "../views/ProductList";
import ProductDetails from "../views/ProductDetails";
import CheckoutPage from "../views/CheckoutPage";
import CartPage from "../views/CartPage";
import OrderConfirmation from "../views/OrderConfirmation";
import NotFound from "../components/NotFound";
import LogIn from "../views/LogIn";
import SignUp from "../views/SignUp";
import ProfilePage from "../views/ProfilePage";
import store from "../store";
Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  console.log("authgard", store.getters.user);
  if (store.getters.user) {
    next();
  } else {
    next("/login");
  }
};

const noAuthGuard = (to, from, next) => {
  console.log("noauthgard", store.state.user);
  if (store.state.user === null) {
    next();
  } else {
    next("/");
  }
};
const routes = [
  {
    path: "*",
    component: NotFound,
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/products",
    name: "products",
    component: ProductList,
    props: true,
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetails,
    props: true,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    beforeEnter: authGuard,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
    beforeEnter: authGuard,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage,
    props: true,
    beforeEnter: authGuard,
  },
  {
    path: "/confirmation",
    name: "confirmation",
    component: OrderConfirmation,
    props: true,
    beforeEnter: authGuard,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
    beforeEnter: noAuthGuard,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    beforeEnter: noAuthGuard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
