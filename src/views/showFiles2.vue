<!--完成了什么呢，完成了分文件夹展示-->
<template>
  <div>
    this is show files
    <input type="text" v-model="presentPath" placeholder="父路径">
    <p><button @click="getFiles()">查看</button></p>
    <button v-if="haveParent===1">回退</button>
    <table>
      <tr v-for="yunFile in yunFiles">
        <td v-if="yunFile.isDir===0">是文件</td>
        <td v-if="yunFile.isDir===1">是文件夹</td>
        <td v-if="yunFile.isDir===0">
          <button @click="">下载</button>
        </td>
        <td v-if="yunFile.isDir===1">
          <button @click="enterFolder(yunFile.id)">进入</button>
        </td>
        <td v-text="yunFile.id"></td>
        <td v-text="yunFile.file_name"></td>
        <td v-text="yunFile.file_path"></td>
<!--        <button @click="toDownLoadFile(yunFile.id)">下载</button>-->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "showFiles2",
  data(){
    return {
      yunFiles:[],
      presentPath:"I:/myYunStoragePath/ft/",//进来一定默认是这个咯
      parentPath:[],//父路径数组，刚进来的时候默认为0
      // file:null,
      folderName:""
    }
  },
  computed:{
      haveParent(){
        if(this.parentPath.length===0)
          return 0;
        return 1;
      }
  },
  methods: {
    /*进入时执行*/
    getFiles() {
      const that = this;
      axios.get('http://localhost:8082/toShowFiles', {
        params: {
          presentPath: this.presentPath,
        }
      })
          .then(function (resp) {
            that.yunFiles = resp.data
            console.log(that.yunFiles)
          })
    },
    /*进入文件夹时执行*/
    enterFolder(folderId) {
      const that = this;
      that.parentPath.push(that.presentPath);//此时把这个加进去
      axios.get('http://localhost:8082/toGetFolderById', {
        params: {
          folderId: folderId
        }
      })
          .then(function (resp) {
            axios.get('http://localhost:8082/toShowFiles', {
              params: {
                presentPath: resp.data
              }
            })
                .then(function (resp2) {
                  that.yunFiles = resp2.data
                })
          })//这里先找到这个文件夹的路径，再用这个路径去找这个下面的东西。这里有个大坑，就是顺序，所以我才会这样嵌套着写。CNMD

    },
    /*执行下载时执行*/
    toDownLoadFile(id) {
      axios.get('http://localhost:8082/toDownLoadFile', {
        params: {
          id: id
        }
      })
          .then(function (resp) {
            console.log(resp)
          }).catch(function () {
        console.log("caonima")
      })
    },
  },
  created(){
    this.getFiles()
  }
}
</script>

<style scoped>

</style>