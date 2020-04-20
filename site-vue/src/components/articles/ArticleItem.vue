<template>
  <div class="article-item">
    <router-link :to="{name: 'Article', params: {id: article.id}}">
      <div class="article-item-image">
        <img v-if="article.imageUrl" :src="article.imageUrl" height="150" width="150" alt="Article" />
        <img v-else src="@/assets/img/article.png" height="150" width="150" alt="Article" />
      </div>
      <div class="article-item-info">
        <h2>{{article.name}}</h2>
        <p>{{article.description}}</p>
        <span class="article-item-info-author">
          <strong>Autor:</strong>
          {{article.author}}
        </span>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "ArticleItem",
  props: ["article"]
};
</script>

<style>
.article-item {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
}

.article-item > a {
  display: flex;
  text-decoration: none;
  color: #000;
}

.article-item-image {
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #aaa;
}

.article-item-image > img {
  border-radius: 5px;
}

.article-item-info {
  display: flex;
  flex-direction: column;
}

.article-item-info > p {
  font-size: 1.1rem;
  color: #555;
  flex: 1;
}

h2 {
  font-size: 1.7rem;
}
</style>