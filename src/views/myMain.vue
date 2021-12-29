<!--这是路由组件-->
<template>
<div class="hh">
  <my-header></my-header>
  <h1>this is main</h1>
  <myFuzzyQueryAnimals ></myFuzzyQueryAnimals>
  <hr>
  <addAnimal style="display: inline-block"></addAnimal>
  <router-link to="/myAdmin" style="float:right;">进入管理员</router-link>
  <router-link to="/myPersonalCenter">进入个人中心</router-link>
  <router-link to="/myAnimalDetailsOfChaos">进入潮的界面</router-link>
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
.hh{
margin: 0px;
}
</style>