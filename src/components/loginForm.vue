<!--路由组件-->
<template>
  <form @submit.prevent="formLogin">
    <input :class="usernameStyle" type="text" v-model="username" placeholder="请输入用户名" required="required" ><br>
    <input :class="passwordStyle" type="password" v-model="password" placeholder="请输入密码" required="required" ><br>
    <label for="remPassword"><input :class="remPasswordStyle" id="remPassword" type="checkbox" :checked="remOrNotRemPassword"  @click="toRemPassword()">记住密码</label> <br>
    <button type="submit" :class="loginStyle">登录</button>
  </form>
</template>

<script>
/*引入vuex用的这些*/
import {mapActions,mapMutations,mapState,mapGetters} from 'vuex'
export default {
  name: "loginForm",
  data(){
    return{
      /*获取到初始的账号密码，看看是否是从那边退出的*/
      username:"",
      // username:"RiceRollsMan",
      password:"",
      // password:"fkyourdogss22",
      remOrNotRemPassword:false,
      /*输入框*/
      usernameStyle:"inputUsername",
      passwordStyle:"inputPassword",
      remPasswordStyle:"checkboxRemPassword",
      loginStyle:"buttonLogin"
    }
  },
  computed:{
    /*获取到初始的账号密码*/
    ...mapState('userAbout',{
      initUsername:"loginUser",
      initPassword:"remPassword",
      initRemPasswordState:"remPasswordState"
    })
  },
  methods:{
    /*是否记住密码*/
    toRemPassword(){
      this.remOrNotRemPassword=!this.remOrNotRemPassword
      this.changeRemPasswordState(this.remOrNotRemPassword)
    },
    /*是否记住密码状态位*/
    ...mapActions('userAbout',{
      changeRemPasswordState:'changeRemPasswordState'
    }),
    formLogin(){
      // alert(this.remOrNotRemPassword)
      this.login({username:this.username,password:this.password})
      /*如果登录成功*/
      if(this.$store.state.userAbout.loginCorrect==true){
        /*是否记住密码*/
        if(this.remOrNotRemPassword==true){
          /*把密码写进去*/
          this.remPassword(this.password)
        }

        /*跳转路由*/
          this.$router.push('/myMain')
      }
      else{
        alert("密码或用户名错误")
      }
    },
    /*登录功能*/
    ...mapActions('userAbout',{login: 'login'}),
    ...mapActions('userAbout',{remPassword:'remPassword'})
  },
  mounted() {
    this.username=this.initUsername
    this.remOrNotRemPassword=this.initRemPasswordState
    if(this.remOrNotRemPassword==false)
      this.password=""
    else
      this.password=this.initPassword

  }
}
</script>

<style scoped>
.inputUsername{
  height: 30px;
  font-size: 20px;
  width: 180px;
  margin-top: 12%;
  text-align: center;
  border:none;
  border-bottom: 2px black solid
}
.inputPassword{
  height: 28px;
  font-size: 20px;
  width: 180px;
  margin-top: 5%;
  text-align: center;
  border:none;
  border-bottom: 2px black solid
}
.checkboxRemPassword{

}
.buttonLogin{
  height: 30px;
  width: 180px;
  border:0;
  border-radius:15px;
  font-weight:700;
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  cursor:pointer
}

</style>