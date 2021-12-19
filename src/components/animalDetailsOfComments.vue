<template>
<div>
  <div v-for="comment in comments" style="border: 1px black solid">
    <span>{{comment.commentUser}}</span><br>
    <span>{{comment.commentDate}}</span><br>
    <span>{{comment.commentContext}}</span><br>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "animalDetailsOfComments",
  computed:{
    ...mapGetters('animalAbout',{
      comments:'getAnimalsComments'
    })
  }
}
</script>

<style scoped>

</style>