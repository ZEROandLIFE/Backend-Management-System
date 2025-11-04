<template>
  <div>
    <h1>这是首页</h1>
   <MyButton/>
   <MyButton></MyButton>
  </div>
</template>

<script setup lang="ts" name="App">

  import request from "./utils/request.ts";
import { onMounted } from "vue";


  onMounted(() => {
    request({
      url: "/user/login",
      method: "post",
      data: {
        username: "guest",
        password: "guest123",
      },
    }).then(res => {
      console.log(res);
      
    });
  });

</script>

<style scoped lang="scss">
  div {
    h1 {
      font-size: 40px;
      color: $redcolor;
    }
  }
</style>
