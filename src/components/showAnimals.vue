<template>
<div>
  <div v-for="animals in fuzzyAnimalsByKeywords" key="{{animals.animalId}}" :class="animalCard">
<!--    <router-link to="/myAnimalDetails">-->
      <div @click="toPassAnimalId(animals.animalId)">
           名字:<span>{{animals.animalName}}</span><br>
           性别:<span>{{animals.animalGender}}</span><br>
           id:<span>{{animals.animalId}}</span><br>
            <img :src="animals.animalHeads" alt="xx">
           <button @click.stop="toFocusAnimals(animals.animalId)" v-if="animals.isFocus==0">关注</button>
           <button @click.stop="toDontFocusAnimals(animals.animalId)" v-if="animals.isFocus">已关注</button>
      </div>
  </div>
</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "showAnimals",
  data(){
    return{
      animalCard:'animalCard'
    }
  },
  computed:{
    ...mapState("animalAbout",{keywords:'queryKeywords'}),
    fuzzyAnimalsByKeywords(){
      /*传值还没写*/
      /*写了*/
      return this.$store.getters["animalAbout/getAnimalsByKeywords"](this.keywords)
    },
  },
  methods:{
    /*把id传到后台，用于详细页使用*/
    toPassAnimalId(animalId){
      this.passAnimalId(animalId)
      this.$router.push("/myAnimalDetails")
    },
    ...mapActions('animalAbout',{passAnimalId:'getAnimalId'}),
    /*把id传到后台，并且用于关注或者取消关注*/
    toFocusAnimals(animalId){
      this.focusAnimals(animalId)
    },
    ...mapActions('animalAbout',{
      focusAnimals:'focusAnimal'
        }),
    toDontFocusAnimals(animalId){
      this.dontFocusAnimals(animalId)
    },
    ...mapActions('animalAbout',{
      dontFocusAnimals:'dontFocusAnimals'
    })
  }
}
</script>

<style scoped>
.animalCard{
  border: 1px black solid;
  background-color: gold;
}
</style>