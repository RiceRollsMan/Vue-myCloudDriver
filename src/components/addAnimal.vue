<template>
  <div style="border: 1px solid black">
    <img src="https://qlogo1.store.qq.com/qzone/2770604832/2770604832/100" alt="animal" v-model="animalHeads">
    动物名字：<input type="text" v-model="animalName"> <br>
    动物性别：
    <input type="radio" name="animalGender" value="0" v-model="animalGender">雌
    <input type="radio" name="animalGender" value="1" v-model="animalGender">雄
    <input type="radio" name="animalGender" value="2" v-model="animalGender">不详<br>
    描述：<textarea name="animalIntroduction" id="" cols="30" rows="10" v-model="animalIntroduction"></textarea> <br>
    <button @click="toAddAnimal">点击添加</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "addAnimal",
  data(){
    return{
      animalName:"",
      animalGender:"",
      animalHeads:"",
      animalIntroduction:""
    }
  },
  methods:{
    toAddAnimal(){
      console.log("xxx")
        this.addAnimal({
          animalName:this.animalName,
          animalGender:this.animalGender,
          animalHeads:this.animalHeads,
          animalIntroduction:this.animalIntroduction
        })
    },
    ...mapActions('animalAbout',{
      addAnimal:"addAnimal"
    })
  }
}
</script>

<style scoped>

</style>