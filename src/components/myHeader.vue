<template>
  <div :class="headStyle">
    <router-link to="/myMain"><img src="../../public/logo.png" alt="" :class="logoStyle"></router-link>
    <router-link to="/" style="float:right;font-size: 20px"><button style="background-color: black;color: white;height: 40px">退出</button></router-link>
    <myHeaderUser style="float: right"></myHeaderUser>

    <router-link to="/myAdmin"  style="float: right"><button style="background-color: red;height: 40px;color: white;font-size: 25px" v-if="(isAdmin==1)==true">管理员控制台</button></router-link>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import myHeaderUser from "./myHeaderUser";
export default {
  name: "myHeader",
  data(){
    return {
      headStyle:"top",
      logoStyle:"logo",
    }
  },
  computed:{
    ...mapGetters('userAbout',{
      isAdmin:'getIsAdmin'
    })
  },
  components:{
    myHeaderUser
  }

}
</script>

<style scoped>
.top{
  margin: 0px;
  height: 5%;
  justify-content:center;
  vertical-align: middle;
  font-weight: 600;
  width: 99%;
  border:2px solid black;
  position: fixed;
  font-size: 22px;
  z-index: 3;
  background-color: black;
}
.logo{
  width:100px;
  height:35px;
  float: left;
}
</style>