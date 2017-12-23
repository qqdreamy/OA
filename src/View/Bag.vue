<template>
  <div>
  <el-form label-width="80px" v-loading.body="loading" element-loading-text="正在计算ing">
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
    <el-form-item>
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isExpand">展开尺寸</el-checkbox>
      </el-col>
      <el-col :span="2">
        <template v-if="isExpand">
          {{BagLong}}*{{BagWide}}
        </template>
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
    <el-form-item label="包纸">
      <template>
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="paper">
          <el-option label="白卡纸" value="白卡纸"></el-option>
          <el-option label="特种纸" value="特种纸"></el-option>
          <el-option label="牛皮纸" value="牛皮纸"></el-option>
          <el-option label="自设纸" value="自设纸"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <template v-if="paper!='自设纸'">
          <el-select placeholder="请选择克重" v-model="paperWeight">
            <el-option v-for="item in this.paperWeights" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-if="paper=='自设纸'">
          <el-input placeholder="单价" v-model.number="pagePrice">
            <template slot="append">元整</template>
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
        <el-checkbox class="checkbox" v-model="isUV">UV</el-checkbox>
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
  <dialogPrice v-on:closePrice="closePrice" :dialogPriceVisible="dialogPriceVisible">
    <p slot="list"> 
    纸张：{{this.boxPrice.paper}}
    印刷：{{this.boxPrice.print}}</br>
    覆膜：{{this.boxPrice.film}}</br>
    提绳：{{this.boxPrice.rope}}</br>
    烫金：{{this.boxPrice.permed}}</br>
    UV：{{this.boxPrice.UV}}</br>
    加工费(含卡合[刀模]):{{this.boxPrice.process}}</br>
    </p>
    <P slot="count">合计：{{this.boxPrice.count}}</P>
</dialogPrice>
  </div>
</template>

<script>
import selectData from '../data/selectData.vue'
import js_CountPrice from '../lib/CountPrice.js'
import dialogPrice from '../components/dialogPrice.vue'

export default {
  data () {
    return {
      long:300,
      wide:180,
      height:280,
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
      isExpand:false,      
      dialogPriceVisible:false,
      loading:false,
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
    dialogPrice
  },
  computed:{
    BagLong:function(){
      const MaxLong=930;//最大单粘尺寸
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
      const MaxWide=630;//最大宽度
      return this.height+40+(this.wide/2+15);
    }
  },
  methods:{
    closePrice:function(){//清空数据
      this.dialogPriceVisible=false;
      for (var i in this.boxPrice){
        this.boxPrice[i]=0;
      }
    },
    CountPrice:function(){
      this.loading=true;
      let BagLong=this.BagLong;
      let quantity=this.bagType==2?this.quantity*2 : this.quantity;
      const profit=1.2//20%利润计算常量
      js_CountPrice.KaHePromise(this.BagLong,this.BagWide,quantity).then(value=>{
          return value
      }).then(kahe=>{
        return js_CountPrice.ProcessPromise(`手提袋${this.bagType}`,this.quantity).then(value=>{
          this.boxPrice.process=(value+kahe).toFixed(2);
        })
      }).then(()=>{
        if(this.paper=='自设纸'){
          return js_CountPrice.ColorSurfacePromise(this.BagLong,this.BagWide,this.paper,this.paperWeight,this.pagePrice).then(value=>{
          if(this.bagType==2){
            this.boxPrice.paper=(value*2).toFixed(2);
          }else{
            this.boxPrice.paper=value.toFixed(2);
          }});
        }else{
          return js_CountPrice.ColorSurfacePromise(this.BagLong,this.BagWide,this.paper,this.paperWeight).then(value=>{
          if(this.bagType==2){
            this.boxPrice.paper=(value*2).toFixed(2);
          }else{
            this.boxPrice.paper=value.toFixed(2);
          }});
        }
      }).then(()=>{//印刷
        if(this.print!='4'){
          return js_CountPrice.PrintPromise(this.BagLong,this.BagWide,quantity,this.print).then(value=>{
            if(this.bagType==2){
              this.boxPrice.print=value.toFixed(2)*2;
            }else{
              this.boxPrice.print=value.toFixed(2);
            }
          })
        }
      }).then(()=>{//覆膜
        if(this.isfilm){
          return js_CountPrice.FilmPromise(this.BagLong,this.BagWide,quantity).then(value=>{
            if(this.bagType==2){
              this.boxPrice.film=(value*2).toFixed(2);
            }else{
              this.boxPrice.film=value.toFixed(2);
            }
          })
        }
      }).then(()=>{//烫金
        if(this.ispermed){
          return js_CountPrice.PermedPromise(this.permed,quantity).then(value=>{
            this.boxPrice.permed=value.toFixed(2);
          })
        }
      }).then(()=>{//UV
        if(this.isUV){
          if(this.uvLong==0 || this.uvWide==0){
            this.$notify.error({
              title: '填写错误',
              message: '请填写UV尺寸！'
            });
            throw 0
          }
          return js_CountPrice.UVPromise(this.uvLong,this.uvLong,quantity).then(value=>{
            this.boxPrice.UV=value.toFixed(2);
          })
        }
      }).then(()=>{
        return js_CountPrice.RopePromise(this.rope).then(value=>{
          this.boxPrice.rope=value.toFixed(2);
        })
      }).then(()=>{
        //自动计算总价
        for (var i in this.boxPrice){
          this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
        }
        this.boxPrice.count=(this.boxPrice.count*profit).toFixed(2);
        this.dialogPriceVisible=true;
        this.loading=false;
      }).catch(value=>console.log(value))
    }
  }
}
</script>