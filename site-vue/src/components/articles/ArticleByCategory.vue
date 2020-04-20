<template>
  <div class="article-category">
    <PageTitle icon="fa fa-folder-o" :title="category.name" subTitle="Categoria" />
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script>
import PageTitle from "../templates/PageTitle";
import ArticleItem from "./ArticleItem";
import axios from "axios";
import { categoriesUrl, showError } from "@/global";

export default {
  components: { PageTitle, ArticleItem },
  data() {
    return {
      category: {},
      articles: []
    };
  },
  methods: {
    load(categoryId) {
      this.loadArticlesByCategory(categoryId);
      this.loadCategory(categoryId);
    },
    loadArticlesByCategory(categoryId) {
      axios
        .get(`${categoriesUrl}/${categoryId}/articles`)
        .then(res => {
          this.articles = res.data;
        })
        .catch(showError);
    },
    loadCategory(categoryId) {
      axios
        .get(`${categoriesUrl}/${categoryId}`)
        .then(res => {
          this.category = res.data;
        })
        .catch(showError);
    }
  },
  watch: {
    $route(to) {
      this.load(to.params.id);
    }
  },
  mounted() {
    this.load(this.$route.params.id);
  }
};
</script>

<style>
</style>