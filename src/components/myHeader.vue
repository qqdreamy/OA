<template>
<div class="hero-head">
  <nav class="nav has-shadow">
    <div class="nav-left">
      <a class="nav-item is-brand" href="#">
        <img src="../assets/logo123.png" alt="Bulma logo">
      </a>
    </div>
    <div class="nav-center">
    <a class="nav-item is-brand" href="#/">
      报价系统
    </a>
    </div>
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
  </nav>
  <el-dialog title="输入管理员密码" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="管理员邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="密码" :label-width="formLabelWidth">
      <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Login" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
  </div>
</el-dialog>
</div>
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
     /* var config = {
        authDomain: "decbzoa.wilddog.com",
        syncURL: "https://decbzoa.wilddogio.com"
      };
      wilddog.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
      .then(()=> {
        this.dialogFormVisible=false;
        this.fullscreenLoading=false;
        this.$router.push('/PriceSet');
      }).catch(err=> {
        this.fullscreenLoading=false;
        console.log('login failed ->',err);
      });*/
    }
  }
}

</script>


<style lang="scss" scoped>
$family-primary: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif; 
$body-background: #fff;
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/base/generic";
@import "~bulma/sass/components/nav";
</style>