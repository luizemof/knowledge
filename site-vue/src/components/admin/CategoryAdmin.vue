<template>
  <div>
    <b-form>
      <b-form-group label="Nome:" label-for="name">
        <b-form-input
          id="name"
          v-model="category.name"
          type="text"
          required
          placeholder="Informe o Nome da Categoria..."
          :readonly="isRemoveMode"
        />
      </b-form-group>

      <b-form-group label="Categoria Pai:" label-for="category-parentId">
        <b-form-select
          v-if="!isRemoveMode"
          id="category-parentId"
          :options="categories"
          v-model="category.parentId"
        />
        <b-form-input v-else readonly id="category-parentId" v-model="category.path" />
      </b-form-group>
      <b-button v-if="!isRemoveMode" variant="primary" @click="onSubmit">Salvar</b-button>
      <b-button v-else variant="danger" @click="remove">Excluir</b-button>
      <b-button class="ml-2" variant="secondary" @click="onReset">Cancelar</b-button>
    </b-form>

    <hr />

    <b-table hover striped :items="categories" :fields="fields">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" class="mr-2" @click="loadCategory(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { categoriesUrl, showError } from "@/global";

const remove = "remove";

export default {
  data() {
    return {
      mode: null,
      show: true,
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  computed: {
    isRemoveMode() {
      return this.mode === remove;
    }
  },
  methods: {
    loadCategories() {
      axios
        .get(`${categoriesUrl}`)
        .then(res => {
          this.categories = res.data.map(category => {
            return {
              ...category,
              text: category.path,
              value: category.id
            };
          });
        })
        .catch(showError);
    },
    loadCategory(category, mode) {
      this.category = { ...category };
      this.mode = mode;
    },
    onSubmit() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `${this.category.id}` : ``;
      axios[method](`${categoriesUrl}/${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.onReset();
          this.loadCategories();
        })
        .catch(showError);
    },
    onReset() {
      this.mode = "save";
      this.category = {};
    },
    remove() {
      axios
        .delete(`${categoriesUrl}/${this.category.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.onReset();
          this.loadCategories();
        })
        .catch(showError);
    }
  },
  mounted() {
    this.loadCategories();
  }
};
</script>

<style>
</style>