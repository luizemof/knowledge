<template>
  <div class="home">
    <PageTitle title="Dashboard" subTitle="Base de Conhecimento" icon="fa fa-home" />
    <div class="stats">
      <Stat
        icon="fa fa-folder"
        title="Categorias"
        iconStyle="color: rgb(213, 77, 80)"
        :value="stats.categories"
      />
      <Stat
        icon="fa fa-file"
        title="Artigos"
        iconStyle="color: rgb(59, 196, 128)"
        :value="stats.articles"
      />
      <Stat
        icon="fa fa-users"
        title="Usuários"
        iconStyle="color: rgb(50, 130, 205)"
        :value="stats.users"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../templates/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data() {
    return {
      stats: {}
    };
  },
  methods: {
    loadStats() {
      axios
        .get(`${baseUrl}/stats`)
        .then(res => {
          this.stats = res.data;
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.loadStats()
  }
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>