<template>
  <div class="article-category">
    <PageTitle icon="fa fa-folder-o" :title="category.name" subTitle="Categoria" />
    <ArticleItem v-for="article in articles" :key="article.id" :article="article" />
    <b-button v-if="loadMore" variant="outline-danger" @click="handleLoadMore">Carregar mais</b-button>
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
      loadMore: false,
      page: 1,
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
        .get(`${categoriesUrl}/${categoryId}/articles?page=${this.page}`)
        .then(res => {
          this.articles = this.articles.concat(res.data);
          this.loadMore = res.data.length > 0;
          this.page += 1;
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
    },
    handleLoadMore() {
      this.loadArticlesByCategory(this.category.id);
    }
  },
  watch: {
    $route(to) {
      this.page = 1;
      this.articles = [];
      this.load(to.params.id);
    }
  },
  mounted() {
    this.load(this.$route.params.id);
  }
};
</script>

<style>
.article-category {
  display: flex;
  flex-direction: column;
}

.article-category > button {
  align-self: center;
}
</style>