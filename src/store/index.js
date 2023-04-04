import Vue from "vue";
import Vuex from "vuex";
import StoreService from "@/services/StoreService";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import UserService from "@/services/UserService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    user: null,
    loading: false,
    error: null,
    cart: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, user) {
      state.user = user;
      updateProducts(state);
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async autoSignIn({ commit, getters }, payload) {
      const { data } = await UserService.getUser(payload.uid);
      commit("setUser", data);
      console.log("autoSignIn", getters.user);
    },

    fetchProducts({ commit }) {
      commit("setLoading", true);
      StoreService.getProducts()
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error.message);
          commit("setLoading", false);
        });
    },

    fetchCategories({ commit }) {
      commit("setLoading", true);

      StoreService.getCategories()
        .then((response) => {
          commit("SET_CATEGORIES", response.data);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error.message);
          commit("setLoading", false);
        });
    },

    // user actions

    async signup({ commit }, { email, password, username }) {
      commit("setLoading", true);

      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        commit("setLoading", false);
        const newUser = {
          id: response.user.uid,
          username,
          email,
          cart: [],
        };

        UserService.addUser(newUser).then((res) => {
          commit("setUser", res.data);
          // console.log("usercreated", res.data);
        });
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error);
      }
    },

    async login({ commit }, { email, password }) {
      commit("setLoading", true);

      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        commit("setLoading", false);
        // console.log("authuserloged in", user);

        const { data } = await UserService.getUser(user.uid);
        // console.log("user logdin", data);

        commit("setUser", data);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      }
    },

    async updateCart({ commit, state }, cart) {
      const newUser = { ...state.user, cart };
      UserService.updateUser(state.user.id, newUser).then(() => {
        commit("setUser", newUser);
      });
    },
    async logout(context) {
      await signOut(auth);

      context.commit("setUser", null);
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});

function updateProducts(state) {
  const isInCart = (prodId) => {
    const item = state.user.cart.find((item) => item.productId == prodId);
    if (item) return true;
    return false;
  };
  const products = state.products.map((prod) => ({
    ...prod,
    isInCart: isInCart(prod.id),
  }));
  state.products = products;
}
