---
isShowComments: false
---

<template>
  <div>
    <exam
      class="pagation"
      :total="10"
      :perPage="2"
      @getCurrentPage="getCurrentPage"
    ></exam>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created() {}
};
</script>
<style scoped>
</style>
