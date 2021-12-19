<template>
  <div style="background-color: #42b983">
    <span>{{animalInfo.animalName}}</span><br>
    <img :src="animalInfo.animalHeads" alt="" style="border-radius:35px;height: 35px;width: 35px;margin-right: 15px;"><br>
    <span>{{animalInfo.animalIntroduction}}</span><br>
    <span>{{animalInfo.isFocus}}</span><br>
    <button @click="toDonatePage">捐助它</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "animalDetailsOfInfo",
  computed:{
    ...mapGetters('animalAbout',{
      animalInfo:'getAnimalsInfo'
    })
  },
  methods:{
    toDonatePage(){
      this.$router.push("/myDonatePage")
    }
  }
}
</script>

<style scoped>

</style>