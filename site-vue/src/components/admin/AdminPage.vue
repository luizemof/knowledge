<template>
  <div class="admin-page">
    <PageTitle icon="fa fa-cogs" title=" Administração do Sistema" subTitle="Cadastros & Cia" />
    <div class="tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Artigos" active>
              <ArticleAdmin />
          </b-tab>
          <b-tab title="Categorias">
            <CategoryAdmin />
          </b-tab>
          <b-tab title="Usuários">
              <UserAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../templates/PageTitle"
import CategoryAdmin from './CategoryAdmin'
import ArticleAdmin from './ArticleAdmin'
import UserAdmin from './UserAdmin'
export default {
  name: "AdminPage",
  components: { PageTitle, CategoryAdmin, ArticleAdmin, UserAdmin }
};
</script>

<style>
</style>