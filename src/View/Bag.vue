<template>
  <div>
  <el-form label-width="80px">
    <el-form-item label="类型">
      <el-col :span="4">
        <img src="../assets/bag_model.jpg" width="128px" height="128px" alt="郁金香" />
      </el-col>
    </el-form-item>
    <el-form-item label="成品尺寸">
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
        <el-tooltip placement="top">
          <el-input placeholder="" v-model.number="height">
            <template slot="prepend">高：</template>
          </el-input>
        </el-tooltip>
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
    <el-form-item label="包纸">
      <template>
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="paper">
          <el-option label="铜版纸" value="铜版纸"></el-option>
          <el-option label="白卡纸" value="白卡纸"></el-option>
          <el-option label="特种纸" value="特种纸"></el-option>
          <el-option label="牛皮纸" value="牛皮纸"></el-option>
          <el-option label="自设纸" value="自设纸"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <template v-if="paper!='自设纸'">
          <el-select placeholder="请选择克重" v-model="paperWeight">
            <el-option v-for="item in this.paperWeights" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-if="paper=='自设纸'">
          <el-input placeholder="单价" v-model.number="pagePrice">
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
      </template>
    </el-form-item>
    <el-form-item label="穿绳">
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="rope">
          <el-option label="尼龙绳" value="尼龙绳"></el-option>
          <el-option label="棉绳" value="棉绳"></el-option>
          <el-option label="三股棉绳" value="三股棉绳"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="后道工艺">
      <el-col :span="2" >
        <el-checkbox class="checkbox" v-model="isfilm">覆膜</el-checkbox>
      </el-col>
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="ispermed">烫处理</el-checkbox>
      </el-col>
      <template v-if="ispermed">
        <el-col :span="3" >
          <el-select placeholder="请选择" v-model="permed">
            <el-option label="烫一个部分" value="1"></el-option>
            <el-option label="烫两个部分" value="2"></el-option>
            <el-option label="烫多个部分" value="3"></el-option>
          </el-select>
        </el-col>
      </template>
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isUV">UV油</el-checkbox>
      </el-col>
      <template v-if="isUV">
        <el-col :span="3" >
          <el-input placeholder="长" v-model.number="uvLong">
          </el-input>
        </el-col>
        <el-col :span="3" >
          <el-input placeholder="宽" v-model.number="uvWide">
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
      纸张：{{this.boxPrice.paper}}
      印刷：{{this.boxPrice.print}}</br>
      覆膜：{{this.boxPrice.film}}</br>
      提绳：{{this.boxPrice.rope}}</br>
      烫金：{{this.boxPrice.permed}}</br>
      UV：{{this.boxPrice.UV}}</br>
      加工费(含卡合):{{this.boxPrice.process}}</br>
      合计：{{this.boxPrice.count}}
  </el-dialog>
  </div>
</template>

<script>
import selectData from '../data/selectData.vue'
import js_CountPrice from '../lib/CountPrice.js'
export default {
  data () {
    return {
      long:220,
      wide:200,
      height:60,
      quantity:'1000',
      paper:'白卡纸',
      paperWeight:'250',
      pagePrice:0,
      print:'1',
      rope:'尼龙绳',
      isfilm:true,
      ispermed:false,
      permed:'1',
      bagType:1,
      isUV:false,
      uvLong:0,
      uvWide:0,
      dialogPriceVisible:false,
      boxPrice:{
        count:0,
        paper:0,
        print:0,
        film:0,
        rope:0,
        process:0,
        UV:0,
        permed:0
      }
    }
  },
  mixins: [selectData],
  components: {
    
  },
  computed:{
    BagLong:function(){
      const MaxLong=1194-30;//最大单粘尺寸
      if(this.long*2+this.wide*2+20>MaxLong){
        this.bagType=2;
        return this.long+(this.wide-1)+20
      }else{
        this.bagType=1;
        return this.long*2+this.wide*2+20
      }
    },
    BagWide:function(){
      //折边40、底部：宽度/2+15
      const MaxWide=889-30;
      return this.height+40+(this.wide/2+15);
    }
  },
  methods:{
    closePrice:function(){//清空数据
      for (var i in this.boxPrice){
        this.boxPrice[i]=0;
      }
    },
    CountPrice:function(){
      let BagLong=this.BagLong;
      let quantity=this.bagType==2?this.quantity*2 : this.quantity;
      let Process=this.bagType==2? 0.1 : 0;
      const profit=0.3//30%利润计算常量
      console.log(quantity);
      //纸张
      if(this.bagType==2){
        this.boxPrice.paper=(js_CountPrice.ColorSurface(this.BagLong,this.BagWide,this.paper,this.paperWeight)*2).toFixed(2);
      }else{
        this.boxPrice.paper=js_CountPrice.ColorSurface(this.BagLong,this.BagWide,this.paper,this.paperWeight).toFixed(2);
      }
      //印刷
      if(this.print!='4'){
        this.boxPrice.print=js_CountPrice.Print(this.BagLong,this.BagWide,quantity,this.print);
      }
      //覆膜
      if(this.isfilm){
        this.boxPrice.film=js_CountPrice.film(this.BagLong,this.BagWide,quantity).toFixed(2);
      }
      //卡合
      let kahe=js_CountPrice.KaHe(this.BagLong,this.BagWide,quantity);
      //烫金
      if(this.ispermed){
        this.boxPrice.permed=js_CountPrice.Permed(this.permed,quantity);
      }
      //UV
      if(this.isUV){
        if(this.uvLong==0 || this.uvWide==0){
          this.$notify.error({
            title: '填写错误',
            message: '请填写UV尺寸！'
          });
          return;
        }
        this.boxPrice.UV=js_CountPrice.UV(this.uvLong,this.uvLong,quantity);
      }
      //加工费
      this.boxPrice.process=(js_CountPrice.Process('手提袋',this.quantity)+kahe+Process).toFixed(2);
      //提绳
      this.boxPrice.rope=js_CountPrice.Rope(this.rope);
      //自动计算总价
      for (var i in this.boxPrice){
        this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
      }
      this.boxPrice.count=(this.boxPrice.count*profit+this.boxPrice.count).toFixed(2);
      this.dialogPriceVisible=true;
    }
  }
}
</script>