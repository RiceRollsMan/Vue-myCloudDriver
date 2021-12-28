<template>
  <el-table
      :data="$store.state.animalAbout.animals"
      style="width: 100%">
    <el-table-column label="动物ID" prop="animalId">
    </el-table-column>
    <el-table-column label="动物名称" prop="animalName">
    </el-table-column>
    <el-table-column label="动物性别" >
      <template scope="scope">
        <span v-if="scope.row.animalGender==1">雄性</span>
        <span v-if="scope.row.animalGender==0">雌性</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>


import {mapState} from "vuex";

export default {
  name: "describe",
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