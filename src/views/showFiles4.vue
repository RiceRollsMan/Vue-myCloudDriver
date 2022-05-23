<!--完成了什么呢，完成了分文件夹展示+回退功能-->
<template>
  <div>
    <p></p>
    <input type="file" >
    <button @click="toUpLoadFile()"> 上传</button>
    <p></p>
    <button @click="makeAFolder()">创建文件夹</button>
    <input type="text" v-model="newFolderName">
    <p></p>
    <input type="text" v-model="shareCode">
    <button @click="getShareFile()">获取资源</button>
    <p></p>
    <input type="text" v-model="fuzzyQueryFileNameKey">
    <button @click="findFile()">搜索</button>
    <button v-if="haveParent===1" @click="toGoBack()">回退</button>
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
        <td v-text="yunFile.fileName"></td>
        <td v-text="yunFile.filePath"></td>
        <td v-text="yunFile.fileType"></td>
        <td v-text="yunFile.state"></td>
        <td v-if="yunFile.state==1">
          <button @click="deleteFile(yunFile.id)">删除</button>
        </td>
        <td v-if="yunFile.state==0||yunFile.state==2">
          <button @click="restoreFile(yunFile.id)">恢复</button>
          <button @click="deleteForever(yunFile.id)">永久删除</button>
        </td>
        <td>
          <button @click="rename(yunFile.filename,yunFile.id)">重命名</button>
        </td>
        <!--        <button @click="toDownLoadFile(yunFile.id)">下载</button>-->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "showFiles4",
  data() {
    return {
      yunFiles: [],
      presentPath: "",//进来一定默认是这个咯
      parentPath: [],//父路径数组，刚进来的时候默认为0,
      username:"xnm",
      newFolderName: "",
      shareCode:0,
      fuzzyQueryFileNameKey:""
    }
  },
  computed: {
    haveParent() {
      if (this.parentPath.length === 0)
        return 0;
      return 1;
    }
  },
  methods: {
    /*进入时执行*/
    getFiles() {
      const that = this;
      axios.get('http://localhost:8083/toShowFiles', {
        params: {
          presentPath: this.presentPath,
        }
      })
          .then(function (resp) {
            that.yunFiles = resp.data
          })
    },
    /*上传文件*/
    toUpLoadFile(){
      const that=this
      let formData = new FormData() // 声明一个FormData对象
      formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't defind
      formData.append('uploadFile', document.querySelector('input[type=file]').files[0])
      formData.append('presentPath', this.presentPath)
      formData.append('username', this.username)
      const options = {  // 设置axios的参数
        url: 'http://localhost:8083/toUploadFile',
        data: formData,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios(options).then((res) => {that.yunFiles=res.data}) // 发送请求
    },
    /*进入文件夹时执行*/
    enterFolder(folderId) {
      const that = this;
      that.parentPath.push(that.presentPath);//此时把这个加进去
      axios.get('http://localhost:8083/toGetFolderPathById', {
        params: {
          folderId: folderId
        }
      })
          .then(function (resp) {
            that.presentPath=resp.data,
                axios.get('http://localhost:8083/toShowFiles', {
                  params: {
                    presentPath: resp.data
                  }
                })
                    .then(function (resp2) {
                      that.yunFiles = resp2.data
                    })
          })//这里先找到这个文件夹的路径，再用这个路径去找这个下面的东西。这里有个大坑，就是顺序，所以我才会这样嵌套着写。CNMD

    },
    /*创建文件夹时执行*/
    makeAFolder(){
      const that=this
      axios.get('http://localhost:8083/toMakeAFolder', {
        params: {
          newFolderName:this.newFolderName,
          presentPath:this.presentPath,
          username:this.username
        }
      }).then(function (res){
        //this.getFiles()//仍然是顺序问题，所以我还是要嵌套着写。
        that.yunFiles=res.data
      })
    },
    /*回退时执行*/
    toGoBack(){
      this.presentPath=this.parentPath.pop();//删除最后一个而且将这个值返回
      this.getFiles()
    },
    /*获取资源*/
    getShareFile(){
      const that= this
      axios.get('http://localhost:8083/toGetShareFile', {
        params: {
          shareCode:this.shareCode,
          presentPath:this.presentPath,
          username:this.username
        }
      }).then(function (res){
        //this.getFiles()//仍然是顺序问题，所以我还是要嵌套着写。
        that.yunFiles=res.data
      })
    },
    /*创建文件夹*/
    addDir(){
      const that= this
      const file={
        fileName:this.newFolderName,
        userName:this.username,
        filePath:this.presentPath
      }
      console.log(file)
      axios.get('http://localhost:8083/addDir', {
        params: file
      }).then(function (res){
        that.getFiles()
      })
    },
    /*删除*/
    deleteFile(id){
      const that=this
      axios.get('http://localhost:8083/deleteFile', {
        params: {
          fileIds:id
        }
      }).then(function (res){
        that.getFiles()
      })
    },
    /*重命名*/
    rename(oldname,id) {
      const that=this
      this.$prompt('重命名', '文件名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: oldname
      }).then(({ value }) => {
        axios.get('http://localhost:8083/renameFile', {
          params: {
            newFileName:value,
            id:id
          }
        }).then(function (res){
          that.getFiles()
        }).catch(error=>alert(error));
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    /*查询*/
    findFile(){
      const that=this
      axios.get('http://localhost:8083/findFile', {
        params: {
          presentPath:this.presentPath,
          fuzzyQueryFileName:this.fuzzyQueryFileNameKey
        }
      }).then(function (res){
        that.yunFiles=res.data
      })
    },
    /*下载*/
    downloadFile(){},
    /*恢复*/
    restoreFile(id){
      const that=this
      axios.get('http://localhost:8083/restoreFile', {
        params: {
          id:id
        }
      }).then(function (res){
        that.getFiles()
      })
    },
    /*永井删除*/
    deleteForever(id){
      const that=this
      axios.get('http://localhost:8083/deleteForever', {
        params: {
          id:id
        }
      }).then(function (res){
        that.getFiles()
      })
    }
  },
    created() {
      this.presentPath="I:/myYunStoragePath/"+this.username+"/"
      this.getFiles()
    }
}
</script>

<style scoped>

</style>