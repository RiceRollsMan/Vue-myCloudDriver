<!--路由组件-->
<template>
  <div class="indexPage">
    <div class="loginForm">
      <loginForm></loginForm>
      <br>
      <span style="font-size: 2px">Dont have a account?<router-link to="/MySignup" style="color: blue;cursor:pointer;text-decoration:none">SignUp!</router-link></span>
    </div>
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
.indexPage{
  background-color: skyblue;
  height: 100%;
  weight:99%;
}
.loginForm{
  color:black;
  text-align: center;
  width: 27%;
  height: 35%;
  position: absolute;
  margin-left: 36%;
  margin-top: 12%;
  border-radius: 10px;
  background-color: white;
  border:outset;
}
</style>
