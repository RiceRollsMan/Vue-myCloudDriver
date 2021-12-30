import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from '../../js/day'
Vue.use(Vuex)
Vue.use(dayjs)
/*关于user的选项*/
const userOptions = {
  /*
  namespaced为true，为组件使用建立前提*/
  namespaced:true,
  /*
  * */
  actions:{
    /*登录功能
    * 此时的user
    * { username:
        password:}*/
    login(context,user){
      context.commit("LOGIN",user)
    },
    /*注册功能
    * 此时的user
    * {
    * username:
      password:
      gender:
      email:
      introduction:}*/
    signup(context,user){
      context.commit('SIGNUP',user)
    },
    /*记录用户捐助信息*/
    logDonate(context,donate){
      context.commit('LOGDONATE',donate)
    },
    /*保存密码*/
    remPassword(context,remPassword){
      context.commit('REMPASSWORD',remPassword)
    },
    /*更改记住密码状态位*/
    changeRemPasswordState(context,remPasswordState){
      context.commit('CHANGEREMPASSWORDSTATE',remPasswordState)
    }
  },
  /*
  * */
  mutations:{
    /*登录功能*/
    LOGIN(state,user){
      /*判断用户名是否正确，错误为0，正确为1.默认为0*/
      let usernameExist=0
      /*判断密码是否正确，错误为0，正确为1。默认为0*/
      let passwordCorrect=0
      let userArr=state.users
      for(let i = 0; i<userArr.length; i++){
        if(user.username==userArr[i].username){
          /*即存在用户，用户名输入正确*/
          usernameExist=1
          if(user.password==userArr[i].password){
            /*即密码也正确*/
            passwordCorrect=1
            /*密码和用户都正确，令标志为true*/
            state.loginCorrect=true
            /*将登录的用户名存入当前登录用户中*/
            state.loginUser=user.username
          }
          /*用户名正确，密码错误*/
          else
          state.loginCorrect=false
        }
      }
    },
    /*注册功能*/
    SIGNUP(state,user){
      console.log(user.gender)
      let usernameExist=0
      let userArr=state.users
      let defaultUserHeads="https://avatar.csdnimg.cn/B/A/A/3_du_du1.jpg"
      let defaultUserDonateLog=[]
      for(let i=0;i<userArr.length;i++){
        if(user.username==userArr[i].username){
          usernameExist=1
          /*证明用户名已经被占用了*/
          break;
        }
      }
      /*即用户名未被占用，可以插入*/
      if(usernameExist==0){
        let insertUser={
          username:user.username,
          password:user.password,
          userHeads:defaultUserHeads,
          userGender:Number(user.gender),
          email:user.email,
          userIntroduction:user.introduction,
          userDonateLog:defaultUserDonateLog,
          isAdmin:"0"
        }
        /*再把这个对象，插入数组*/
        state.users.push(insertUser)
      }
    },
    /*记录捐助*/
    LOGDONATE(state,donate){
      let donateUsername=state.loginUser
      let userArr=state.users
      let donateNumber=0
      let i=0
      /*找到具体用户*/
      for(i=0;i<userArr.length;i++){
        if(donateUsername==userArr[i].username){
          /*把捐款编号加1*/
          donateNumber=userArr[i].userDonateLog.length+1
          break;
        }
      }
      /*整理log*/
      let newDonateLog={
        donateNumber:donateNumber,
        donateAnimalId: donate.donateAnimalId,
        donateAnimalName: donate.donateAnimalName,
        donateDate: dayjs(donate.donateDate).format('YYYY-MM-DD'),
        donateMoney: donate.donateMoney,
        donateHopeToUse: donate.donateHopeToUse
      }
      /*开始添加记录*/
      state.users[i].userDonateLog.push(newDonateLog)
    },
    REMPASSWORD(state,remPassword){
      state.remPassword=remPassword
    },
    CHANGEREMPASSWORDSTATE(state,remPasswordState){
      state.remPasswordState=remPasswordState
    }
  },
  /*state:"状态"
  * 用于存放有关user的共享数据*/
  state:{
    /*
    * 用于返回登录时，输入是否正确,默认为错误*/
    loginCorrect:"false",
    /*用于存放当前已经登录的用户的用户名*/
    loginUser:"",//username
    /*是否记住密码,默认为无*/
    remPassword:"",
    /*是否保存密码状态*/
    remPasswordState:false,
    /*存放用户数据
    * 由于有多个用户，所以user理应为一个数组*/
    users:[{
      username:"RiceRollsMan",/*用户名*/
      password:"fkyourdogss22",/*用户密码*/
      userHeads:"https://avatar.csdnimg.cn/B/A/A/3_du_du1.jpg",/*用户头像url 默认为“https://avatar.csdnimg.cn/B/A/A/3_du_du1.jpg”*/
      userGender:1,/*用户性别，1：男，0：女*/
      email:"3533734346@qq.com",/*用户邮箱*/
      userIntroduction:"帅哥",/*用户个人介绍*/
      userDonateLog:[{
        donateNumber:1,
        donateAnimalId: 1,
        donateAnimalName: "星星",
        donateDate: dayjs().format('YYYY-MM-DD'),
        donateMoney: 100,
        donateHopeToUse: "吃东西"
      }],
      isAdmin:"1",/*用户是否为管理员。1：管理员，0：普通用户 默认为0，即普通用户*/
    }],

  },
  /*
  * */
  getters:{
    getUserHeads(state) {
      return function(username = "RiceRollsMan") {
        let userArr = state.users;
        for (let i = 0; i < userArr.length; i++) {
          if (state.loginUser == userArr[i].username) {
            /*找到该用户了，返回该用户的头像url*/
            return userArr[i].userHeads;
          }
        }
        return "https://avatar.csdnimg.cn/B/A/A/3_du_du1.jpg";//默认头像url
      }
      /**/
    },
    getMyDonateRecord(state){
      let username=state.loginUser
      let userArr=state.users
      for(let i=0;i<userArr.length;i++){
        if(username==userArr[i].username){
          return userArr[i].userDonateLog
        }
      }
    },
    getUsernameExist(state){
      return function(username){
        let userArr=state.users
        for(let i=0;i<userArr.length;i++){
          if(username==userArr[i].username){
            return false
          }
        }
        return true
      }
    },
    getIsAdmin(state){
        let userArr=state.users
        for(let i=0;i<userArr.length;i++){
          if(state.loginUser==userArr[i].username){
            return userArr[i].isAdmin
          }
        }
        return 0
    }
  }
}

/*关于animal的选项*/
const animalOptions = {
  /*
namespaced为true，为组件使用建立前提*/
  namespaced:true,
  /*
  * */
  actions:{
    /*添加animal
    * 此时的animal的对象为{
    * animalName：
    * animalGender：
    * animalHeads:
    * }*/
    addAnimal(context,animal){
      context.commit('ADDANIMAL',animal)
      console.log(animal)
    },
    /*穿动物id进来，用于详细页使用*/
    getAnimalId(context,animalId){
      context.commit('GETANIMALID',animalId)
    },
    /*关注动物*/
    focusAnimal(context,animalId){
      context.commit('FOCUSANIMAL',animalId)
    },
    /*取消关注动物*/
    dontFocusAnimals(context,animalId){
      context.commit('DONTFOCUSANIMAL',animalId)
    },
    postComment(context,comment){
      context.commit('POSTCOMMENT',comment)
    },
    toDonate(context,donate){
      context.commit("TODONATE",donate)
    }
  },
  /*
  * */
  mutations:{
    ADDANIMAL(state,animal){
      let animalId = state.animals.length+1
      let defaultComments=[]
      let defaultIsFocus=0
      let defaultAnimalImages=[
        "https://tse1-mm.cn.bing.net/th/id/R-C.d0c864a8873f3c32ba23308a30a4a04c?rik=m9c17sRR1EQ4Ng&riu=http%3a%2f%2fpic.22520.cn%2fup%2f200710%2f1594389917173934.jpeg&ehk=rGRCKgJi8eNJyapj4u18TUhQlcwQZGsswJ%2fUzWLLG%2fQ%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
        "https://tse1-mm.cn.bing.net/th/id/R-C.d0c864a8873f3c32ba23308a30a4a04c?rik=m9c17sRR1EQ4Ng&riu=http%3a%2f%2fpic.22520.cn%2fup%2f200710%2f1594389917173934.jpeg&ehk=rGRCKgJi8eNJyapj4u18TUhQlcwQZGsswJ%2fUzWLLG%2fQ%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
        "https://tse1-mm.cn.bing.net/th/id/R-C.d0c864a8873f3c32ba23308a30a4a04c?rik=m9c17sRR1EQ4Ng&riu=http%3a%2f%2fpic.22520.cn%2fup%2f200710%2f1594389917173934.jpeg&ehk=rGRCKgJi8eNJyapj4u18TUhQlcwQZGsswJ%2fUzWLLG%2fQ%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
      ]
      let defaultAnimalDonateRecord=[]
      let newAnimal = {
        animalId:animalId,
        animalName:animal.animalName,
        animalIntroduction:animal.animalIntroduction,
        animalGender:animal.animalGender,
        animalHeads:"https://www.beihaiting.com/uploads/allimg/160619/10723-160619210ZY49.jpg",
        animalImages:defaultAnimalImages,
        comments:defaultComments,
        animalDonateRecord:defaultAnimalDonateRecord,
        isFocus:defaultIsFocus
      }
      state.animals.push(newAnimal)
    },
    GETANIMALID(state,animalId){
      state.animalDetailsId=animalId
    },
    FOCUSANIMAL(state,animalId){
      for(let i=0;i<state.animals.length;i++){
        if(animalId==state.animals[i].animalId){
          state.animals[i].isFocus=1
        }
      }
    },
    DONTFOCUSANIMAL(state,animalId){
      for(let i=0;i<state.animals.length;i++){
        if(animalId==state.animals[i].animalId){
          state.animals[i].isFocus=0
        }
      }
    },
    POSTCOMMENT(state,comment){
      /*首先先获取到详细页里的动物ID*/
      let animalDetailsId=state.animalDetailsId
      comment.commentDate=dayjs(comment.commentDate).format('YYYY-MM-DD')
      for(let i=0;i<state.animals.length;i++){
        if(animalDetailsId==state.animals[i].animalId){
          state.animals[i].comments.push(comment)
        }
      }
    },
    TODONATE(state,donate){
      /*获取详情被捐助的动物的id*/
       let donateAnimalId=state.animalDetailsId
       /*获取到编号*/
      let getDonateNumber=0
      let m=0
       for( m =0;m<state.animals.length;m++){
         if(donateAnimalId==state.animals[m].animalId){
            getDonateNumber=state.animals[m].animalDonateRecord.length+1
           break
         }
       }
       let newDonate={
         donateNumber:getDonateNumber,
         donateUsername: donate.donateUsername,
         donateDate:dayjs(new Date()).format('YYYY-MM-DD'),
         donateMoney: donate.donateMoney,
         donateHopeToUse: donate.donateHopeToUse
       }
       // for(let i=0;i<state.animals.length;i++){
       //   if(donateAnimalId==state.animals[i].animalId){
       //     state.animals[i].animalDonateRecord.push(newDonate)
       //     break;
       //   }
       // }
      state.animals[m].animalDonateRecord.push(newDonate)
     }
  },
  /*state:"状态"
   * 用于存放有关animals的共享数据*/
  state:{
    /**/
    animalDetailsId:"",
    /*关键字*/
    queryKeywords:"",
    /*存放动物数据
    * 由于有多个动物，所以animals理应为一个数组*/
    animals:[{
      animalId:1,/*动物的id，即key。在添加时由服务器根据数组长度确定，即id=length+1*/
      animalName:"星星",/*动物的名字*/
      animalIntroduction:"付涛的狗",/*动物的介绍*/
      animalGender:0,/*动物性别。0：雌，1:雄性，2：不详*/
      animalHeads:"https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00638-350.jpg",/*动物头像的url*/
      animalImages:[
          "https://img2.baidu.com/it/u=2614169315,3456814402&fm=26&fmt=auto",
          "https://img2.baidu.com/it/u=3309005820,1887553597&fm=26&fmt=auto",
          "https://img1.baidu.com/it/u=3461200652,3245342663&fm=26&fmt=auto"
      ],/*动物的照片墙，理应为数组*/
      comments:[
        {
          commentUser:"RiceRollsMan",/*评论人*/
          commentUserHeads:"",/*评论人头像*/
          commentDate:dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
          commentContext:"星星真可爱！",/*评论内容*/
        },
        {
          commentUser:"RiceRollsMaster",/*评论人*/
          commentUserHeads:"",/*评论人头像*/
          commentDate:dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
          commentContext:"星星真可爱啊！！",/*评论内容*/
        },
        {
          commentUser:"RiceRolls",/*评论人*/
          commentUserHeads:"",/*评论人头像*/
          commentDate:dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
          commentContext:"星星真可爱啊啊！！！",/*评论内容*/
        },
      ],/*该动物的评论详情，理应为数组*/
      /*捐款数*/
      animalDonateRecord:[
        {
          donateNumber:1,
          donateUsername:"RiceRollsMan",
          donateDate:dayjs(new Date()).format('YYYY-MM-DD'),
          donateMoney:100,
          donateHopeToUse:"买吃的"
        },
      ],
      isFocus:1/*该动物是否被关注。1：已关注，0：未关注。在添加动物后默认为0，即未关注*/
    },
      {
        animalId: 2,/*动物的id，即key。在添加时由服务器根据数组长度确定，即id=length+1*/
        animalName: "嘻嘻",/*动物的名字*/
        animalIntroduction: "哈巴狗即巴哥犬，起源于中国。哈巴狗有很长的历史，其祖先在16世纪被东印度公司的贸易商带到欧洲，成为王室和贵族的宠爱。该犬体型小而壮实，它严肃的外表掩盖着欢快的性情和优秀的品质。哈巴狗非常聪明，性格外向，富有爱心，是忠实的伴侣犬，它适合新手犬主，对儿童和其他宠物很友好。该犬需要定期运动，但不要求太大生活空间，所以是公寓生活的理想犬种 [1]  。\n" +
            "文化形象",/*动物的介绍*/
        animalGender: 1,/*动物性别。0：雌，1:雄性，2：不详*/
        animalHeads: "https://img2.baidu.com/it/u=928117461,2169899867&fm=26&fmt=auto",/*动物头像的url*/
        animalImages: [
          "https://img0.baidu.com/it/u=3036601401,2573055532&fm=26&fmt=auto",
          "https://img2.baidu.com/it/u=2786543431,2635954328&fm=253&fmt=auto&app=120&f=JPEG?w=513&h=500",
          "https://img0.baidu.com/it/u=3677573824,521012314&fm=26&fmt=auto"
        ],/*动物的照片墙，理应为数组*/
        comments: [
          {
            commentUser: "RiceRollsMan",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "巴哥一定要小心扭到腰，这种狗子腰椎容易受伤，我家狗子之前太兴奋扭到腰了每天低着头缩在窝里，不准别人碰它一碰就尖叫，不吃也不喝瘦了好几斤可把我给心疼坏了",/*评论内容*/
          },
          {
            commentUser: "RiceRollsMaster",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "我一看到八哥总是感觉他头上自带问号？？？笑死了",/*评论内容*/
          },
          {
            commentUser: "RiceRolls",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "看了好多遍了 看到这个封面还是忍不住点进来哈哈哈哈哈哈哈",/*评论内容*/
          },
        ],/*该动物的评论详情，理应为数组*/
        animalDonateRecord: [
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 1000,
            donateHopeToUse: "买吃的"
          },
          {
            donateNumber: 2,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 1000,
            donateHopeToUse: "买喝的"
          },
        ],
        isFocus: 1/*该动物是否被关注。1：已关注，0：未关注。在添加动物后默认为0，即未关注*/
      },{
        animalId: 3,/*动物的id，即key。在添加时由服务器根据数组长度确定，即id=length+1*/
        animalName: "谷歌",/*动物的名字*/
        animalIntroduction: "哈巴狗即巴哥犬，起源于中国。哈巴狗有很长的历史，其祖先在16世纪被东印度公司的贸易商带到欧洲，成为王室和贵族的宠爱。该犬体型小而壮实，它严肃的外表掩盖着欢快的性情和优秀的品质。哈巴狗非常聪明，性格外向，富有爱心，是忠实的伴侣犬，它适合新手犬主，对儿童和其他宠物很友好。该犬需要定期运动，但不要求太大生活空间，所以是公寓生活的理想犬种 [1]  。\n" +
            "文化形象",/*动物的介绍*/
        animalGender: 0,/*动物性别。0：雌，1:雄性，2：不详*/
        animalHeads: "https://img1.baidu.com/it/u=217296114,621272893&fm=26&fmt=auto",/*动物头像的url*/
        animalImages: [
          "https://img0.baidu.com/it/u=1769123035,3748662722&fm=26&fmt=auto",
          "https://img1.baidu.com/it/u=676829151,1862976266&fm=26&fmt=auto",
          "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00738-1883.jpg"
        ],/*动物的照片墙，理应为数组*/
        comments: [
          {
            commentUser: "RiceRollsMan",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "看了好多遍了 看到这个封面还是忍不住点进来哈哈哈哈哈哈哈",/*评论内容*/
          },
          {
            commentUser: "RiceRollsMaster",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "我一看到八哥总是感觉他头上自带问号？？？笑死了",/*评论内容*/
          },
          {
            commentUser: "RiceRolls",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "谷歌真可爱啊啊！！！",/*评论内容*/
          },
        ],/*该动物的评论详情，理应为数组*/
        animalDonateRecord: [
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 100,
            donateHopeToUse: "买吃的"
          },
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 1000,
            donateHopeToUse: "买吃衣服"
          },
        ],
        isFocus: 0/*该动物是否被关注。1：已关注，0：未关注。在添加动物后默认为0，即未关注*/
      },{
        animalId: 4,/*动物的id，即key。在添加时由服务器根据数组长度确定，即id=length+1*/
        animalName: "阿纳",/*动物的名字*/
        animalIntroduction: "哈巴狗即巴哥犬，起源于中国。哈巴狗有很长的历史，其祖先在16世纪被东印度公司的贸易商带到欧洲，成为王室和贵族的宠爱。该犬体型小而壮实，它严肃的外表掩盖着欢快的性情和优秀的品质。哈巴狗非常聪明，性格外向，富有爱心，是忠实的伴侣犬，它适合新手犬主，对儿童和其他宠物很友好。该犬需要定期运动，但不要求太大生活空间，所以是公寓生活的理想犬种 [1]  。\n" +
            "文化形象",/*动物的介绍*/
        animalGender: 0,/*动物性别。0：雌，1:雄性，2：不详*/
        animalHeads: "https://t7.baidu.com/it/u=4256280520,1252070511&fm=193&f=GIF",/*动物头像的url*/
        animalImages: [
          "https://img0.baidu.com/it/u=527545860,668472888&fm=26&fmt=auto",
          "https://img0.baidu.com/it/u=3090286133,3354461826&fm=26&fmt=auto",
          "https://img0.baidu.com/it/u=2198235880,3724730311&fm=26&fmt=auto"
        ],/*动物的照片墙，理应为数组*/
        comments: [
          {
            commentUser: "RiceRollsMan",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "阿八八八",/*评论内容*/
          },
          {
            commentUser: "RiceRollsMaster",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "不管多傲娇的猫，手放到屁股上的瞬间基本上就是你的了",/*评论内容*/
          },
          {
            commentUser: "RiceRolls",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "不带猫粮的撸猫都是白嫖，耍流氓",/*评论内容*/
          },
        ],/*该动物的评论详情，理应为数组*/
        animalDonateRecord: [
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 100,
            donateHopeToUse: "买吃的"
          },
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 100,
            donateHopeToUse: "买药"
          },
        ],
        isFocus: 1/*该动物是否被关注。1：已关注，0：未关注。在添加动物后默认为0，即未关注*/
      },{
        animalId: 5,/*动物的id，即key。在添加时由服务器根据数组长度确定，即id=length+1*/
        animalName: "安安",/*动物的名字*/
        animalIntroduction: "哈巴狗即巴哥犬，起源于中国。哈巴狗有很长的历史，其祖先在16世纪被东印度公司的贸易商带到欧洲，成为王室和贵族的宠爱。该犬体型小而壮实，它严肃的外表掩盖着欢快的性情和优秀的品质。哈巴狗非常聪明，性格外向，富有爱心，是忠实的伴侣犬，它适合新手犬主，对儿童和其他宠物很友好。该犬需要定期运动，但不要求太大生活空间，所以是公寓生活的理想犬种 [1]  。\n" +
            "文化形象",/*动物的介绍*/
        animalGender: 0,/*动物性别。0：雌，1:雄性，2：不详*/
        animalHeads: "https://img0.baidu.com/it/u=2116949321,2616949635&fm=26&fmt=auto",/*动物头像的url*/
        animalImages: [
          "https://img1.baidu.com/it/u=420263346,2046187992&fm=26&fmt=auto",
          "https://img2.baidu.com/it/u=2706768107,1772791863&fm=26&fmt=auto",
          "https://img2.baidu.com/it/u=2363097688,1804655944&fm=26&fmt=auto"
        ],/*动物的照片墙，理应为数组*/
        comments: [
          {
            commentUser: "RiceRollsMan",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "感动猫中国分猫",/*评论内容*/
          },
          {
            commentUser: "RiceRollsMaster",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "不带白嫖的，下次来别忘了带小鱼干或者猫条，猫条要三文鱼味的。",/*评论内容*/
          },
          {
            commentUser: "RiceRolls",/*评论人*/
            commentUserHeads: "",/*评论人头像*/
            commentDate: dayjs(Date.now()).format('YYYY-MM-DD'),/*评论日期*/
            commentContext: "awwwwww太可爱了可恶为什么我总是碰不上猫猫",/*评论内容*/
          },
        ],/*该动物的评论详情，理应为数组*/
        animalDonateRecord: [
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 100,
            donateHopeToUse: "买吃的"
          },
          {
            donateNumber: 1,
            donateUsername: "RiceRollsMan",
            donateDate: dayjs(new Date()).format('YYYY-MM-DD'),
            donateMoney: 100,
            donateHopeToUse: "买玩的"
          },
        ],
        isFocus: 0/*该动物是否被关注。1：已关注，0：未关注。在添加动物后默认为0，即未关注*/
      }]
  },
  /*
  * */
  getters:{
    /*通过动物名字模糊查询获取动物对象*/
    getAnimalsByKeywords(state){
      return function (keywords){
        state.queryKeywords=keywords
        let animalArr=state.animals
        let returnAnimalArr=[]
        console.log(state.animals)
        for(let i=0;i<animalArr.length;i++){
          // console.log(animalArr[i].animalName)
          if(animalArr[i].animalName.includes(keywords)){
            returnAnimalArr.push(animalArr[i])
          }
        }
        return returnAnimalArr
      }
    },
    /*获取评论*/
    getAnimalsComments(state){
      let animalArr=state.animals
      for(let i = 0;i<animalArr.length;i++){
        if(state.animalDetailsId==animalArr[i].animalId){
          return animalArr[i].comments
        }
      }
      return []
    },
    /*获取照片墙*/
    getAnimalsImages(state){
      let animalArr=state.animals
      for(let i = 0;i<animalArr.length;i++){
        if(state.animalDetailsId==animalArr[i].animalId){
          return animalArr[i].animalImages
        }
      }
      return []
    },
    /*获取基本信息*/
    getAnimalsInfo(state){
      let animalArr=state.animals
      for(let i = 0;i<animalArr.length;i++){
        if(state.animalDetailsId==animalArr[i].animalId){
          return {
            animalId:animalArr[i].animalId,
            animalName:animalArr[i].animalName,
            animalHeads:animalArr[i].animalHeads,
            isFocus:animalArr[i].isFocus,
            animalIntroduction:animalArr[i].animalIntroduction,
            animalImages:animalArr[i].animalImages
          }
        }
      }
      return {}
    },
    getDonateRecord(state){
      let animalId=state.animalDetailsId
      let animalArr=state.animals
      for(let i=0;i<animalArr.length;i++){
        if(animalId==animalArr[i].animalId){
          return animalArr[i].animalDonateRecord
        }
      }
    },
    getMyFocusAnimals(state){
      let animals=state.animals
      let myFocusAnimals=[]
      for(let i=0;i<animals.length;i++){
        if(animals[i].isFocus==1){
          myFocusAnimals.push(animals[i])
        }
      }
      return myFocusAnimals
    }
  }
}



export default new Vuex.Store({
  /*把vuex进行模块化*/
  modules:{
    userAbout:userOptions,
    animalAbout:animalOptions
  }
})
