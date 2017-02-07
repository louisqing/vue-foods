<template>
   <div class="split-label">
     <span class="title">{{label}}</span>
   </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .split-label {
    width: 100%;
    height: 24px;
    background: #f3f5f7;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding-left: 10px;
    .title {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77,85,93);
    }
  }
</style>