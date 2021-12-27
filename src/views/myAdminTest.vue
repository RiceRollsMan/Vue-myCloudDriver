<template>
<div>
  <div v-for="animal in animals">
    <span>{{animal.animalId}}</span>
    <span>{{animal.animalName}}</span><br>
    <span>{{getAnimalDonations(animal.animalId)}}</span>
    <div v-for="record in animal.animalDonateRecord">
      <span>{{record.donateDate}}</span>
      <span>{{record.donateUsername}}</span>
      <span>{{record.donateMoney}}</span>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "myAdminTest",
  computed:{
    ...mapState('animalAbout',{
      animals:'animals'
    }),
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
  }
}
</script>

<style scoped>

</style>