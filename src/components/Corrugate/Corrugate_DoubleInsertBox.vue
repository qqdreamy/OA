<template>
<div>
  <el-form label-width="80px">
    <el-form-item label="纸板">
      <el-col :span="4">
        <el-input placeholder="" v-model.number="long">
          <template slot="prepend">长：</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="" v-model.number="wide">
          <template slot="prepend">侧宽：</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="" v-model.number="height">
          <template slot="prepend">高：</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="数量">
      <el-col :span="4">
        <el-select placeholder="请订单数量" v-model="quantity">
          <el-option v-for="item in this.quantitys" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="材料">
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="paper">
          <el-option label="白卡纸" value="白卡纸"></el-option>
          <el-option label="灰板纸" value="灰板纸"></el-option>
          <el-option label="牛皮纸" value="牛皮纸"></el-option>
          <el-option label="自设纸" value="自设纸"></el-option>
        </el-select>
      </el-col>
       <el-col :span="3" :offset="1">
        <template v-if="paper!='自设纸'">
          <el-select placeholder="请选择克重" v-model="paperWeight">
            <el-option label="200g" value="200"></el-option>
            <el-option label="250g" value="250"></el-option>
            <el-option label="300g" value="300"></el-option>
            <el-option label="350g" value="350"></el-option>
          </el-select>
        </template>
        <template v-if="paper=='自设纸'">
          <el-input placeholder="单价" v-model="pagePrice">
            <template slot="append">元</template>
          </el-input>
        </template>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择印刷" v-model="print">
          <el-option label="四色" value="1"></el-option>
          <el-option label="单色" value="2"></el-option>
          <el-option label="专色" value="3"></el-option>
          <el-option label="无需印刷" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-checkbox class="checkbox" v-model="film">覆膜</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item label="成品工艺">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isCorrugated">裱瓦</el-checkbox>
      </el-col>
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="ispermed">烫处理</el-checkbox>
      </el-col>
      <template v-if="ispermed">
        <el-col :span="3" >
          <el-select placeholder="请选择烫金" v-model="permed">
            <el-option label="烫一个部分" value="1"></el-option>
            <el-option label="烫两个部分" value="2"></el-option>
            <el-option label="烫多个部分" value="3"></el-option>
          </el-select>
        </el-col>
      </template>
    </el-form-item>
    <el-form-item>
      <el-col :span="8" :offset="6">
        <el-button type="primary" @click.native="CountPrice">报价</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <dialogPrice v-on:closePrice="closePrice" :dialogPriceVisible="dialogPriceVisible">
     <p slot="list"> 
      纸张：{{this.boxPrice.Cardboard}}
      印刷：{{this.boxPrice.print}}</br>
      覆膜:{{this.boxPrice.film}}</br>
      烫金：{{this.boxPrice.permed}}
      加工费:{{this.boxPrice.process}}
     </p>
    <P slot="count">合计：{{this.boxPrice.count}}</P>
  </dialogPrice>
</div>
</template>

<script>
import SizeCount from '../../lib/SizeCount.js'
import selectData from '../../data/selectData.vue'
import js_CountPrice from '../../lib/CountPrice.js'
import dialogPrice from '../../components/dialogPrice.vue'

export default {
  data () {
    return {
      isCorrugated:false,
      long:200,
      wide:100,
      height:200,
      paper:'白卡纸',
      paperWeight:'300',
      quantity:'1000',
      print:'1',
      film:false,
      ispermed:0,
      permed:'1',
      material:'1',
      bump:0,
      pagePrice:0,
      dialogPriceVisible:false,
      boxPrice:{
        count:0,
        process:0,
        film:0,
        permed:0,
        Cardboard:0,
        print:0,
      }
    }
  },
  mixins: [selectData],
  components: {
    dialogPrice
  },
  computed:{
    ExpandLong:function(){
      return Number(this.long*2+this.wide*2+20);
    },
    ExpandWide:function(){
      return Number(this.height+this.wide*4);
    }
  },
  methods:{
    closePrice:function(){//清空价格数据
    this.dialogPriceVisible=false;
    for (var i in this.boxPrice){
      this.boxPrice[i]=0;
    }
  },
    CountPrice:function(){
      js_CountPrice.KaHePromise(this.ExpandLong,this.ExpandWide,this.quantity).then(value=>{
        console.log('加工费'+value);
        this.boxPrice.process=value.toFixed(2);
      }).then(()=>{//纸张价格
        if(this.paper=='自设纸'){
          this.boxPrice.Cardboard=js_CountPrice.ColorSurfacePromise(this.ExpandLong,this.ExpandWide,this.paper,this.paperWeight,this.pagePrice).toFixed(2);
        }else {
          return js_CountPrice.ColorSurfacePromise(this.ExpandLong,this.ExpandWide,this.paper,this.paperWeight).then(value=>{
            this.boxPrice.Cardboard=value.toFixed(2);
          });
        }
      }).then(()=>{//计算印刷
        if(this.print!='4'){
          return js_CountPrice.PrintPromise(this.ExpandLong,this.ExpandWide,this.quantity,this.print).then(value=>{
            this.boxPrice.print=value.toFixed(2);
          })
        }
      }).then(()=>{
        if(this.film){
          return js_CountPrice.FilmPromise(this.ExpandLong,this.ExpandWide,this.quantity).then(value=>{
            this.boxPrice.film=value.toFixed(2);
          })
        }
      }).then(()=>{
        if(!this.isCorrugated){
          return js_CountPrice.StickyBox(this.quantity).then(value=>{
            this.boxPrice.process=(Number(value)+Number(this.boxPrice.process)).toFixed(2);
          })
        }
      }).then(()=>{
        if(this.ispermed){
          return js_CountPrice.PermedPromise(this.permed,this.quantity).then(value=>{
            this.boxPrice.permed=value.toFixed(2);
          }) 
        }
      }).then(()=>{
        for (var i in this.boxPrice){
          this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
        }
        this.boxPrice.count=(this.boxPrice.count*1.3).toFixed(2);
        this.dialogPriceVisible=true;
        this.loading=false;
      })
    }
  }
}
</script>