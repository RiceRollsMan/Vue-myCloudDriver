<template>
  <div>
    <div v-for="image in images">
       <img :src="image" alt="" style="height: 100px;width: 100px;">
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "animalDetailsOfPicWall",
  computed:{
    ...mapGetters('animalAbout',{
      images:'getAnimalsImages'
    })
  }
}
</script>

<style scoped>

</style>