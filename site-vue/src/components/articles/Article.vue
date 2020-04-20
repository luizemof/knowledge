<template>
  <div>
    <PageTitle :title="article.name" :subTitle="article.description" icon="fa fa-file-o" />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import PageTitle from "../templates/PageTitle";
import { showError, articlesUrl } from "@/global";
import axios from "axios";
export default {
  name: "Article",
  components: { PageTitle },
  data() {
    return {
      article: {}
    };
  },
  methods: {
    loadArticle(id) {
      axios
        .get(`${articlesUrl}/${id}`)
        .then(res => {
          this.article = res.data;
        })
        .catch(showError);
    }
  },
  mounted() {
    this.loadArticle(this.$route.params.id);
  }
};
</script>
<style>
.article-content {
    background-color: #FFF;
    border-radius: 8px;
    padding: 25px;
}
</style>