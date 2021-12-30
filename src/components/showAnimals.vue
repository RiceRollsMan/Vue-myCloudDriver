<template>
  <!--<div>-->
  <!--  <div v-for="animals in fuzzyAnimalsByKeywords" key="{{animals.animalId}}" :class="animalCard" style="width: 300px;height: 300px;display: inline-block">-->
  <!--      <div @click="toPassAnimalId(animals.animalId)">-->
  <!--           名字:<span>{{animals.animalName}}</span><br>-->
  <!--           性别:<span>{{animals.animalGender}}</span><br>-->
  <!--           id:<span>{{animals.animalId}}</span><br>-->
  <!--            <img :src="animals.animalHeads" alt="xx" style="height: 80px;width: 60px">-->
  <!--           <button @click.stop="toFocusAnimals(animals.animalId)" v-if="animals.isFocus==0">关注</button>-->
  <!--           <button @click.stop="toDontFocusAnimals(animals.animalId)" v-if="animals.isFocus">已关注</button>-->
  <!--      </div>-->
  <!--  </div>-->
  <!--</div>-->
<div>
  <addAnimal v-if="(isAdmin==1)==true"></addAnimal>
    <div class="mainSize" @click="toPassAnimalId(animals.animalId)" v-for="animals in fuzzyAnimalsByKeywords"  :class="animalCard" key="{{animals.animalId}}" style="display: inline-block">
      <div class="leftSize" ><br><br>
        名字:<span>{{animals.animalName}}</span><br><br><br>
        性别:<span v-if="(animals.animalGender==1)==true">雄</span>
        <span v-else-if="(animals.animalGender==0)==true">雌</span>
        <span v-else >不详</span><br><br><br>
        id:<span>{{animals.animalId}}</span><br>
      </div>
      <div class="rightSize">
        <img :src="animals.animalHeads" alt="动物头像" style="height: 150px;width: 120px"><br>
        <button @click.stop="toFocusAnimals(animals.animalId)" v-if="animals.isFocus==0" style="width: 100%">关注</button>
        <button @click.stop="toDontFocusAnimals(animals.animalId)" v-if="animals.isFocus" style="width: 100%">已关注</button>
      </div>
    </div>

</div>

</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import addAnimal from "./addAnimal";

export default {
  name: "showAnimals",
  components:{
    addAnimal
  },
  data() {
    return {
      animalCard: 'animalCard'
    }
  },
  computed: {
    ...mapState("animalAbout", {keywords: 'queryKeywords'}),
    fuzzyAnimalsByKeywords() {
      /*传值还没写*/
      /*写了*/
      return this.$store.getters["animalAbout/getAnimalsByKeywords"](this.keywords)
    },
    ...mapGetters('userAbout',{
      isAdmin:'getIsAdmin'
    })
  },
  methods: {
    /*把id传到后台，用于详细页使用*/
    toPassAnimalId(animalId) {
      this.passAnimalId(animalId)
      // this.$router.push("/myAnimalDetails")
      this.$router.push("/myAnimalDetailsOfChao")
    },
    ...mapActions('animalAbout', {passAnimalId: 'getAnimalId'}),
    /*把id传到后台，并且用于关注或者取消关注*/
    toFocusAnimals(animalId) {
      this.focusAnimals(animalId)
    },
    ...mapActions('animalAbout', {
      focusAnimals: 'focusAnimal'
    }),
    toDontFocusAnimals(animalId) {
      this.dontFocusAnimals(animalId)
    },
    ...mapActions('animalAbout', {
      dontFocusAnimals: 'dontFocusAnimals'
    })
  }
}
</script>

<style scoped>
.animalCard {
  border: 1px black solid;
  background-color: white;
}

.mainSize {
  border: blue 1px solid;
  padding: 10px;
  width: 370px;
  height: 247px;
  margin: 40px;
  border-radius: 20px;
  cursor: pointer;
}

.leftSize {
  float: left;
  padding-right: 10px;
}

.rightSize {
  float: right;
}
</style>