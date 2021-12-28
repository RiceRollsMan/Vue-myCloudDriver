<template>
  <el-table
      :data="$store.state.animalAbout.animals"
      style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
<!--        -->
        <el-table :data="getSpecificAnimalRecords(props.row.animalId)">
          <el-table-column label="捐助时间" prop="donateDate">
          </el-table-column>
<!--          -->
          <el-table-column label="捐助用户" prop="donateUsername">
          </el-table-column>
<!--          -->
          <el-table-column label="捐助金额" prop="donateMoney">
          </el-table-column>
        </el-table>
<!--        -->
      </template>
    </el-table-column>
<!--    动物表-->

    <el-table-column label="动物ID" prop="animalId">
    </el-table-column>
    <el-table-column label="动物名称" prop="animalName">
    </el-table-column>
    <el-table-column label="受捐助总金额">
        <template scope="scope">
          {{getAnimalDonations(scope.row.animalId)}}
        </template>
      </el-table-column>
<!--    ****************************-->
  </el-table>
</template>

<script>


import {mapState} from "vuex";

export default {
  name: "Contribute",
  computed:{
    ...mapState('animalAbout',{
      animals:'animals'
    })
  },
  methods:{
    getAnimalDonations(animalId){
      let i=0;
      let allDonations=0;
      for(i=0;i<this.animals.length;i++){
        if(animalId==this.animals[i].animalId){
          for(let j=0;j<this.animals[i].animalDonateRecord.length;j++){
            allDonations=allDonations+parseInt(this.animals[i].animalDonateRecord[j].donateMoney)
          }
          break;
        }
      }
      return allDonations;
    },
    getSpecificAnimalRecords(animalId){
      let i=0;
      let records=[]
      for(i=0;i<this.animals.length;i++){
        if(animalId==this.animals[i].animalId){
          for(let j=0;j<this.animals[i].animalDonateRecord.length;j++){
            records.push(this.animals[i].animalDonateRecord[j])
          }
          break;
        }
      }
      return records
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
span{
  margin: 30px;
}
span.app{
  margin: 30px;
}
</style>