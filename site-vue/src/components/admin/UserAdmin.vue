<template>
  <div class="user-admin">
    <b-form>
      <b-row>
        <b-col col md="6" sm="12">
          <b-form-group label="Nome: " label-for="user-name">
            <b-form-input
              id="user-name"
              required
              placeholder="Informe o Nome do Usuário..."
              v-model="user.name"
              :readonly="isRemoving"
            />
          </b-form-group>
        </b-col>
        <b-col col md="6" sm="12">
          <b-form-group label-for="user-email" label="E-mail:">
            <b-form-input
              id="user-email"
              type="email"
              v-model="user.email"
              placeholder="Informe o E-mail do Usuário..."
              :readonly="isRemoving"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-checkbox
            class="mt-3 mb-3"
            v-model="user.admin"
            value="true"
            unchecked-value="false"
            :disabled="isRemoving"
          >Administrador?</b-form-checkbox>
        </b-col>
      </b-row>

      <b-row>
        <b-col col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              placeholder="Informe a Senha do Usuário..."
              :readonly="isRemoving"
            />
          </b-form-group>
        </b-col>
        <b-col col md="6" sm="12">
          <b-form-group label="Confirmação de Senha:" label-for="user-passwordConfirm">
            <b-form-input
              id="user-passwordConfirm"
              type="password"
              v-model="user.passwordConfirm"
              placeholder="Confirme a Senha do Usuário..."
              :readonly="isRemoving"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-button v-if="!isRemoving" variant="primary" @click="save()">Salvar</b-button>
          <b-button v-else variant="danger" @click="remove()">Excluir</b-button>
          <b-button class="ml-2" @click="clear()">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table striped hover :fields="fields" :items="users">
      <template v-slot:cell(actions)="row">
        <b-button class="mr-2" variant="warning" @click="loadUser(row.item)">
          <i class="fa fa-pencil"></i>
        </b-button>

        <b-button variant="danger" @click="loadUser(row.item, true)">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { usersUrl, showError } from "@/global";

export default {
  data() {
    return {
      isRemoving: false,
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadUsers() {
      axios
        .get(usersUrl)
        .then(res => {
          this.users = res.data;
        })
        .catch(showError);
    },
    loadUser(user, isRemoving) {
      this.isRemoving = isRemoving;
      this.user = { ...user };
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `${this.user.id}` : ``;
      axios[method](`${usersUrl}/${id}`, this.user)
        .then(() => {
          this.clear();
          this.loadUsers();
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
    remove() {
      axios
        .delete(`${usersUrl}/${this.user.id}`)
        .then(() => {
          this.clear();
          this.loadUsers();
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
    clear() {
      this.isRemoving = false;
      this.user = {};
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>