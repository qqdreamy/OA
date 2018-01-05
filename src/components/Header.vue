<template>
<div>
  <el-row>
    <el-col :span="4">
      <img src="../assets/logo123.png" class="header-logo">
    </el-col>
    <el-col :span="4" :offset="16">
      <el-menu  @select="selectNavMenu" background-color="#409EFF" text-color="#fff" active-text-color="#fff" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="1">处理中心</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <el-dialog title="用户验证" :visible.sync="dialogFormVisible">
    用户名:<el-input v-model="form.email" auto-complete="off"></el-input>
    <div style="margin: 20px 0;"></div>
    密码:<el-input v-model="form.password" auto-complete="off"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      form: {
        email: 'liubowen@qq.com',
        password: ''
      }
    }
  },
  methods: {
    // 顶部导航菜单选择事件
    selectNavMenu (key, keyPath) {
      if (key === '1') {
        this.$emit('PriceSet')
        // this.addTab('价格设置', '/PriceSet')
      }
    },
    setPrice: function () {
      this.$router.push('/PriceSet')
    }
  }
}
</script>

<style>
.header-logo {
  display: inline-block;
  vertical-align: middle;
  margin-top: 7px;
}
.header-operations {
  display: inline-block;
  padding-right: 30px;
  height: 100%;
}
.header-operations li {
  color: #fff;
  display: inline-block;
  vertical-align: middle;
  padding: 0 10px;
  margin: 0 10px;
  cursor: pointer;
}
</style>