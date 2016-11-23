<template>
  <div @keyup.enter="js">
    <el-form>
      <el-form-item label="请输入纸箱尺寸">
        <el-col :span="3">
          <el-input placeholder="长" v-model.number="cartonLong"></el-input>
        </el-col>
          <el-col class="line" :span="1" style="text-align: center;">X</el-col>
        <el-col :span="3">
          <el-input placeholder="宽" v-model.number="cartonWide" style="display: inline-block;"></el-input>
        </el-col>
          <el-col class="line" :span="1" style="text-align: center;">X</el-col>
        <el-col :span="3">
          <el-input placeholder="高" v-model.number="cartonHeight" style="display: inline-block;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="请输入产品尺寸">
        <el-col :span="3">
          <el-input placeholder="长" v-model.number="long"></el-input>
        </el-col>
          <el-col class="line" :span="1" style="text-align: center;">X</el-col>
        <el-col :span="3">
          <el-input placeholder="宽" v-model.number="wide" style="display: inline-block;"></el-input>
        </el-col>
          <el-col class="line" :span="1" style="text-align: center;">X</el-col>
        <el-col :span="3">
          <el-input placeholder="高" v-model.number="height" style="display: inline-block;"></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click.native="js">计算</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <label>可放：{{count}}个</label>
  </div>
</template>
<script>
import SizeCount from '../lib/SizeCount.js'
export default {
  data () {
    return {
			long:'',
      wide:'',
      height:'',
      cartonLong:530,
      cartonWide:480,
      cartonHeight:330,
      count:''
    }
  },
  methods:{
    js: function (event) {
      //console.log(SizeCount.carton(this.cartonLong,this.cartonWide,this.cartonHeight,this.long,this.wide,this.height));
      this.count=SizeCount.carton(this.cartonLong,this.cartonWide,this.cartonHeight,this.long,this.wide,this.height);
    }
  }
}
</script>
<style>

</style>