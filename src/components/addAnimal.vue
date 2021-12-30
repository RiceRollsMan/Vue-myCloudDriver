<template>
  <!--  <div style="border: 1px solid black">-->
  <!--    <img src="https://qlogo1.store.qq.com/qzone/2770604832/2770604832/100" alt="animal" v-model="animalHeads">-->
  <!--    动物名字：<input type="text" v-model="animalName"> <br>-->
  <!--    动物性别：-->
  <!--    <input type="radio" name="animalGender" value="0" v-model="animalGender">雌-->
  <!--    <input type="radio" name="animalGender" value="1" v-model="animalGender">雄-->
  <!--    <input type="radio" name="animalGender" value="2" v-model="animalGender">不详<br>-->
  <!--    描述：<textarea name="animalIntroduction" id="" cols="30" rows="10" v-model="animalIntroduction"></textarea> <br>-->
  <!--    <button @click="toAddAnimal">点击添加</button>-->
  <!--  </div>-->


  <div class="mainSize" style="display: inline-block;">
    <form @submit.prevent="toAddAnimal" class="leftSize">
      动物名字：<input type="text" v-model="animalName" style="width: 150px;" required="required"> <br>
      动物性别：
      <select name="animalGender" id="animalGender" v-model="animalGender">
        <option value="0">雌</option>
        <option value="1">雄</option>
        <option value="2" selected>不详</option>
      </select><br>
      描述：<br><textarea name="animalIntroduction"  cols="30" rows="10" v-model="animalIntroduction"></textarea> <br>
      <button type="submit">点击添加</button>
    </form>
    <div class="rightSize">
      <img src="https://www.beihaiting.com/uploads/allimg/160619/10723-160619210ZY49.jpg" alt="animal" height="150px" width="120px" v-model="animalHeads">
    </div>
  </div>


  <!--  这是一个整的div-->
  <!--  <div style="border: 1px solid black;border-radius: 5px;display: inline-block;width: 30%" >-->
  <!--&lt;!&ndash;    这是信息栏那一半&ndash;&gt;-->
  <!--    <div style="width: 70%;display: inline-block">-->
  <!--      <table>-->
  <!--        <thead>我要添加</thead>-->
  <!--        <tr style="width: 100%;">-->
  <!--          <td>姓名</td>-->
  <!--          <td><input type="text" style="width: 60%"></td>-->
  <!--        </tr>-->
  <!--        <tr>-->
  <!--          <td>性别</td>-->
  <!--          <td><input type="radio" name="animalGender" value="0" v-model="animalGender">雌-->
  <!--            <input type="radio" name="animalGender" value="1" v-model="animalGender">雄-->
  <!--            <input type="radio" name="animalGender" value="2" v-model="animalGender">不详<br></td>-->
  <!--        </tr>-->
  <!--        <tr> -->
  <!--          <td>简介</td>-->
  <!--          <td><textarea style="width: 60%" name="" id="" cols="30" rows="10"></textarea></td>-->
  <!--        </tr>-->
  <!--      </table>-->
  <!--    </div>-->
  <!--            &lt;!&ndash;    动物头像那一半&ndash;&gt;-->
  <!--    <div style="width: 30%;display: inline-block">-->
  <!--      <img src="https://qlogo1.store.qq.com/qzone/2770604832/2770604832/100" alt="">-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "addAnimal",
  data() {
    return {
      animalName: "",
      animalGender: "2",
      animalHeads: "",
      animalIntroduction: ""
    }
  },
  methods: {
    toAddAnimal() {
      console.log("xxx")
      this.addAnimal({
        animalName: this.animalName,
        animalGender: this.animalGender,
        animalHeads: this.animalHeads,
        animalIntroduction: this.animalIntroduction
      })
      alert("添加成功")
    },
    ...mapActions('animalAbout', {
      addAnimal: "addAnimal"
    })
  }
}
</script>

<style scoped>
.mainSize{
  border: blue 1px solid;
  padding: 10px;
  margin-left: 80px;
  border-radius: 20px;
}
.leftSize{
  float: left;
  padding-right: 10px;
}
.rightSize{
  float: right;
}
</style>