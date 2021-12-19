<template>
  <div>
    <my-header></my-header>
    <h1>this is animals details</h1>
    <animal-details-of-info></animal-details-of-info>
    <animal-details-of-pic-wall></animal-details-of-pic-wall>
    <animal-details-of-write-comments></animal-details-of-write-comments>
    <animal-details-of-comments></animal-details-of-comments>
  </div>
</template>

<script>
import myHeader from "../components/myHeader";
import animalDetailsOfInfo from "../components/animalDetailsOfInfo";
import animalDetailsOfPicWall from "../components/animalDetailsOfPicWall";
import animalDetailsOfWriteComments from "../components/animalDetailsOfWriteComments";
import animalDetailsOfComments from "../components/animalDetailsOfComments";
export default {
  name: "myAnimalDetails",
  components:{
    myHeader,
    animalDetailsOfInfo,
    animalDetailsOfPicWall,
    animalDetailsOfWriteComments,
    animalDetailsOfComments
  }
}
</script>

<style scoped>

</style>