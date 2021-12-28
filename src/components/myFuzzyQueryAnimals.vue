<template>
<div>
  <input type="text" style="margin-left:35%;height: 40px;width: 450px;border-radius: 10px;border: 2px solid black;font-size: 20px;text-align: center" placeholder="可以通过名字查询动物" v-model="keywords" @keyup.enter="fuzzyQueryAnimals"><br>
<!--  测试时使用的-->
<!--  <button @click="fuzzyQueryAnimals">点我模糊查询动物</button>-->
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