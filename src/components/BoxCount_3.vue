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
    </el-form-item>
    <el-form-item label="成品尺寸">
      <el-col :span="4">
      <el-input placeholder="长" v-model.number="long" >
        <template slot="prepend">长：</template>
      </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
      <el-input placeholder="宽" v-model.number="wide" >
        <template slot="prepend">宽：</template>
      </el-input>
      </el-col >
      <el-col :span="4" :offset="1">
      <el-input placeholder="高" v-model.number="height"  @input.native="test" >
        <template slot="prepend">高：</template>
      </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="数量">
    <el-col :span="4">
      <el-input placeholder="请选择数量" ></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      <el-input placeholder="盖高" v-model="topHeight" >
        <template slot="prepend">盖高:</template>
      </el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      <el-input placeholder="底高" v-model="bottomHeight" >
        <template slot="prepend">底高:</template>
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
      <el-col :span="2" :offset="1">卷边尺寸</el-col>
      <el-col :span="4" >
        <el-input placeholder="卷边尺寸" v-model="curling"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8" :offset="4">
        <el-button type="primary" @click.native="Count" >计算</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <el-dialog title="天地盖-盖到底" v-model="dialogTableVisible" size="large">
    <el-col :span="20">
    盖(外空)：{{long}}*{{wide}}*{{topHeight}}
    盖(内空)：{{topInnerLong}}*{{topInnerWide}}*{{topHeight-thick}}
    </el-col>
    <el-col :span="20">
    底(外空)：{{long}}*{{wide}}*{{bottomHeight}}
    底(内空)：{{topInnerLong}}*{{topInnerWide}}*{{bottomHeight-thick}}
    </el-col>
    <el-tabs type="border-card">
      <keep-alive>
        <el-tab-pane label="部件展开图">
          <div id="topDevelopment" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
          <div id="bottomDevelopment" class="jxgbox" style="width:370px;height:250px;"></div>
          <div id="incloseDevelopment" class="jxgbox" style="width:370px; height:250px;float:left;"></div>
        </el-tab-pane>
      </keep-alive>
      <el-tab-pane label="纸板">
        <el-col :span="24">
          盖-实际需求纸板：<label>{{topCardboardLong}}*{{topCardboardWide}}</label>
          请选择开料方式：
          <el-radio-group v-model="topCountMode">
            <el-radio :label="3">大度</el-radio>
            <el-radio :label="6">正度</el-radio>
          </el-radio-group>
           <el-button type="info" @click.native="Print">打印施工图</el-button>
        </el-col>
        <el-col :span="24">
          <div id="box" class="jxgbox" style="width:370px; height:250px;float:left;"></div>
          <div id="box1" class="jxgbox" style="width:370px; height:250px;float:left;"></div>
        </el-col>
        <el-col :span="22">
          底-实际需求纸板<label>{{bottomCardboardLong}}*{{bottomCardboardWide}}</label>
        </el-col>
        <el-col :span="24">
          <div id="box2" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
          <div id="box3" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
        </el-col>
        <el-col :span="22">
          围框-实际需求纸板<label>{{incloseLong}}*{{incloseWide}}*2</label>
        </el-col>
        <el-col :span="24">
          <div id="incloseZ" class="jxgbox" style="width:370px; height:250px;float:left;"></div>
          <div id="incloseD" class="jxgbox" style="width:370px; height:250px;float:left;"></div>
        </el-col> 
      </el-tab-pane>
      <el-tab-pane label="包纸">
        <el-col :span="24">
          盖-包纸：{{topColorSurfaceLong}}*{{topColorSurfaceWide}}
        </el-col>
        <el-col :span="24">
          <div id="box4" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
          <div id="box5" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
        </el-col>
        <el-col :span="24">
          底-包纸：{{bottomColorSurfaceLong}}*{{bottomColorSurfaceWide}}
        </el-col>
        <el-col :span="24">
          <div id="box6" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
          <div id="box7" class="jxgbox" style="width:370px;height:250px;float:left;"></div>
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
      long:'',
      wide:240,
      height:40,
      topHeight:20,
      bottomHeight:20,
      thick:'2',
      topCountMode:'',
      curling:15,
      technique:'1'
    }
  },
  components: {
    
  },
  mixins: [selectData],
  computed:{
    topInnerLong:function(){//盖内空长
      return this.long-this.thick*2;
    },
    topInnerWide:function(){//盖内空宽
      return this.wide-this.thick*2;
    },
    bottomBack:function(){//根据盒型，以及高度设置底缩减尺寸
      if(this.height>40){
        return 3;
      }else{
        return 2;
      }
    },
    techniqueCheage:function(){
      return this.technique=='1' ? 3 : 10; 
    },
    topCardboardLong:function(){//盖盒纸板：长
      return Number(this.long)+Number(this.topHeight*2);
    },
    topCardboardWide:function(){//盖盒纸板：宽
      return Number(this.wide)+Number(this.topHeight*2);
    },
    bottomCardboardLong:function(){
      return Number(this.long)+Number(this.bottomHeight*2);
    },
    bottomCardboardWide:function(){
      return Number(this.wide)+Number(this.bottomHeight*2);
    },
    topColorSurfaceLong:function(){
      return Number(this.long)+Number(this.topHeight)*2+Number(this.thick)*2+Number(this.curling)*2+1;
    },
    topColorSurfaceWide:function(){
      return Number(this.wide)+Number(this.topHeight)*2+Number(this.thick)*2+Number(this.curling)*2+1;
    },
    bottomColorSurfaceLong:function(){
      return Number(this.long)+(this.bottomHeight)*2+this.curling*2+this.thick*2+1;
    },
    bottomColorSurfaceWide:function(){
      return Number(this.wide)+(this.bottomHeight)*2+this.curling*2+this.thick*2+1;
    },
    incloseLong:function(){//围框长(一半)
      return Number(this.long)+Number(this.wide)-this.thick*4;
    },
    incloseWide:function(){
      return this.height-this.thick*2;
    }
  },
  methods:{
    test:function(e){
      this.$nextTick(function () {
         this.topHeight=this.height/2;
         this.bottomHeight=this.height/2;
      });
    },
    BottomHeight:function(){
      this.$nextTick(function () {
        console.log(this.bottomHeight);
        this.height=Number(this.bottomHeight)+Number(this.thick);
      });
    },
    Count:function(){
      this.dialogTableVisible = true;
      this.$nextTick(function () {
        SizeCount.TopBottomdDevelopment('topDevelopment',this.long,this.wide,this.topHeight,'盖盒');
        SizeCount.TopBottomdDevelopment('bottomDevelopment',this.long,this.wide,this.bottomHeight,'底盒');
        //围框图
        console.log(this.incloseLong);
        SizeCount.inclose('incloseDevelopment',this.incloseLong,this.incloseWide,this.long-this.thick*2,'围框');
        //围框开别
        SizeCount.DJSXkb('incloseD',this.incloseLong,this.incloseLong,this.incloseWide,this.incloseWide,'');
        SizeCount.ZJSXkb('incloseZ',this.incloseLong,this.incloseLong,this.incloseWide,this.incloseWide,'');
        SizeCount.DJSXkb('box',this.topCardboardLong,this.topCardboardLong+this.techniqueCheage,this.topCardboardWide,this.topCardboardWide+this.techniqueCheage,'盖盒');
        SizeCount.ZJSXkb('box1',this.topCardboardLong,this.topCardboardLong+this.techniqueCheage,this.topCardboardWide,this.topCardboardWide+this.techniqueCheage,'盖盒');
        SizeCount.DJSXkb('box2',this.bottomCardboardLong,this.bottomCardboardLong+this.techniqueCheage,this.bottomCardboardWide,this.bottomCardboardWide+this.techniqueCheage,' ');
        SizeCount.ZJSXkb('box3',this.bottomCardboardLong,this.bottomCardboardLong+this.techniqueCheage,this.bottomCardboardWide,this.bottomCardboardWide+this.techniqueCheage,' ');
        SizeCount.DJSXkb('box4',this.topColorSurfaceLong,this.topColorSurfaceLong,this.topColorSurfaceWide,this.topColorSurfaceWide,' ');
        SizeCount.ZJSXkb('box5',this.topColorSurfaceLong,this.topColorSurfaceLong,this.topColorSurfaceWide,this.topColorSurfaceWide,' ');
        SizeCount.DJSXkb('box6',this.bottomColorSurfaceLong,this.bottomColorSurfaceLong,this.bottomColorSurfaceWide,this.bottomColorSurfaceWide,' ');
        SizeCount.ZJSXkb('box7',this.bottomColorSurfaceLong,this.bottomColorSurfaceLong,this.bottomColorSurfaceWide,this.bottomColorSurfaceWide,' ');
      });
    }
  }
}
</script>