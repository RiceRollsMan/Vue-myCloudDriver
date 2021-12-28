<template>
  <div>
    <myPersonalCenterTop></myPersonalCenterTop>

    <myPersonalCenterBody></myPersonalCenterBody>
  </div>
</template>

<script>
import myPersonalCenterTop from "../components/myPersonalCenterTop";
import myPersonalCenterBody from "../components/myPersonalCenterBody";

export default {
  name: "myPersonalCenter",
  components:{
    myPersonalCenterTop,
    myPersonalCenterBody
  }
}
</script>

<style scoped>

</style>