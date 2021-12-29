<template>
  <div>
    <el-table :data="comments" stripe style="width: 100%;margin: 10px;">
      <el-table-column prop="commentDate" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="commentUser" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="commentContext" label="评论内容">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "chaosComment",
  computed:{
    ...mapGetters('animalAbout',{
      comments:'getAnimalsComments'
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