<template>
<!--1.获取捐助过的动物-->
  <div>
    <div v-for="log in myDonateHistory">
      <span>{{log.donateAnimalId}}</span>
      <span>{{log.donateAnimalName}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "myDonationHistory",
  computed:{
    ...mapGetters('userAbout',{
      myDonateHistory:"getMyDonateRecord"
    })
  }
}
</script>

<style scoped>

</style>