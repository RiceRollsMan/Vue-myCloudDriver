<template>
  <div class="Page">
    <div class="PageTop1"></div>
    <div class="PageTop2"></div>
    <div class="PageMain">
      <div class="mainleft"></div>
      <div class="mainrightright"></div>
      <div class="mainright">
        <div style="height: 104px">
          <el-row class="demo-avatar demo-basic">
            <el-col :span="12">
              <div class="sub-title"></div>
              <div class="demo-basic--circle">
                <div class="block"><el-avatar :size="100" :src="circleUrl"></el-avatar></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="float: left;width: 300px;height: 100px;text-align: right">
          <br>
          <span style="text-align: left">请选择捐助金额:</span>
        </div>
        <div style="float: left;width: 300px;height: 300px">
          <br>
          <el-radio v-model="radio" label="1">10元</el-radio>
          <el-radio v-model="radio" label="2">20元</el-radio>
        </div>
        <div style="float: right">
          <br>
          <el-button size="small">捐助</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body::-webkit-scrollbar { width: 0 !important; display: none; }
body { -ms-overflow-style: none; }
body { overflow: -moz-scrollbars-none; }
body{
}
.Page{
  width: 78%;
  margin: auto;
}
.PageTop1{
  line-height: 80px;
  height: 80px;
}
.PageTop2{
  height: 40px;
  width: 960px;
  margin: 0;
}
.PageMain{
  background-size: cover;
  min-height: 500px;
}
.mainleft{
  width: 20%;
  float: left;
  height: 500px;
  text-align: left;
}
.mainright {
  width: 60%;
  float: right;
  height: 500px;
}
.mainrightright{
  width: 20%;
  float: right;
  height: 500px;
}
</style>
<script>
export default {
  data() {
    return {
        radio: '1',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        input: '',
    }
  }
}
</script>