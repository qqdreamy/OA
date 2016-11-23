<template>
<div>
  <el-row :gutter="20">
  <el-col :span="3">
    <el-card :body-style="{ padding: '0px' }" class="menuImage" @click.native="CheckBoxType(1)">
      <img src="../assets/bookbox11.png" >
      <div style="text-align:center">
        <div class="name" v-bind:class="{'className':id==1}">台历架</div>
      </div>
    </el-card>
  </el-col>
  <el-col :span="6" :offset="6">
    <img id="imagedetails" :src="imagename" style="width:235px;height:168px">
  </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  data () {
    return {
      id:1,
      imagename:require('../assets/bookbox111.png'),
    }
  },
  props:{
    
  },
  methods:{
    CheckBoxType:function(id){
      if(id==2){
        this.imagename=require('../assets/topbox22.png');
        this.id=2;
      }else if(id==1){
        this.imagename=require('../assets/bookbox111.png')
        this.id=1;
      }else if(id==3){
        this.imagename=require('../assets/topbox33.png');
        this.id=3;
      }
      this.$emit('updateID',this.id);
    }
  }
}
</script>

<style>
  .menuImage{
    text-align:center;
  }
  .menuImage:hover{
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
  }
  .name{
    width: 100%;
    height: 35px;
    border-top: 1px solid #eaeefb;
    font-size: 12px;
    color: #8492a6;
    line-height: 35px;
    text-align: center;
  }
  .name:hover{
    background-color:#20a0ff;
    color:#fff;
    bottom:5px;
    cursor: pointer;
  }
  .className{
    background-color:#20a0ff;
    color:#fff;
  }
</style>