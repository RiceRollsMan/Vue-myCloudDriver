<template>
  <div :class="headStyle">
    <router-link to="/myMain"><img src="../../public/logo.png" alt="" :class="logoStyle"></router-link>
    <myHeaderUser></myHeaderUser>
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
  width: 100%;
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