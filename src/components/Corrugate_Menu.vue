<template>
<div>
  <el-row :gutter="20">
  <el-col :span="3">
    <el-card :body-style="{ padding: '0px' }" class="menuImage" @click.native="CheckBoxType(1)">
      <img src="../assets/08.png" >
      <div style="text-align:center">
        <div class="name" v-bind:class="{'className':id==1}">提手盒</div>
      </div>
    </el-card>
  </el-col>
  </el-col>
    <el-col :span="3">
    <el-card :body-style="{ padding: '0px' }" class="menuImage" @click.native="CheckBoxType(2)">
      <img src="../assets/07.png" >
      <div style="text-align:center">
        <div class="name" v-bind:class="{'className':id==2}">双插盒</div>
      </div>
    </el-card>
  </el-col>
  </el-col>
    <el-col :span="3">
    <el-card :body-style="{ padding: '0px' }" class="menuImage" @click.native="CheckBoxType(4)">
      <img src="../assets/05.png" >
      <div style="text-align:center">
        <div class="name" v-bind:class="{'className':id==4}">抽屉盒</div>
      </div>
    </el-card>
  </el-col>
  </el-col>
    <el-col :span="3">
    <el-card :body-style="{ padding: '0px' }" class="menuImage" @click.native="CheckBoxType(3)">
      <img src="../assets/04.png" >
      <div style="text-align:center">
        <div class="name" v-bind:class="{'className':id==3}">飞机盒</div>
      </div>
    </el-card>
  </el-col>
  <el-col :span="6" :offset="6">
    <img id="imagedetails" :src="imagename" style="width:310px;height:280px">
  </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  data () {
    return {
      id:1,
      imagename:require('../assets/0801.png'),
    }
  },
  props:{
    
  },
  methods:{
    CheckBoxType:function(id){
      if(id==2){
        this.imagename=require('../assets/0701.png');
        this.id=2;
      }else if(id==1){
        this.imagename=require('../assets/0801.png')
        this.id=1;
      }else if(id==3){
        this.imagename=require('../assets/0401.png');
        this.id=3;
      }else if(id==4){
        this.imagename=require('../assets/0501.png');
        this.id=4;
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