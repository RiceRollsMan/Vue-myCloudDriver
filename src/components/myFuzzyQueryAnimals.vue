<template>
<div>
  <input type="text" placeholder="可以通过名字或者动物ID查询动物" v-model="keywords"><br>
  <button @click="fuzzyQueryAnimals">点我模糊查询动物</button>
</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name:'myFuzzyQueryAnimals',
  data(){
    return{
      keywords:"",
    }
  },
  computed:{
    getAnimalsByKeywords(state) {
      return this.$store.getters["animalAbout/getAnimalsByKeywords"](this.keywords)
    }
  },
  methods:{
    fuzzyQueryAnimals(){
      console.log(this.getAnimalsByKeywords)
    }
  },
  mounted(){
    this.fuzzyQueryAnimals()
  }
}
</script>
<style></style>