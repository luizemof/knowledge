<template>
  <div class="stat">
    <div class="stat-icon">
      <i :class="icon" :style="iconStyle"></i>
    </div>
    <div class="stat-info">
      <span class="stat-title">{{title}}</span>
      <span class="stat-value">{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stat",
  props: {
    title: {},
    icon: {},
    iconStyle: {},
    value: {}
  }
};
</script>

<style>
.stat {
  background-color: #fff;
  padding: 20px;
  display: flex;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  flex: 1;
  align-items: center;
}

.stat-icon i {
    font-size: 5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
}

.stat-title {
    font-size: 1.2rem;
}

.stat-value {
    font-size: 3rem;
}

</style>