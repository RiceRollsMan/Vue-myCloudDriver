<template>
  <div>
  <myHeader></myHeader>
  <div class="Page" style="border: 1px solid black;border-radius: 10px">

    <div class="PageTop">
      <div class="Picture">
        <!--头像-->
        <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="180" v-bind:src="animalInfo.animalHeads">
                </el-avatar>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="Means">
        <!--打赏信息-->
        <span v-once style="line-height: 155px">
        {{ animalInfo.animalName }}
      </span>
      </div>

    </div>
    <div class="PageTwo">
      <!--打赏金额-->
      <div>
        <span style="line-height: 95px">请选择捐助金额:</span>
        &nbsp&nbsp&nbsp&nbsp
        <el-radio v-model="donateMoney" label="10">10元</el-radio>
        <el-radio v-model="donateMoney" label="20">20元</el-radio>
        <el-radio v-model="donateMoney" label="30">30元</el-radio>
        <span>自定义金额:&nbsp&nbsp&nbsp&nbsp</span>
        <el-input v-model="donateMoney" type="number" placeholder="请输入金额" style="width: 150px" clearable></el-input>

      </div>
    </div>

    <div class="PageMa" style="position: absolute">
      <!--二维码-->
      <img src="../../public/donateCode.png" width="185px" height="185px"><br><br>
      <span>希望用途:&nbsp&nbsp&nbsp&nbsp</span>
      <el-input v-model="hopeToUse" type="text" placeholder="" style="width: 150px" clearable></el-input>
      <el-button size="large" @click="confirmToDonate" >捐助</el-button>
    </div>

  </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";
import myHeader from "../components/myHeader";

export default {
  name: "myDonatePageOfZhong",
  data() {
    return {
      donateMoney: '0',
      /*自定义输入*/
      hopeToUse:""
    }
  },
  computed:{
    ...mapState('animalAbout',{
      animalId:'animalDetailsId'
    }),
    ...mapState('userAbout',{
      donateUsername:'loginUser'
    }),
    ...mapGetters({
      donateRecord:'animalAbout/getDonateRecord'
    }),
    ...mapGetters({
      myDonateLog:'userAbout/getMyDonateRecord'
    }),
    ...mapGetters('animalAbout',{
      animalInfo:'getAnimalsInfo'
    })
  },
  components:{
    myHeader
  },
  methods:{
    confirmToDonate(){
      if(this.donateMoney==0){
        alert("请输入有效金额")
        return;
      }
      let donateForAnimalAbout={
        donateUsername:this.donateUsername,
        donateDate:Date.now(),
        donateMoney:this.donateMoney,
        donateHopeToUse:this.hopeToUse
      }
      this.toDonate(donateForAnimalAbout)
      let donateForUserLog={
        donateAnimalId:this.animalId,
        donateAnimalName:this.animalInfo.animalName,
        donateDate:Date.now(),
        donateMoney:this.donateMoney,
        donateHopeToUse:this.hopeToUse
      }
      this.logDonate(donateForUserLog)
      alert("感谢您的捐助")
    },
    ...mapActions('animalAbout',{
      toDonate:'toDonate'
    }),
    ...mapActions('userAbout',{
      logDonate:"logDonate"
    }),
    toShowDonate(){
      console.log(this.donateRecord)
    },
    toShowMyDonate(){
      console.log(this.myDonateLog)
    }
  }
}
</script>


<style>
.Page{
  width: 800px;
  height: 600px;
  position:absolute;
  top:50%;
  left:50%;
  margin:-300px 0 0 -400px;
}
.PageTop{
  width: 700px;
  height: 185px;
  float: top;
}
.Picture{
  width: 185px;
  height: 185px;
  float: left;
}
.Means{
  width: 515px;
  height: 185px;
  float: right;
}
.Text{
  height: 185px;
  width: 300px;
  resize: none;
}
.PageTwo{
  width: 700px;
  height: 85px;
}
.PageMa{
  width: 700px;
  height: 310px;
}
</style>
