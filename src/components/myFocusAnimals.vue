<template>
  <div>
    <div v-for="animal in myFocusAnimals">
      <span>{{animal.animalId}}</span>
      <span>{{animal.animalName}}</span>
      <span>{{animal.animalIntroduction}}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "myFocusAnimals",
  computed:{
    ...mapGetters('animalAbout',{
      myFocusAnimals:"getMyFocusAnimals"
    })
  }
}
</script>

<style scoped>

</style>