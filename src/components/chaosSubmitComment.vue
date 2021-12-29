<template>
  <div>
    <div style="text-align: center">
      <input v-model="commentContext" placeholder="评论一下吧" style="width: 60%;"></input>
      <button class="inputBtn" @click="submitComment">提交</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "chaosSubmitComment",
  data() {
    return {
      commentContext: '',
    }
  },
  computed:{
    /*获取当前用户名*/
    ...mapState('userAbout',{username:'loginUser'}),
  },
  methods:{
    submitComment() {
      let comment={
        commentUser:this.username,
        commentDate:Date.now(),
        commentContext:this.commentContext
      }
      this.postComment(comment)
      alert("评论成功")
    },
    ...mapActions('animalAbout',{
      postComment:'postComment'
    })
  }

}
</script>

<style scoped>
input{
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 14px 14px;
  width: 60%;
  font-size: 24px;
}
.inputBtn{
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 14px 14px;
  width: 10%;
  font-size: 24px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}



</style>