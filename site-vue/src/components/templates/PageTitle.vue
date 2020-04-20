<template>
  <div class="pageTitle">
    <h1>
      <i :class="icon"></i>
      {{title}}
    </h1>
    <h2>{{subTitle}}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    icon: {},
    title: {},
    subTitle: {}
  }
};
</script>

<style>
.pageTitle h1 {
  margin: 0px;
}
.pageTitle h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>