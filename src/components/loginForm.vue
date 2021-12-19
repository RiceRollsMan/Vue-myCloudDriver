<!--路由组件-->
<template>
  <form >
    <input type="text" v-model="username"><br>
    <input type="text" v-model="password"><br>
    <button @click="formLogin">登录</button>
  </form>
</template>

<script>
/*引入vuex用的这些*/
import {mapActions,mapMutations,mapState,mapGetters} from 'vuex'
export default {
  name: "loginForm",
  data(){
    return{
      username:"RiceRollsMan",
      password:"fkyourdogss22"
    }
  },
  methods:{
    formLogin(){
      this.login({username:this.username,password:this.password})
      /*如果登录成功*/
      if(this.$store.state.userAbout.loginCorrect==true){
          this.$router.push('/myMain')
      }
      else{
        alert("密码或用户名错误")
      }
    },
    /*登录功能*/
    ...mapActions('userAbout',{login: 'login'})
  }
}
</script>

<style scoped>

</style>