<template>
<div style="text-align: center;width: 30%;margin-top: 5%;margin-left: 30%">
  <form @submit.prevent="formSignup" style="text-align: left;border: 2px springgreen solid;height: 600px">
    用户名 <br><input type="text" v-model.lazy="username" @change="checkUsername" required="required">
    <span v-if="checkUsernameExist()==false" style="font-size: 2px;color: blue">用户名已存在</span>
    <br>
    <span v-if="checkUsername()==false" style="font-size: 2px;text-align: left">用户名应由4到16位（字母，数字，下划线，减号）组成</span><br>
    密码 <br><input type="password" v-model.lazy="password" @change="checkPassword" required="required"><br>
    <span v-if="checkPassword()==false" style="font-size: 2px;text-align: left">密码应由8到16位（字母，数字，下划线，减号）组成</span><br>
    确认密码 <br><input type="password" v-model.lazy="confirmPassword" @change="checkConfirmPassword" required="required"><br>
    <span v-if="checkConfirmPassword()==false" style="font-size: 2px;text-align: left">与密码不一致</span><br>
    性别 <br><input  type="radio" value="1" name="gender" v-model="gender" required="required">男
    <input type="radio" value="0" name="gender" v-model="gender" required="required">女<br>
    邮箱 <br><input type="email" v-model.lazy="email" required="required"><br>
    介绍 <br><textarea name="userIntroduction" id="" cols="30" rows="10" v-model.lazy="introduction"></textarea><br>
    <button  type="submit" v-if="checkCanSignUp()" >注册</button>
    <button  type="submit" v-if="checkCanSignUp()==false" disabled="disabled">提交</button>
<!--    <button  @click.prevent="show">点我展示属性</button>-->
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
      introduction:"",
      /**/
      usernameState:false,
      usernameExistState:false,
      passwordState:false,
      confirmPasswordState:false,

    }
  },
  methods:{
    // show(){
    //   console.log(this)
    // },
    formSignup(){
      /*注册传参*/
      this.signup({
        username:this.username,
        password:this.password,
        gender:this.gender,
        email:this.email,
        userIntroduction:this.introduction,
      })
      // /*检查是否添加成功了*/
      // console.log(this.$store.state.userAbout.users)
      /*先执行登录操作*/
      this.login({username:this.username,password:this.password})
      /*跳转进入主页面*/
      this.$router.push('/myMain')
    },
    ...mapActions('userAbout',{
      signup:"signup"
    }),
    ...mapActions('userAbout',{login: 'login'}),
    /* 用户名正则，4到16位（字母，数字，下划线，减号）
       let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
       uPattern.test(username)==true
  */
    checkUsername(){
      let uPattern=/^[a-zA-Z0-9_-]{4,16}$/
      this.usernameState = uPattern.test(this.username)
      return uPattern.test(this.username)
    },
    /*检验username是否已经存在*/
    checkUsernameExist(){
      /*存在返回false，不存在返回true*/
      this.usernameExistState=this.$store.getters["userAbout/getUsernameExist"](this.username)
      return this.$store.getters["userAbout/getUsernameExist"](this.username)
    },
    /*//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    let pPattern = /^[a-zA-Z0-9_-]{8,16}$/;*/
    checkPassword(){
      let pPattern = /^[a-zA-Z0-9_-]{8,16}$/
      this.passwordState = pPattern.test(this.password)
      return pPattern.test(this.password)
    },
    /*检验输入确认密码时是否一致*/
    checkConfirmPassword(){
      this.confirmPasswordState =  this.confirmPassword==this.password
      return this.confirmPassword==this.password
    },
    /*看看是否能注册了*/
    checkCanSignUp() {
      return this.usernameState && this.confirmPassword && this.confirmPasswordState&&this.usernameExistState
    }
  }
}
</script>
<class></class>