<template>
  <span>
      <router-link to="/myPersonalCenter">
        <img :src="userHeads" alt="" style="border-radius:35px;height: 35px;width: 35px;margin-right: 15px;">
        <span style="color: white">{{username}}</span>

      </router-link>
  </span>
</template>

<script>
import {mapGetters, mapState} from "vuex";
export default {
  name: "myHeaderUser",
  computed:{
    /*
    * 	mapState({
        storeName: state => state.name; //对象里可以是你自己定义的属性名，
        //值是一个函数，参数为state，通过返回state里的值来给你自定义的属性赋值
    })*/
    ...mapState({
      username: state => state.userAbout.loginUser
    }),
    // ...mapGetters('userAbout',{
    //   userHeads:'getUserHeads'
    // })
    userHeads(){
      return this.$store.getters["userAbout/getUserHeads"](this.username)
    },
  // ...mapGetters('userAbout',{
  //   userHeads:"test"
  // })
  }
}
</script>

<style scoped>

</style>