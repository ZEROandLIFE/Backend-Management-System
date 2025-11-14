<template>
  <div class="outbox">
    <div class="header">
      <span>
        {{ props.headname }}
      </span>
      <div class="pic"></div>
    </div>
    <div class="main">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="Box">
  // import { ref } from 'vue'
  const props = defineProps<{ headname: string }>();
</script>

<style scoped lang="scss">
  .outbox {
    height: 100%;
    width: 100%;
    background: url("./images/dataScreen-main-rt.png") no-repeat;
    display: flex;
    flex-direction: column;
    background-size: cover;

    .header {
      color: white;
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      span {
        font: 16px;
        margin-bottom: 10px;
      }
      .pic {
        background: url("./images/dataScreen-title.png") no-repeat;
        height: 10px;
        width: 100px;
      }
    }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column; 
    //   align-items: center;
    //   justify-content: center;
    }
  }
</style>
