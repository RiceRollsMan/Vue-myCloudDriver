<template>
<div>
  this is show files
  <input type="text" v-model="presentPath" placeholder="父路径">
  <p><button @click="getFiles()">查看</button></p>
<table>
  <tr v-for="yunFile in yunFiles">
    <td v-if="yunFile.isDir==0">是文件</td>
    <td v-if="yunFile.isDir==1">是文件夹</td>
    <td v-if="yunFile.isDir==0">
      <button @click="">下载</button>
    </td>
    <td v-if="yunFile.isDir==1">
      <button @click="enterFolder(yunFile.id)">进入</button>
    </td>
    <td v-text="yunFile.id"></td>
    <td v-text="yunFile.file_name"></td>
    <button @click="toDownLoadFile(yunFile.id)">下载</button>
  </tr>
</table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "showFiles",
  data(){
    return {
       yunFiles:[
       ],
      presentPath:"I:/myYunStoragePath/ft/",

      file:null,
      folderName:""
      }
    },
  methods:{
    getFiles(){
      const that = this;
      axios.get('http://localhost:8082/toShowFiles',{
        params:{
          folderId:-1,
        }})
          .then(function (resp) {
            that.yunFiles=resp.data
          })
    },
    toDownLoadFile(id){
      axios.get('http://localhost:8082/toDownLoadFile',{
        params:{
          id:id
        }})
          .then(function (resp) {
            console.log(resp)
          }).catch(function () {
        console.log("caonima")
      })
    },
    enterFolder(folderId){
      const that = this;
      axios.get('http://localhost:8082/toShowFiles',{
        params:{
          folderId:folderId
        }})
          .then(function (resp) {
            that.yunFiles=resp.data
          })
    }
  },
  created(){
    this.getFiles()
  }
}
</script>

<style scoped>

</style>