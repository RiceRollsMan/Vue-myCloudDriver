<template>
  <div>
    <input type="text" v-model="commentContext"  placeholder="写点评论吧">
    <button @click="toPostComment()">评论</button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "animalDetailsOfWriteComments",
  data(){
    return {
      commentContext: "",
    }
  },
  computed:{
    /*获取当前用户名*/
    ...mapState('userAbout',{username:'loginUser'}),
    /*获取当前用户头像*/
    userHeads(){
      return this.$store.getters["userAbout/getUserHeads"](this.username)
    }
  },
  methods:{
    /*发表评论*/
    toPostComment(){
      let comment={
        commentUser:this.username,
        commentUserHeads:this.userHeads,
        commentDate:Date.now(),
        commentContext:this.commentContext
      }
      this.postComment(comment)
    },
    ...mapActions('animalAbout',{
      postComment:'postComment'
    })
  }
}
</script>

<style scoped>

</style>