<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-caret-right"></i>动物信息</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <!--插入的地方-->
                <router-link to="/animal/describe">描述信息</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-caret-right"></i>捐助信息</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link to="/contribute">捐助记录</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <h1>管理员页面</h1>
        </el-header>
        <el-main>
          <!--在这里展示视图-->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import contribute from "../components/contribute";

export default {
  name: "myAdmin",
  components:{
    contribute:contribute
  }
}
</script>

<style scoped>

</style>