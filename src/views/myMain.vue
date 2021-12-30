<!--这是路由组件-->
<template>
<div class="hh">
  <my-header></my-header>
  <div>this is main</div>
  <div>this is main</div>
  <div>&nbsp;</div>
  <myFuzzyQueryAnimals ></myFuzzyQueryAnimals>
  <hr>
  <showAnimals style="display: inline-block"></showAnimals>
</div>
</template>

<script>
import myHeader from "../components/myHeader";
import myFuzzyQueryAnimals from "../components/myFuzzyQueryAnimals";
import showAnimals from "../components/showAnimals";
import addAnimal from "../components/addAnimal";
export default {
  name: "myMain",
  components:{
    myHeader,
    myFuzzyQueryAnimals,
    showAnimals,
    addAnimal
  }
}
</script>

<style scoped>
</style>