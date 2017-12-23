<template>
  <el-row>
    <el-col :span="4">
      <img src="../assets/logo123.png" class="header-logo">
    </el-col>
    <el-col :span="3" :offset="17">
    <div class="nav-right nav-menu">
     <span class="nav-item">
      <el-dropdown @command="js" >
        <el-button type="primary">
          其他工具<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">纸张开别计算</el-dropdown-item>
          <el-dropdown-item command="2">纸张价格计算</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" @click="Setting" icon="setting" style="margin-left:5px"></el-button>
      </span>
    </div>
    </el-col>
  </el-row>
</template>

<script>
import AV from 'leancloud-storage'
export default {
  data () {
    return {
      fullscreenLoading:false,
      dialogFormVisible:false,
      form: {
        email: 'liubowen@qq.com',
        password: '',
      }
    }
  },
  methods:{
    js:function(index){
      if(index==1){
        this.$router.push('/SizeCount');
      }else if(index==2){
        this.$router.push('/PaperTransform');
      }
    },
    Setting:function(){
      this.dialogFormVisible=true;
      //this.$router.push('/PriceSet')
    },
    Login:function(){
      this.fullscreenLoading=true;
      //实例化储存对象
      const appId = 'cjtOItWI6rsyCzjvJCh9iSMH-gzGzoHsz';
      const appKey = '5uIGW67Gq2wbEnLaD7IlVUHu';
      AV.init({ appId, appKey });
      // 新建 AVUser 对象实例
      /*var user = new AV.User();
      // 设置用户名
      user.setUsername('liubowen@qq.com');
      // 设置密码
      user.setPassword('226650');
      // 设置邮箱
      user.setEmail('liubowen@qq.com');
      user.signUp().then(function (loginedUser) {
          console.log(loginedUser);
      }, function (error) {
      });*/
      //用户登录
      AV.User.logIn(this.form.email, this.form.password).then(loginedUser=> {
        this.dialogFormVisible=false;
        this.fullscreenLoading=false;
        this.$router.push('/PriceSet');
      }, function (error) {
        alert(JSON.stringify(error));
      });
    }
  }
}

</script>

<style>
.header-logo {
    display: inline-block;
    vertical-align: middle;
}
</style>