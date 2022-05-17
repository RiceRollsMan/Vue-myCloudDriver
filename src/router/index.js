import Vue from 'vue'
import VueRouter from 'vue-router'
import test1 from "../views/test1";
import test2 from "../views/test2";
import showFiles from "../views/showFiles";
import upLoadFile from "../views/upLoadFile";
import showFiles2 from "../views/showFiles2";
import showFiles3 from "../views/showFiles3";
import bin from "../views/bin";


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"test1",
    component: test1,
  },
  {
    path:"/test2",
    name:"test2",
    component: test2,
  },
  {
    path:"/showFiles",
    name:"showFiles",
    component: showFiles,
  },
  {
    path:"/upLoadFile",
    name:"upLoadFile",
    component: upLoadFile,
  },
  {
    path:"/showFiles2",
    name:"showFiles2",
    component: showFiles2,
  },
  {
    path:"/showFiles3",
    name:"showFiles3",
    component: showFiles3,
  },
  {
    path:"/bin",
    name:"bin",
    component: bin,
  }
]

const router = new VueRouter({
  routes
})

export default router
