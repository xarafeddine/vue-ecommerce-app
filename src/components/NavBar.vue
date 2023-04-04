<template>
  <div>
    <p data-item="Store">Store</p>

    <section>
      <div>facke products examples, store:</div>
      <nav>
        <ul class="menuItems">
          <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
          </li>

          <li>
            <router-link :to="{ name: 'products' }">Products</router-link>
          </li>
          <li v-for="item in menuItems" :key="item.id">
            <router-link :to="{ name: item.name }">{{
              item.title
            }}</router-link>
          </li>

          <li v-if="userIsAuthenticated" @click="onLogout">
            <router-link to="/" style="cursor: pointer">Logout</router-link>
          </li>
        </ul>
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isNavOpen: false,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { id: 2, title: "Login", name: "login" },
        { id: 1, title: "Signup", name: "signup" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            id: 3,
            title: "Cart",
            name: "cart",
          },
          { id: 5, title: "Profile", name: "profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
div {
  color: #727272;
  text-align: center;
}

p {
  margin: 16px;
  font-size: 96px;
  color: #ccc;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 1s ease-in-out;
  position: relative;
}
p::before {
  content: attr(data-item);
  transition: all 1s ease-in-out;
  color: #8254ff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 0;
  overflow: hidden;
}
p:hover::before {
  width: 100%;
}

nav {
  margin: 25px;
  background: #f9f9f9;
  padding: 16px;
}
nav .menuItems {
  list-style: none;
  display: flex;
}
nav .menuItems li {
  margin: 50px;
}
nav .menuItems li a {
  text-decoration: none;
  color: #8f8f8f;
  font-size: 24px;
  font-weight: 400;
  transition: all 0.5s ease-in-out;
  position: relative;
  text-transform: uppercase;
}
nav .menuItems li a::before {
  content: attr(data-item);
  transition: 0.5s;
  color: #8254ff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 0;
  overflow: hidden;
}
nav .menuItems li a:hover::before {
  width: 100%;
  transition: all 0.5s ease-in-out;
}
</style>
