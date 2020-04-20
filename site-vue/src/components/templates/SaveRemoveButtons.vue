<template>
  <div>
    <b-button v-if="isSaveMode" variant="primary" @click="save">Salvar</b-button>
    <b-button v-else variant="danger" @click="remove">Excluir</b-button>
    <b-button class="ml-2" variant="secondary" @click="cancel">Cancelar</b-button>
  </div>
</template>

<script>
export default {
  name: "SaveRemoveButtons",
  props: {
    isSaveMode: Boolean,
    save: Function,
    remove: Function,
    cancel: Function
  }
};
</script>

<style>
</style>