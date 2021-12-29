<template>
  <div>
    <my-header></my-header>
    <div>xx</div>
    <div>xx</div>
    <chaos-animal-details></chaos-animal-details>
    <chaos-submit-comment></chaos-submit-comment>
    <chaos-comment></chaos-comment>
  </div>
</template>

<script>
import chaosAnimalDetails from "../components/chaosAnimalDetails";
import chaosComment from "../components/chaosComment";
import chaosSubmitComment from "../components/chaosSubmitComment";
import myHeader from "../components/myHeader";

export default {
  name: "myAnimalDetailsOfChao",
  components: {
    chaosAnimalDetails,
    chaosComment,
    chaosSubmitComment,
    myHeader
  }
}
</script>

