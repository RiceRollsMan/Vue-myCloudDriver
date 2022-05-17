<!--完成了什么呢，完成了分文件夹展示+回退功能-->
<template>
  <div>
    this is show files
    <input type="text" v-model="presentPath" placeholder="父路径">
    <p><button @click="getFiles()">查看</button></p>
    <button v-if="haveParent===1" @click="toGoBack()">回退</button>
    <p></p>
    <button @click="toMakeAFolder()">创建一个文件夹</button>
    <input type="text" v-model="newFolderName" placeholder="请输入你想要的文件名">

      <input type="file" >
      <button @click="toUpLoadFile()"> 上传</button>


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
        <td v-text="yunFile.file_type"></td>
        <button @click="toChangeFileName(yunFile.id,yunFile.file_type,'卧槽尼玛的')">重命名为卧槽尼玛的</button>
        <td><button @click="toThrowInBin(yunFile.id)">扔进回收站</button></td>
<!--        <button @click="toDownLoadFile(yunFile.id)">下载</button>-->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "showFiles3",
  data(){
    return {
      yunFiles:[],
      presentPath:"I:/myYunStoragePath/ft/",//进来一定默认是这个咯
      parentPath:[],//父路径数组，刚进来的时候默认为0
      // file:null,
      newFolderName:"",
      newFileName:"",
      uploadFile:null,
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
            that.presentPath=resp.data,
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
    /*点击回退时执行*/
    toGoBack(){
      this.presentPath=this.parentPath.pop();//删除最后一个而且将这个值返回
      this.getFiles()
    },
    /*在执行创建文件夹时执行*/
    toMakeAFolder(){//注意:这里的东西仍然要返回yunFiles 要再执行一次getFiles哦
      const that=this
      axios.get('http://localhost:8082/toMakeAFolder', {
        params: {
          newFolderName:this.newFolderName,
          presentPath:this.presentPath
        }
      }).then(function (res){
        //this.getFiles()//仍然是顺序问题，所以我还是要嵌套着写。
        that.yunFiles=res.data
      })

    },
    /*在执行扔进回收站的时候执行*/
    toThrowInBin(id){
      const that=this
      axios.get('http://localhost:8082/toThrowInBin', {
        params: {
          id:id,
          presentPath:this.presentPath
        }
      }).then(function (res){
        //this.getFiles()//仍然是顺序问题，所以我还是要嵌套着写。
        that.yunFiles=res.data
      })
    },
    /*在修改名字的时候执行*/
    toChangeFileName(id,fileType,newFileName){
      const that=this
      axios.get('http://localhost:8082/toChangeFileName', {
        params: {
          id:id,
          newFileName:newFileName,
          fileType:fileType,
          presentPath:this.presentPath,
        }
      }).then(function (res){
        //this.getFiles()//仍然是顺序问题，所以我还是要嵌套着写。
        that.yunFiles=res.data
      })
    },
    /*在上传文件的时候执行*/
    toUpLoadFile(){
      const that=this
      let formData = new FormData() // 声明一个FormData对象
      formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't defind
      formData.append('uploadFile', document.querySelector('input[type=file]').files[0])
      formData.append('presentPath', this.presentPath)
      const options = {  // 设置axios的参数
        url: 'http://localhost:8082/toUploadFile',
        data: formData,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios(options).then((res) => {that.yunFiles=res.data}) // 发送请求
    }
  },
  created(){
    this.getFiles()
  }
}
</script>

<style scoped>

</style>