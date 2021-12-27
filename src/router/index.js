import Vue from 'vue'
import VueRouter from 'vue-router'
import myMain from "../views/myMain";
import myIndex from "../views/myIndex";
import mySignup from "../views/mySignup";
import myAnimalDetails from "../views/myAnimalDetails";
import myDonatePage from "../views/myDonatePage";
import myAdmin from "../views/myAdmin";
import contribute from "../components/contribute";

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
      }
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
