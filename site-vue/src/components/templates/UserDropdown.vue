<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>

    <div class="user-dropdown-content">
      <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-cogs">Administração</i>
      </router-link>
      <a href="/" @click.prevent="logout">
        <i class="fa fa-sign-out">Sair</i>
      </a>
    </div>
  </div>
</template>

<script>
import Gravatar from "vue-gravatar";
import { mapState } from 'vuex';

export default {
  name: "UserDropDown",
  components: { Gravatar },
  computed:mapState({
    user: state => state.user
  }),
  methods: {
    logout() {
      this.$store.commit('setUser', null)
      this.$router.push({path: '/auth'})
    }
  }
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  padding: 0px 20px;
  height: 100%;
}

.user-button:hover {
  background: #0002;
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

img {
  vertical-align: middle;
  border-style: none;
}

.user-dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 170px;
  right: 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transition: visibility 0s, opacity 0.5s linear;
  opacity: 0;
  visibility: hidden;
}

.user-dropdown-content a {
  padding: 10px;
  color: #000;
  text-decoration: none;
}

.user-dropdown-content a:hover {
  background-color: #ededed;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}
</style>