<template>
<div>
  <button @click="goTest2()">gotest2</button>
  <button @click="goShowFiles()">goShowFiles</button>
  <button @click="goShowFiles2()">goShowFiles2</button>
  <button @click="goShowFiles3()">goShowFiles3</button>
  <button @click="goShowFiles4()">goShowFiles4</button>
  <button @click="goUpLoadFile()">goUpLoadFile</button>
  <button @click="goBin()">goBin</button>
  <div style="margin:5px; float:left">
    <input v-model="key" placeholder="请输入关键字" name="test" clearable style="width: 200px"/>
    <button type="primary"  style="margin-left:6px; float:right" @click="send()" >发送</button>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: "test1",
  data(){
    return {
      key:'',
    }
  },
  methods: {
    goTest2() {
      this.$router.push("/test2")
    },
    goShowFiles(){
      this.$router.push("/showFiles")
    },
    goShowFiles2(){
      this.$router.push("/showFiles2")
    },
    goShowFiles3(){
      this.$router.push("/showFiles3")
    },
    goShowFiles4(){
      this.$router.push("/showFiles4")
    },
    goUpLoadFile(){
      this.$router.push("/upLoadFile")
    },

    goBin(){
      this.$router.push("/Bin")
    },
    send(){
      axios.get('http://localhost:8082/vueTest',{
      params:{
        key:this.key
      }})
          .then(function (resp) {
        console.log(resp.data);
      })
    }
  }

}
</script>

<style scoped>

</style>