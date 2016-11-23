<template>
<div>
<el-form  label-width="90px" >
  <el-form-item label="工艺">
    <el-col :span="4">
      <el-select placeholder="请选择工艺" v-model="technique">
        <el-option label="V槽" value="1"></el-option>
        <el-option label="半断" value="2"></el-option>
      </el-select>
    </el-col>
    <el-col :span="2" :offset="1">搭口方式</el-col>
    <el-col :span="4" >
      <el-select placeholder="请选择搭口方式" v-model="take">
        <el-option label="齐下口" value="1"></el-option>
        <el-option label="齐盒高" value="2"></el-option>
      </el-select>
    </el-col>
    <el-col :span="2" :offset="1">内盒缩进尺寸</el-col>
    <el-col :span="4" >
      <el-tooltip placement="top">
        <div slot="content">此值为一边值，计算会自动X2</div>
        <el-input placeholder="内盒缩减尺寸" v-model="insidecut"></el-input>
      </el-tooltip>
    </el-col>
    </el-form-item>
    <el-form-item label="成品尺寸">
      <el-col :span="4">
      <el-input placeholder="长" v-model.number="long">
        <template slot="prepend">长：</template>
      </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
      <el-input placeholder="宽" v-model="wide">
        <template slot="prepend">宽：</template>
      </el-input>
      </el-col >
      <el-col :span="4" :offset="1">
      <el-input placeholder="高" v-model="height">
        <template slot="prepend">高：</template>
      </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="纸板厚度">
      <el-col :span="4">
      <el-select  placeholder="请选择厚度" v-model="thick">
        <el-option v-for="item in this.thicks" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="1" :offset="1">卷边</el-col>
      <el-col :span="4" >
        <el-input placeholder="卷边尺寸" v-model="curling"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="数量">
    <el-col :span="4">
      <el-input placeholder="请选择数量" ></el-input>
    </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8" :offset="4">
        <el-button type="primary" @click.native="Count" >计算</el-button>
      </el-col>
    </el-form-item>
</el-form>
<el-dialog title="书型盒" v-model="dialogTableVisible" size="large">
  <el-col :span="20">
    皮壳尺寸：{{hullLong}}*{{hullWide}}
  </el-col>
  <el-col :span="20">
    内盒(外空)：{{boxOuterlong}}*{{boxOuterWide}}*{{boxOuterHeight}}
    内盒(内空)：{{boxOuterlong-thick*2}}*{{boxOuterWide-thick*2}}*{{boxOuterHeight-thick}}
  </el-col>
    <el-tabs type="border-card">
      <keep-alive>
        <el-tab-pane label="部件展开图">
          <div id="hullDevelopment" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
          <div id="boxOuterDevelopment" class="jxgbox" style="width:370px;height:260px;"></div>
        </el-tab-pane>
      </keep-alive>
      <el-tab-pane label="纸板">
        <el-col :span="24">
          皮壳-实际需求纸板：<label>{{hullLong}}*{{hullWide}}</label>
        </el-col>
        <el-col :span="24">
          <div id="box" class="jxgbox" style="width:370px; height:260px;float:left;"></div>
          <div id="box1" class="jxgbox" style="width:370px; height:260px;float:left;"></div>
        </el-col>
        <el-col :span="22">
          内盒-实际需求纸板<label>{{boxOuterCardboardLong}}*{{boxOuterCardboardWide}}</label>
        </el-col>
        <el-col :span="24">
          <div id="box2" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
          <div id="box3" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="包纸">
        <el-col :span="24">
          皮壳-包纸：{{hullColorSurfaceLong}}*{{hullColorSurfaceWide}}
        </el-col>
        <el-col :span="24">
          <div id="box4" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
          <div id="box5" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
        </el-col>
        <el-col :span="24">
          内盒-包纸：{{boxOuterColorSurfaceLong}}*{{boxOuterColorSurfaceWide}}
        </el-col>
        <el-col :span="24">
          <div id="box6" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
          <div id="box7" class="jxgbox" style="width:370px;height:260px;float:left;"></div>
        </el-col>
      </el-tab-pane>
    </el-tabs>
</el-dialog>
</div>
</template>

<script>
import SizeCount from '../lib/SizeCount.js'
import selectData from '../data/selectData.vue'
export default {
  data () {
    return {
      dialogTableVisible:false,
      id:1,
      long:240,
      wide:240,
      height:40,
      take:'1',
      bottomHeight:38,
      topHeight:40,
      thick:'2',
      topCountMode:'',
      curling:15,
      technique:'1',
      insidecut:2
    }
  },
  components: {
    
  },
  mixins: [selectData],
  computed:{
    hullLong:function(){
      return this.take=='1' ? this.wide*2+this.height*2-this.thick-1 : this.wide*2+this.height*2-this.thick-0.5;
    },
    hullWide:function(){
      return this.long;
    },
    hullResolve:function(){//皮壳分解尺寸，用于绘制皮壳结构图
     if(this.take=='1'){
      return {toplong:this.wide,height:this.height,bottomlong:this.wide,takeheigt:this.height-this.thick-1};
     }else if(this.take=='2'){
      return {toplong:this.wide-this.thick-0.5,height:this.height,bottomlong:this.wide,takeheigt:this.height};
     }
    },
    techniqueCheage:function(){
      return this.technique=='1' ? 3 : 10; 
    },
    boxOuterlong:function(){
      return this.long-this.insidecut*2;
    },
    boxOuterWide:function(){
      return this.wide-this.thick*2-1;
    },
    boxOuterHeight:function(){
      return this.height-this.thick*2;
    },
    boxOuterCardboardLong:function(){
      return this.boxOuterlong+this.boxOuterHeight*2;
    },
    boxOuterCardboardWide:function(){
      return this.boxOuterWide+this.boxOuterHeight*2;
    },
    hullColorSurfaceLong:function(){
      return this.hullLong+this.thick*2+this.curling;
    },
    hullColorSurfaceWide:function(){
      return this.hullWide+this.thick*2+this.curling*2;
    },
    boxOuterColorSurfaceLong:function(){
      return this.boxOuterCardboardLong+this.thick*2+this.curling*2
    },
    boxOuterColorSurfaceWide:function(){
      return this.boxOuterCardboardWide+this.thick*2+this.curling*2
    }
  },
  methods:{
    Count:function(){
      this.dialogTableVisible = true;
      this.$nextTick(function () {
        SizeCount.Hull('hullDevelopment',this.hullLong,this.hullWide,this.hullResolve.toplong,this.hullResolve.height,this.hullResolve.bottomlong,this.hullResolve.takeheigt);
        SizeCount.TopBottomdDevelopment('boxOuterDevelopment',this.boxOuterlong,this.boxOuterWide,this.boxOuterHeight,'内盒');
        SizeCount.DJSXkb('box',this.hullLong,this.hullLong+this.techniqueCheage,this.hullWide,this.hullWide+this.techniqueCheage,'');
        SizeCount.ZJSXkb('box1',this.hullLong,this.hullLong+this.techniqueCheage,this.hullWide,this.hullWide+this.techniqueCheage,'');
        console.log(this.hullWide+this.techniqueCheage);
        SizeCount.DJSXkb('box2',this.boxOuterCardboardLong,this.boxOuterCardboardLong+this.techniqueCheage,this.boxOuterCardboardWide,this.boxOuterCardboardWide+this.techniqueCheage,'');
        SizeCount.ZJSXkb('box3',this.boxOuterCardboardLong,this.boxOuterCardboardLong+this.techniqueCheage,this.boxOuterCardboardWide,this.boxOuterCardboardWide+this.techniqueCheage,'');
        SizeCount.DJSXkb('box4',this.hullColorSurfaceLong,this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.hullColorSurfaceWide,'');
        SizeCount.ZJSXkb('box5',this.hullColorSurfaceLong,this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.hullColorSurfaceWide,'');
        SizeCount.DJSXkb('box6',this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceWide,this.boxOuterColorSurfaceWide,'');
        SizeCount.ZJSXkb('box7',this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceWide,this.boxOuterColorSurfaceWide,'');
      });
    }
  }
}
</script>