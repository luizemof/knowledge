<template>
  <div class="article-admin">
    <b-form>
      <b-form-group label="Nome:" label-for="article-name">
        <b-form-input
          id="article-name"
          v-model="article.name"
          placeholder="Informe o Nome do Artigo..."
          :readonly="isRemoving"
        />
      </b-form-group>

      <b-form-group label="Descrição:" label-for="article-description">
        <b-form-input
          id="article-description"
          v-model="article.description"
          placeholder="Informe a Descriçào do Artigo..."
          :readonly="isRemoving"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Imagem (URL):" label-for="article.imageUrl">
        <b-form-input
          id="article.imageUrl"
          v-model="article.imageUrl"
          placeholder="Informe a URL da Imagem..."
          :readonly="isRemoving"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Categoria:" label-for="article-categoryId">
        <b-form-select
          id="article-categoryId"
          :options="categories"
          v-model="article.categoryId"
          :disabled="isRemoving"
        />
      </b-form-group>

      <b-form-group label="Autor:" label-for="article-userId">
        <b-form-select
          id="article-userId"
          :options="users"
          v-model="article.userId"
          :disabled="isRemoving"
        />
      </b-form-group>

      <b-form-group label="Conteúdo:" v-if="!isRemoving">
        <VueEditor
          v-model="article.content"
          placeholder="Informe o Conteúdo do Artigo..."
          :disabled="isRemoving"
        ></VueEditor>
      </b-form-group>

      <SaveRemoveButtons :isSaveMode="!isRemoving" :save="save" :remove="remove" :cancel="clear" />
    </b-form>
    <hr />
    <b-table
      id="articles-table"
      hover
      striped
      :items="articles"
      :fields="fields"
    >
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" class="mr-2" @click="loadArticle(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, true)">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="limit"
      aria-controls="articles-table"
    ></b-pagination>
  </div>
</template>

<script>
import axios from "axios";
import { categoriesUrl, usersUrl, articlesUrl, showError } from "@/global";
import { VueEditor } from "vue2-editor";
import SaveRemoveButtons from "../../components/templates/SaveRemoveButtons";

export default {
  components: { VueEditor, SaveRemoveButtons },
  data() {
    return {
      currentPage: 1,
      limit: 0,
      totalRows: 0,
      isRemoving: false,
      article: {},
      articles: [],
      categories: [],
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `${this.article.id}` : "";
      axios[method](`${articlesUrl}/${id}`, this.article)
        .then(() => {
          this.clear();
          this.loadArticles();
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
    remove() {
      if (this.article) {
        axios
          .delete(`${articlesUrl}/${this.article.id}`)
          .then(() => {
            this.clear();
            this.loadArticles();
            this.$toasted.global.defaultSuccess();
          })
          .catch(showError);
      }
    },
    clear() {
      this.isRemoving = false;
      this.article = {};
    },
    loadCategories() {
      axios
        .get(`${categoriesUrl}`)
        .then(res => {
          this.categories = res.data.map(category => {
            return {
              ...category,
              text: category.name,
              value: category.id
            };
          });
        })
        .catch(showError);
    },
    loadUsers() {
      axios
        .get(`${usersUrl}`)
        .then(res => {
          this.users = res.data.map(user => {
            return {
              ...user,
              text: user.name,
              value: user.id
            };
          });
        })
        .catch(showError);
    },
    loadArticles() {
      axios
        .get(`${articlesUrl}?page=${this.currentPage}`)
        .then(res => {
          this.articles = res.data.data;
          this.limit = res.data.limit;
          this.totalRows = res.data.count;
        })
        .catch(showError);
    },
    loadArticle(article, isRemoving = false) {
      this.isRemoving = isRemoving;
      axios
        .get(`${articlesUrl}/${article.id}`)
        .then(res => {
          this.article = res.data;
        })
        .catch(showError);
    }
  },
  watch: {
    currentPage() {
      this.loadArticles();
    }
  },
  mounted() {
    this.loadCategories();
    this.loadUsers();
    this.loadArticles();
  }
};
</script>

<style>
</style>