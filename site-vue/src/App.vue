<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header title="Cod3r - Base de Conhecimento" />
    <Menu v-if="isMenuVisible" />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/templates/Header";
import Menu from "./components/templates/Menu";
import Content from "./components/templates/Content";
import Footer from "./components/templates/Footer";
import { userKey, baseUrl } from "@/global";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  methods: {
    async validateToken() {
      const userData = localStorage.getItem(userKey);
      if (!userData) {
        this.$store.commit("setUser", null);
        return;
      }

      const user = JSON.parse(userData);

      const res = await axios.post(`${baseUrl}/validateToken`, {
        token: user.token
      });

      if (res.data) {
        this.$store.commit("setUser", user);
        this.$router.push({ path: "/" });
      } else {
        this.$store.commit("setUser", null);
        this.$router.push({ path: "/auth" });
      }
    }
  },
  computed: mapState(["isMenuVisible"]),
  created() {
    this.validateToken();
  }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>