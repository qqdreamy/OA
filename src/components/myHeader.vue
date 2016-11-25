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
</div>
</template>

<script>
export default {
  data () {
    return {
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
      this.$router.push('/PriceSet')
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