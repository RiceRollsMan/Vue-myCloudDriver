<template>
<div>
  <form>
    用户名：<input type="text" v-model="username"><br>
    密码：<input type="password" v-model="password"><br>
    确认密码：<input type="password" v-model="confirmPassword"><br>
    性别：<input  type="radio" value="1" name="gender" v-model="gender">男
        <input type="radio" value="0" name="gender" v-model="gender">女<br>
    邮箱: <input type="email" v-model="email"><br>
    介绍：<textarea name="userIntroduction" id="" cols="30" rows="10" v-model="introduction"></textarea>
    <button  @click.prevent="formSignup">提交</button>
    <button  @click.prevent="show">点我展示属性</button>
  </form>
</div>
</template>
<script>
import {mapActions,mapState,mapGetters,mapMutations} from "vuex";

export default{
  name:"signupForm",
  data(){
    return{
      username:"",
      password:"",
      confirmPassword:"",
      gender:"",
      email:"",
      introduction:""
    }
  },
  methods:{
    show(){
      console.log(this)
    },
    formSignup(){
      /*注册传参*/
      this.signup({
        username:this.username,
        password:this.password,
        gender:this.gender,
        email:this.email,
        userIntroduction:this.introduction,
      })
      /*检查是否添加成功了*/
      console.log(this.$store.state.userAbout.users)
      /*跳转进入主页面*/
      this.$router.push('/myMain')
    },
    ...mapActions('userAbout',{
      signup:"signup"
    })
  }
}
</script>
<class></class>