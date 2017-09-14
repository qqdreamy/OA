<template>
<div>
  <el-form label-width="80px">
    <el-form-item label="材料">
      <el-col :span="4">
        <el-select placeholder="请选择材料" v-model="material">
          <el-option label="1.5mm纸板" value="1"></el-option>
          <el-option label="瓦楞" value="2"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="纸板">
      <el-col :span="4">
        <el-input placeholder="" v-model.number="long">
          <template slot="prepend">长：</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="" v-model.number="wide">
          <template slot="prepend">宽：</template>
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
    <el-form-item label="成品工艺">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isdrapery">加绸布</el-checkbox>
      </el-col>
      <template v-if="isdrapery">
        <el-col :span="3" >
          <el-select placeholder="请选择绸布" v-model="draperyType">
            <el-option label="高档绸布" value="1"></el-option>
            <el-option label="普通绸布" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
        <el-input placeholder="" v-model.number="draperyLong">
          <template slot="prepend">长：</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input placeholder="" v-model.number="draperyWide">
          <template slot="prepend">宽：</template>
        </el-input>
      </el-col>
      </template>
    </el-form-item>
    <el-form-item>
      <el-col :span="8" :offset="6">
        <el-button type="primary" @click.native="CountPrice">报价</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <el-dialog title="报价" @close="closePrice" v-model="dialogPriceVisible" :close-on-click-modal="false" :close-on-press-escape="false">
    基材：{{this.boxPrice.Cardboard}}
    绸布：{{this.boxPrice.drapery}}</br>
    加工费：{{this.boxPrice.process}}</br>
    合计：{{this.boxPrice.count}}
  </el-dialog>
</div>
</template>

<script>
import SizeCount from '../lib/SizeCount.js'
import selectData from '../data/selectData.vue'
import js_CountPrice from '../lib/CountPrice.js'
export default {
  data () {
    return {
      isdrapery:true,
      long:100,
      wide:100,
      height:100,
      insidecut:2,
      quantity:'1000',
      print:'1',
      draperyType:'1',
      technique:'1',
      film:false,
      material:'1',
      bump:0,
      draperyLong:300,
      draperyWide:300,
      pagePrice:0,
      dialogPriceVisible:false,
      boxPrice:{
        count:0,
        Cardboard:0,
        drapery:0,
        process:0,
      }
    }
  },
  mixins: [selectData],
  components: {
    
  },
  computed:{
    CardboardLong:function(){
      return this.long+this.height*2;
    },
    CardboardWide:function(){
      return this.wide+this.height*2;
    }
  },
  methods:{
    closePrice:function(){//清空价格数据
      for (var i in this.boxPrice){
        this.boxPrice[i]=0;
      }
    },
    CountPrice:function(){
      var TopCardboardPrice;
      const CorrugatedName='三层瓦楞';//设置瓦楞
      const cardboard='双灰板';//默认使用双灰板
      const thick=1.5;//默认使用1.5mm
      js_CountPrice.ProcessPromise('内托',this.quantity).then(value=>{
        this.boxPrice.process=value.toFixed(2);
      }).then(()=>{
        if(this.material==1){
          return js_CountPrice.CardboardPromise(this.CardboardLong,this.CardboardWide,cardboard,thick,true).then(value=>{
            this.boxPrice.Cardboard=value.toFixed(2);
          })
        }else{
          return js_CountPrice.CorrugatedPromise(this.CardboardLong,this.CardboardWide,CorrugatedName).then(value=>{
            this.boxPrice.Cardboard=value.toFixed(2);
          })
        }
      }).then(()=>{
        //绸布
        const draperyType=this.draperyType==1 ? '高档绸布' : '普通绸布';
        //console.log(this.draperyLong,this.draperyWide,Number(this.quantity),draperyType);
        return js_CountPrice.DraperyPromise(this.draperyLong,this.draperyWide,Number(this.quantity),draperyType).then(value=>{
          this.boxPrice.drapery=value.toFixed(2);
        })
      }).then(()=>{
        //计算合计价格
        for (var i in this.boxPrice){
          this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
          //console.log('test'+this.boxPrice.count);
        }
        this.boxPrice.count=this.boxPrice.count.toFixed(2);
        //console.log(SizeCount.carton());
        this.dialogPriceVisible=true;

      })
    }
  }
}
</script>