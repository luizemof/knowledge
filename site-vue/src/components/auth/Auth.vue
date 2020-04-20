<template>
  <div class="auth">
    <div class="auth-content">
      <img src="@/assets/img/logo.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title">{{ isRegister ? 'Cadastro' : 'Login'}}</div>

      <b-form-input v-if="isRegister" v-model="user.name" placeholder="Nome"></b-form-input>
      <b-form-input v-model="user.email" type="email" placeholder="E-mail"></b-form-input>
      <b-form-input v-model="user.password" type="password" placeholder="Senha"></b-form-input>
      <b-form-input
        v-if="isRegister"
        v-model="user.passwordConfirm"
        placeholder="Confirme a senha"
        type="password"
      ></b-form-input>
      <b-button v-if="isRegister" variant="primary" @click="signup">Registrar</b-button>
      <b-button v-else variant="primary" @click="signin">Entrar</b-button>

      <a
        style="margin-top:35px"
        @click.prevent="isRegister = !isRegister"
        href
      >{{ isRegister ? 'Já tem cadastro? Acesse o Login!' : 'Não tem cadastro? Registre-se aqui!'}}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl, showError } from "@/global";
export default {
  data() {
    return {
      user: {},
      isRegister: false
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseUrl}/signup`, this.user)
        .then(() => {
          this.isRegister = false;
          this.user = {};
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    }
  }
};
</script>

<style>
.auth {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-content {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  width: 350px;
  padding: 35px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-content > hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}

.auth-content > input {
  margin-bottom: 10px;
}

.auth-content > button {
  align-self: flex-end;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.login-content {
  display: flex;
  flex-direction: column;
}
</style>