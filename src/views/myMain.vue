<!--这是路由组件-->
<template>
<div class="hh">
  <my-header></my-header>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <addAnimal></addAnimal>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <myFuzzyQueryAnimals></myFuzzyQueryAnimals>
  <showAnimals></showAnimals>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
  <h1>this is main</h1>
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
.hh{
margin: 0px;
}
</style>