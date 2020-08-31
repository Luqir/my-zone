<template>
  <div>
    <button @click="change">{{buttonName}}</button>
    <div class="xx">测试</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonName: "点击按钮"
    };
  },
  methods: {
    change() {
      console.log(111);
    }
  }
};
</script>
<style scoped>
.xx {
  color: red;
}
</style>