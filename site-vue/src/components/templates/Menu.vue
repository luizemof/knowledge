<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder="Digite para filtrar..." v-model="treeFilter" />
    </div>
    <Tree
      :data="treeData"
      @node:selected="onNodeSelected"
      :options="treeOptions"
      :filter="treeFilter"
    />
  </aside>
</template>

<script>
import { categoriesUrl } from "@/global";
import { mapState } from "vuex";
import Tree from "liquor-tree";
import axios from "axios";

export default {
  name: "Menu",
  components: { Tree },
  data() {
    return {
      treeFilter: "",
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: {
          text: "name"
        }
      }
    };
  },
  methods: {
    getTreeData() {
      return axios.get(`${categoriesUrl}/tree`).then(res => res.data);
    },
    onNodeSelected(node) {
      this.$router.push(`/categories/${node.id}/articles`);
    }
  },
  computed: mapState(["isMenuVisible"])
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232426, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu-filter > input {
  border: none;
  background: inherit;
  margin-left: 10px;
}

.menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.tree-node > .tree-content:hover,
.tree-node.selected > .tree-content {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.tree-arrow.has-child:after,
.tree-arrow.has-child {
  border-color: #fff !important;
}
.menu .tree-anchor {
  color: #fff !important;
}
</style>