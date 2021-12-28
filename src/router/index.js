import Vue from 'vue'
import VueRouter from 'vue-router'
import myMain from "../views/myMain";
import myIndex from "../views/myIndex";
import mySignup from "../views/mySignup";
import myAnimalDetails from "../views/myAnimalDetails";
import myDonatePage from "../views/myDonatePage";
import myAdmin from "../views/myAdmin";
import contribute from "../components/contribute";
import myPersonalCenter from "../views/myPersonalCenter";
import animalsDescription from "../components/animalsDescription";

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"myIndex",
    component: myIndex,
  },
  {
    path:"/myMain",
    name:"MyMain",
    component: myMain
  },
  {
    path:"/mySignup",
    name:"MySignup",
    component: mySignup
  },
  {
    path:"/myAnimalDetails",
    name:"myAnimalDetails",
    component: myAnimalDetails
  },
  {
    path:"/myDonatePage",
    name:"myDonatePage",
    component: myDonatePage
  },
  {
    path:"/myAdmin",
    name:"myAdmin",
    component: myAdmin,
    children:[
      {
        path:"/contribute",
        name:"contribute",
        component:contribute
      },
      {
        path:"/animalsDescription",
        name:"animalsDescription",
        component:animalsDescription
      },

    ]
  },
  {
    path:"/myPersonalCenter",
    name:"myPersonalCenter",
    component: myPersonalCenter,
  }
]

const router = new VueRouter({
  routes
})

export default router
