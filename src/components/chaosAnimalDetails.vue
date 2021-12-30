<template>
<div>
  <div style=" background: #ffffff;margin-left: 150px;margin-right: 150px;">

<!--    头像 名字 关注 捐助入口-->
<!--    头像-->
    <el-image :src="animalInfo.animalHeads" style="width:200px; height:200px; border-radius:50%; padding:0px;margin-left:50px;vertical-align:middle;"></el-image>
<!--    动物名字-->
    <span style="font-size: 50px;font-family: 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;padding: 20px">{{animalInfo.animalName}}</span>
<!--    是否关注-->
    <el-button type="warning" style="margin-left: 80px;" v-if="(animalInfo.isFocus==0)==true" @click="toFocusAnimals(animalInfo.animalId)">  关注<div class="el-icon-star-off"></div>  </el-button>
    <el-button type="danger" style="margin-left: 80px" v-else @click="toDontFocusAnimals(animalInfo.animalId)">  已关注  </el-button>
<!--    捐助入口-->
    <el-button type="success" style=""  @click="toDonatePage">  捐赠 <div class="el-icon-goods"> </div>  </el-button>




    <span></span>
<!--    动物详情介绍-->
    <div style="background: #eeeeee; padding: 50px;margin: 50px">
      <p>
        {{animalInfo.animalIntroduction}}
      </p>
    </div>

    <!--    图片展示-->
    <div>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in animalInfo.animalImages" :key="item" >
          <div class="main-container">
            <img :src="item" style="width: 100%;height: 100%">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
<!--    分隔符-->

  </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "chaosAnimalDetails",
  computed:{
    ...mapGetters('animalAbout',{
      animalInfo:'getAnimalsInfo'
    })
  },
  methods:{
    /*把id传到后台，并且用于关注或者取消关注*/
    toFocusAnimals(animalId){
      this.focusAnimals(animalId)
    },
    ...mapActions('animalAbout',{
      focusAnimals:'focusAnimal'
    }),
    toDontFocusAnimals(animalId){
      this.dontFocusAnimals(animalId)
    },
    ...mapActions('animalAbout',{
      dontFocusAnimals:'dontFocusAnimals'
    }),
    toDonatePage(){
      this.$router.push("/myDonatePageOfZhong")
    }
  }
}
</script>

<style scoped>

</style>