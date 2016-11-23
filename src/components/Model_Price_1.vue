<template>
<div>
  <el-form label-width="80px">
    <el-form-item label="材料">
      <el-col :span="4">
        <el-select placeholder="请选择材料" v-model.number="material">
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
          <el-option v-for="item in this.quantitys" :label="item.value" :value="item.value">
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
    纸板：{{this.boxPrice.Cardboard}}
    绸布：{{this.boxPrice.drapery}}</br>
    加工费：{{this.boxPrice.process}}</br>
    合计：{{this.boxPrice.count}}
  </el-dialog>
</div>
</template>

<script>
import SizeCount from '../lib/SizeCount.js'
import selectData from '../data/selectData.vue'
var mythick={
  '2':1150,
  '1.5':850,
  '2.5':1450,
  '3':1750
}
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
      var data = require("../json/CardboardPrice.json");
      var jdata=require("../json/CopperplatePaper.json");
      var TopCardboardPrice;
      const mthick=850;//设置纸板内托默认纸板厚度
      const corrugationPrice=2;//设置瓦楞默认价格
      if(this.material==1){
        //1.1纸板
        var Zhullbig=SizeCount.KbCountBig(1,this.CardboardLong,this.CardboardWide).count;
        var Zhullsmall=SizeCount.KbCountBig(0,this.CardboardLong,this.CardboardWide).count;
        //获取纸板单张价格
        var tonPrice=data['双灰板']['吨价'];
        var zPrice=(tonPrice/2327*mthick/500).toFixed(2)//计算单张价格
        var dPrice=(tonPrice/1884*mthick/500).toFixed(2)
        if(dPrice/Zhullbig>zPrice/Zhullsmall){
          TopCardboardPrice=zPrice/Zhullsmall
        }else{
          TopCardboardPrice=dPrice/Zhullbig
        }
        this.boxPrice.Cardboard=TopCardboardPrice.toFixed(2);
      }else{
        this.boxPrice.Cardboard=this.CardboardLong/1000*this.CardboardWide/1000*corrugationPrice;
      }
      //1.2绸布
      if(this.isdrapery){
        const draperyPrice=this.draperyType==1 ? jdata['绸布']['高档绸布'] : jdata['绸布']['普通绸布'];
        console.log('米数'+SizeCount.drapery(this.draperyLong,this.draperyWide,this.quantity));
        this.boxPrice.drapery=(SizeCount.drapery(this.draperyLong,this.draperyWide,this.quantity)*draperyPrice/this.quantity).toFixed(2);
      }
      //计算其他价格
      var boxJson=require("../json/process.json");
      const boxName='内托1';
      //加工费
      this.boxPrice.process=this.quantity < 2000 ? boxJson[boxName]['起步价']/this.quantity : boxJson[boxName][this.quantity];
      //this.boxPrice.process=boxJson[boxName]
      //计算合计价格
      for (var i in this.boxPrice){
        this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
      }
      this.boxPrice.count=this.boxPrice.count.toFixed(2);
      //纸箱算法
      console.log(SizeCount.carton());
      this.dialogPriceVisible=true;
    }
  }
}
</script>