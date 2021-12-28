<template>
  <div>
    <myHeader></myHeader>
    <div>xx</div>
    <div>xx</div>
    <div>xx</div>
    <div>xx</div>

    <myPersonalCenterBody></myPersonalCenterBody>
  </div>
</template>

<script>
import myPersonalCenterTop from "../components/myPersonalCenterTop";
import myPersonalCenterBody from "../components/myPersonalCenterBody";
import myHeader from "../components/myHeader";

export default {
  name: "myPersonalCenter",
  components:{
    myPersonalCenterTop,
    myPersonalCenterBody,
    myHeader
  }
}
</script>

<style scoped>

</style>