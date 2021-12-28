<template>
  <div>
<!--  <router-link to="/myFocusAnimals">看我的关注动物</router-link>-->
<!--  <router-link to="/myDonationHistory">看我的捐助记录</router-link>-->
<!--  <router-view></router-view>-->

    <div style="background: #E9EEF3;height:500px">
      <el-tabs  style="height: 200px;">
        <el-tab-pane label="关注动物" >
          <el-table :data="$store.getters['animalAbout/getMyFocusAnimals']" style="width: 100%">

            <el-table-column prop="animalId" label="动物编号" >
            </el-table-column>

            <el-table-column prop="animalName" label="动物名称" >
            </el-table-column>

            <el-table-column prop="animalIntroduction" label="动物简介" >
            </el-table-column>

          </el-table>
        </el-tab-pane>

        <el-tab-pane label="历史捐助" >
          <el-table :data="myDonateAnimals" style="width: 100%">
<!--            下拉展示的东西-->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="getSpecificAnimalRecords(props.row.donateAnimalId)">
                  <el-table-column label="捐助日期" prop="donateDate">
                  </el-table-column>

                  <el-table-column label="捐助用途" prop="donateHopeToUse">
                  </el-table-column>

                  <el-table-column label="捐助金额" prop="donateMoney">
                  </el-table-column>

                </el-table>
              </template>
            </el-table-column>

<!--            列表-->
            <el-table-column label="动物编号" prop="donateAnimalId">
            </el-table-column>

            <el-table-column label="动物名称" prop="donateAnimalName">
            </el-table-column>

            <el-table-column label="受捐助总金额" prop="donateSpecificAnimalAllMoney">
            </el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "myPersonalCenterBody",
  computed:{
    /*拿到我的捐助记录*/
    ...mapGetters('userAbout',{
      myDonateHistory:"getMyDonateRecord"
    }),
    /*捐助记录分类*/
    myDonateAnimals(){
      let animal={}
      let flag=0
      let j=0
      let animalClass=[]
      let i =0
      /*先循环拿到我的捐助记录*/
      for( i=0;i<this.myDonateHistory.length;i++){
        /*判断该动物是否在donateAnimal里*/
        flag=0
        for (j=0;j<animalClass.length;j++){
          if(this.myDonateHistory[i].donateAnimalId==animalClass[j].donateAnimalId){
            flag=1
            /*此时的j就是animalClass中的所在项*/
            /*此时的i就是中的myDonateHistory中的所在项*/
            break;
          }
        }
        /*如果不在就添加分类*/
        if(flag==0){
          animal={
            donateAnimalId:this.myDonateHistory[i].donateAnimalId,
            donateAnimalName:this.myDonateHistory[i].donateAnimalName,
            donateSpecificAnimalAllMoney:parseInt(this.myDonateHistory[i].donateMoney)
          }
          /*添加分类*/
          animalClass.push(animal)
        }
        /*如果此时的动物已经添加了分类了*/
        if(flag==1){
          animalClass[j].donateSpecificAnimalAllMoney=animalClass[j].donateSpecificAnimalAllMoney+parseInt(this.myDonateHistory[i].donateMoney)
        }
      }
      return animalClass
    }
  },
  methods:{
    getSpecificAnimalRecords(animalId) {
      let donateLog=[]
      for(let i=0;i<this.myDonateHistory.length;i++){
        if(animalId==this.myDonateHistory[i].donateAnimalId){
          donateLog.push(this.myDonateHistory[i])
        }
      }
      return donateLog
    }
  },
}
</script>

<style scoped>

</style>