<template>
  <div @keyup.enter="js">
    <el-form>
      <el-form-item label="请输入尺寸">
        <el-col :span="5">
          <el-input placeholder="长" v-model="long"></el-input>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center;">X</el-col>
          <el-col :span="6">
          <el-input placeholder="宽" v-model="wide" style="display: inline-block;"></el-input>
          </el-col>
          <el-col :span="2">
          <el-button type="primary" @click.native="js">计算</el-button>
          </el-col>
      </el-form-item>
    </el-form>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item>
        克重
        <el-select v-model="weight">
          <el-option-group v-for="group in Weights" :label="group.label">
            <el-option v-for="item in group.options" :label="item.label" :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item>
        吨价
        <el-input placeholder="请输入内容"  v-model="tonprice">
        </el-input>
      </el-form-item>
      <el-form-item>
        数量<el-input placeholder="请输入内容"  v-model="quantity">
        </el-input>
      </el-form-item>
    </el-form>
    <div id="box" class="jxgbox" style="width:400px; height:400px;float:left;"></div>
    
    <div id="box2" class="jxgbox" style="width:400px; height:400px;"></div></br>
    <label>大度-价格：{{D}}</label>
    <label>正度-价格：{{Z}}</label>
    (含切纸费)
  </div>
</template>
<script>
import SizeCount from '../lib/SizeCount.js'
import CountPrice from '../lib/CountPrice.js'
export default {
  data () {
    return {
			long:'',
      wide:'',
      weight:'',
      tonprice:'',
      quantity:'',
      D:0,
      Z:0,
      Weights:[{
      label:'纸板',
        options:[{
          value:'1.5',
          label:'1.5mm'
        },{
          value:'2',
          label:'2.0mm'
        },{
          value:'2.5',
          label:'2.5mm'
        },{
          value:'3',
          label:'3.0mm'
        }]
      }]
    }
  },
  computed:{
    reamD:function(){
      return (this.tonprice/1884*this.weight).toFixed(2);
    },
    reamZ:function(){
      return (this.tonprice/2327*this.weight).toFixed(2);
    },
    priceD:function(){
      return (this.reamD/500);
    },
    priceZ:function(){
      return (this.reamZ/500);
    }
  },
  methods:{
    js: function (event) {
      var c=this.long;
      var k=this.wide;
      let reD=SizeCount.DJSXkb('box',c,c,k,k,'大度');
      let reZ=SizeCount.ZJSXkb('box2',c,c,k,k,'正度');
      let Price=CountPrice.CheckCardboard(c,k,this.tonprice,this.weight,this.quantity,true);
      this.D=Price.d.toFixed(2);
      this.Z=Price.z.toFixed(2);
    }
  }
}
</script>
<style>
@import '../lib/jsxgraph.css'
</style>