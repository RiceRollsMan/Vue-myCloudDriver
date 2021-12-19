<template>

  <div>
    <h1>this is donate page</h1>
  捐助金额：<input type="text" v-model="donateMoney"><br>
  希望用途：<input type="text" v-model="hopeToUse">
  <button @click="confirmToDonate">确认捐助</button>
    <button @click="toShowDonate">点我显示所有捐款</button>
    <button @click="toShowMyDonate">点我看看我的所有捐款</button>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "myDonatePage",
  data(){
    return{
      donateMoney:0,
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
  methods:{
    confirmToDonate(){
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

<style scoped>

</style>