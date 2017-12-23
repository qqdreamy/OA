<template>
<div v-loading.body="loading" element-loading-text="正在计算ing">
  <el-form label-width="80px">
  <el-form-item label="类型">
    <el-col :span="4">
      <el-select placeholder="请选择类型" v-model="type">
        <el-option label="竖式" value="1"></el-option>
        <el-option label="横式" value="2"></el-option>
      </el-select>
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
        <div slot="content">{{longCenter}}*{{center}}</div>
          <el-input placeholder="" v-model.number="center">
            <template slot="prepend">中条：</template>
          </el-input>
        </el-tooltip>
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
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isPaper" true-label="含包纸" false-label="不含包纸">
          {{isPaper}}
        </el-checkbox>
      </el-col>
      <template v-if="isPaper=='含包纸'">
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="paper">
          <el-option label="铜版纸" value="铜版纸"></el-option>
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
      </template>
    </el-form-item>
    <el-form-item label="内裱纸">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isInsidePaper">
        含内裱纸
        </el-checkbox>
      </el-col>
      <template v-if="isInsidePaper">
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="insidePaper">
          <el-option label="铜版纸" value="铜版纸"></el-option>
          <el-option label="特种纸" value="特种纸"></el-option>
          <el-option label="牛皮纸" value="牛皮纸"></el-option>
          <el-option label="自设纸" value="自设纸"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <template v-if="insidePaper!='自设纸'">
          <el-select placeholder="请选择克重" v-model="insidePaperWeight">
            <el-option v-for="item in this.paperWeights" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template v-if="insidePaper=='自设纸'">
          <el-input placeholder="单价" v-model.number="insidePagePrice">
            <template slot="append">元</template>
          </el-input>
        </template>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择印刷" v-model="insidePrint">
          <el-option label="四色" value="1"></el-option>
          <el-option label="单色" value="2"></el-option>
          <el-option label="专色" value="3"></el-option>
          <el-option label="无需印刷" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-checkbox class="checkbox" v-model="insideFilm">覆膜</el-checkbox>
      </el-col>
      </template>
    </el-form-item>
    <el-form-item label="纸板">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isCardboard" true-label="含纸板" false-label="不含纸板">
          {{isCardboard}}
        </el-checkbox>
      </el-col>
      <template v-if="isCardboard=='含纸板'">
      <el-col :span="3">
        <el-select placeholder="请选择纸板" v-model="cardboard">
          <el-option v-for="item in this.cardboards" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择厚度" v-model="thick">
          <el-option v-for="item in this.thicks" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      </template>
    </el-form-item>
    <el-form-item label="后道工艺">
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
    </el-form-item>
    <el-form-item>
      <el-col :span="8" :offset="6">
        <el-button type="primary" @click.native="CountPrice">报价</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <el-dialog title="报价" @close="closePrice" v-model="dialogPriceVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      包纸：{{this.boxPrice.Page}}
      内贴纸：{{this.boxPrice.insidePaper}}</br>
      纸板：{{this.boxPrice.Cardboard}}</br>
      包纸-印刷：{{this.boxPrice.print}}
      包纸-覆膜：{{this.boxPrice.film}}</br>
      内贴-印刷：{{this.boxPrice.insidePrint}}
      内贴-覆膜：{{this.boxPrice.insideFilm}}</br>
      烫金:{{this.boxPrice.permed}}
      加工费：{{this.boxPrice.process}}</br>
      合计：{{this.boxPrice.count}}
  </el-dialog>
</div>
</template>
<script>
import SizeCount from '../lib/SizeCount.js'
import js_CountPrice from '../lib/CountPrice.js'
import selectData from '../data/selectData.vue'
export default {
  data () {
    return {
      isPaper:'不含包纸',
      isCardboard:'含纸板',
      isBottomCardboard:false,
      long:210,
      wide:180,
      center:30,
      quantity:'1000',
      paper:'铜版纸',
      paperWeight:'128',
      cardboard:'双灰板',
      bottomCardboard:'裱白板',
      bottomThick:'2',
      curling:15,
      thick:'2',
      print:'1',
      type:'1',
      film:false,
      bump:0,
      ispermed:0,
      permed:'1',
      pagePrice:0,
      isInsidePaper:true,
      insidePaper:'铜版纸',
      insidePaperWeight:'80',
      insidePagePrice:0,
      insidePrint:'4',
      insideFilm:false,
      dialogPriceVisible:false,
      loading:false,
      boxPrice:{
        count:0,
        Page:0,
        Cardboard:0,
        print:0,
        film:0,
        insidePaper:0,
        insidePrint:0,
        insideFilm:0,
        process:0,
        permed:0,
        inclosePrice:0
      }
    }
  },
  mixins: [selectData],
  components: {
    
  },
  computed:{
    BottomCardboard:function(){
      return this.isBottomCardboard ? this.bottomCardboard : this.cardboard;
    },
    hullcolorsurfaceLong:function(){
      return this.long*2+this.center*2+this.thick*2+21+36;
    },
    hullcolorsurfaceWide:function(){
      return this.wide+this.thick*2+36;
    },
    bottomColorSurfaceLong:function(){
      return Number(this.long-this.bThick*2-this.bottomBack)+Number(this.height*2-this.thick*2)+Number(this.curling*2+this.bThick*2+1);
    },
    bottomColorSurfaceWide:function(){
      return Number(this.wide-this.bThick*2-this.bottomBack)+Number(this.height*2-this.thick*2+this.curling*2)+Number(this.bThick*2+1);
    },
    longCenter:function(){
      return this.type==1 ? this.wide : this.long;
    },
    InsidePaperLong:function(){
      return this.hullcolorsurfaceLong-40;
    },
    InsidePaperWide:function(){
      return this.hullcolorsurfaceWide-40;
    }
  },
  methods:{
    closePrice:function(){//清空数据
      for (var i in this.boxPrice){
        this.boxPrice[i]=0;
      }
    },
    CountPrice:function(){
      this.loading=true;
      var CountPrice=0;
      js_CountPrice.ProcessPromise('台历架',this.quantity).then(value=>{
        this.boxPrice.process=value;
      }).then(()=>{
        if(this.isCardboard=='含纸板'){//判断是否含纸板
          let p;
          return js_CountPrice.CardboardPromise(this.long,this.wide,this.cardboard,this.thick,true).then(function(value){
            p=value*2;
          }).then(()=>{//中条纸板
            return js_CountPrice.CardboardPromise(this.longCenter,this.center,this.cardboard,this.thick,true).then(value=>{
              p+=value;
              this.boxPrice.Cardboard=p.toFixed(2);
            })
          }).catch(()=>{
            console.log('error');
          })
        }
      }).then(()=>{
        if(this.isPaper=='含包纸'){//外裱包纸
          if(this.paper=='自设纸'){
            this.boxPrice.Page=js_CountPrice.ColorSurfacePromise(this.hullcolorsurfaceLong,this.hullcolorsurfaceWide,this.paper,this.paperWeight,this.pagePrice).toFixed(2);
          }else {
            return js_CountPrice.ColorSurfacePromise(this.hullcolorsurfaceLong,this.hullcolorsurfaceWide,this.paper,this.paperWeight).then(value=>{
              this.boxPrice.Page=value.toFixed(2);
            });
          }
        }
      }).then(()=>{ 
        if(this.isInsidePaper){//内贴包纸
          if(this.insidePaper=='自设纸'){
            this.boxPrice.insidePaper=js_CountPrice.ColorSurfacePromise(this.InsidePaperLong,this.InsidePaperWide,this.insidePaper,this.insidePaperWeight,this.insidePagePrice).toFixed(2);
          }else{
            return this.boxPrice.insidePaper=js_CountPrice.ColorSurfacePromise(this.InsidePaperLong,this.InsidePaperWide,this.insidePaper,this.insidePaperWeight).then(value=>{
              this.boxPrice.insidePaper=value.toFixed(2);
            });
          }
        }
       }).then(()=>{
          if(this.print!='4' && this.isPaper=='含包纸'){//包纸印刷
            return js_CountPrice.PrintPromise(this.long,this.wide,this.quantity,this.print).then(value=>{
              this.boxPrice.print=value.toFixed(2);
            });
          }
        }).then(()=>{
          if(this.insidePrint!=4 && this.isInsidePaper){//内贴印刷费
            return js_CountPrice.PrintPromise(this.InsidePaperLong,this.InsidePaperWide,this.quantity,this.insidePrint).then(value=>{
              this.boxPrice.insidePrint=value.toFixed(2);
            });
          }
        }).then(()=>{
          if(this.film){//包纸覆膜
            return js_CountPrice.FilmPromise(this.hullcolorsurfaceLong,this.hullcolorsurfaceWide,this.quantity).then(value=>{
              this.boxPrice.film=value.toFixed(2);
            });
          }
        }).then(()=>{
          if(this.insideFilm){//内贴覆膜
            return js_CountPrice.FilmPromise(this.InsidePaperLong,this.InsidePaperWide,this.quantity).then(value=>{
              this.boxPrice.insideFilm=value.toFixed(2);
            });
          }
        }).then(()=>{
          if(this.ispermed){//烫金
            return js_CountPrice.PermedPromise(this.permed,this.quantity).then(value=>{
              this.boxPrice.permed=value.toFixed(2);
            });
          }
        }).then(()=>{
          //自动计算总价
          for (var i in this.boxPrice){
            this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
          }
          this.boxPrice.count=this.boxPrice.count.toFixed(2);
          this.dialogPriceVisible=true;
          this.loading=false;
        }).catch(()=>{
          console.log('err')
        });
    }
  }
}
</script>