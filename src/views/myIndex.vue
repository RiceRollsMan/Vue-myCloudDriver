<!--路由组件-->
<template>
  <div>
    <loginForm></loginForm>
    <br>
    <router-link to="/MySignup">点我注册</router-link>
  </div>
</template>
<script>
import loginForm from "../components/loginForm";
/*引入登录表单的组件*/
  export default {
    name:"myIndex",
    components:{
      loginForm
    }
  }
</script>
<style>

</style>
