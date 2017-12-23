<template>
<div>
  <el-form label-width="80px" v-loading.body="loading" element-loading-text="正在计算ing">
    <el-form-item label="成品尺寸">
      <el-col :span="4">
        <el-input placeholder="" v-model="long">
          <template slot="prepend">长：</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="" v-model="wide">
          <template slot="prepend">宽：</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="" v-model="height" >
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
      <el-col :span="4">
        <el-select placeholder="请选择纸张" v-model="technique">
          <el-option label="V槽" value="1"></el-option>
          <el-option label="半断" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input placeholder="" v-model.number="curling">
          <template slot="prepend">盖-卷边：</template>
          <el-switch @change="isCurlingBottom" slot="append"  v-model="isCurlingBottomSwitch"></el-switch>
        </el-input>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input placeholder="" v-model.number="bottomCurling">
          <template slot="prepend">底-卷边：</template>
          <el-switch @change="isBottomCurlingBottom" slot="append"  v-model="isBottomCurlingBottomSwitch"></el-switch>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="盖包纸">
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
            <el-option label="100g" value="100"></el-option>
            <el-option label="128g" value="128"></el-option>
            <el-option label="157g" value="157"></el-option>
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
    <el-form-item label="底包纸">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isBottomPaper">
          含包纸
        </el-checkbox>
      </el-col>
      <template v-if="isBottomPaper">
      <el-col :span="3">
        <el-select placeholder="请选择纸张" v-model="bottomPaper">
          <el-option label="铜版纸" value="铜版纸"></el-option>
          <el-option label="特种纸" value="特种纸"></el-option>
          <el-option label="牛皮纸" value="牛皮纸"></el-option>
          <el-option label="自设纸" value="自设纸"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <template v-if="bottomPaper!='自设纸'">
          <el-select placeholder="请选择克重" v-model="bottomPaperWeight">
            <el-option label="100g" value="100"></el-option>
            <el-option label="128g" value="128"></el-option>
            <el-option label="157g" value="157"></el-option>
          </el-select>
        </template>
        <template v-if="bottomPaper=='自设纸'">
          <el-input placeholder="单价" v-model="bottomPagePrice">
            <template slot="append">元</template>
          </el-input>
        </template>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择印刷" v-model="bottomPrint">
          <el-option label="四色" value="1"></el-option>
          <el-option label="单色" value="2"></el-option>
          <el-option label="专色" value="3"></el-option>
          <el-option label="无需印刷" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-checkbox class="checkbox" v-model="bottomFilm">覆膜</el-checkbox>
      </el-col>
      </template>
    </el-form-item>
    <el-form-item label="盖纸板">
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
      <el-col :span="2" :offset="1">
        <el-checkbox class="checkbox" v-model="isBottomCardboard">底纸板</el-checkbox>
      </el-col>
      <template v-if="isBottomCardboard">
      <el-col :span="3">
      <el-select placeholder="请选择纸板" v-model="bottomCardboard">
        <el-option v-for="item in this.cardboards" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择厚度" v-model="bottomThick">
          <el-option v-for="item in this.thicks" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      </template>
      </template>
    </el-form-item>
    <el-form-item label="后道工艺">
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
    <el-form-item label="其他">
      <el-col :span="3" >
        <el-checkbox class="checkbox" v-model="isCarton">纸箱</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8" :offset="6">
        <el-button type="primary" @click.native="CountPrice">报价</el-button>
      </el-col>
    </el-form-item>
  </el-form>
  <dialogPrice v-on:closePrice="closePrice" :dialogPriceVisible="dialogPriceVisible">
    <p slot="list">
      盖包纸：{{this.boxPrice.topPage}}
      盖-覆膜：{{this.boxPrice.film}}</br>
      底包纸：{{this.boxPrice.bottomPage}}
      底-覆膜：{{this.boxPrice.bottomFilm}}</br>
      盖纸板：{{this.boxPrice.topCardboard}}
      底纸板：{{this.boxPrice.bottomCardboard}}</br>
      盖-印刷：{{this.boxPrice.print}}
      底-印刷：{{this.boxPrice.bottomPrint}}</br>
      卡合：{{this.boxPrice.made}}
      烫金：{{this.boxPrice.permed}}
      V槽：{{this.boxPrice.Vcut}}</br>
      纸箱：{{this.boxPrice.carton}}
      加工费：{{this.boxPrice.process}}</br>
    </p>
    <P slot="count">合计：{{this.boxPrice.count}}</P>
  </dialogPrice>
</div>
</template>
<script>
import SizeCount from '../lib/SizeCount.js'
import js_CountPrice from '../lib/CountPrice.js'
import selectData from '../data/selectData.vue'
import dialogPrice from '../components/dialogPrice.vue'
export default {
  data () {
    return {
      isPaper:'含包纸',
      isCardboard:'含纸板',
      isBottomCardboard:false,
      long:100,
      wide:100,
      height:100,
      topHeight:100,
      bottomHeight:98,
      quantity:'1000',
      paper:'铜版纸',
      paperWeight:'128',
      cardboard:'双灰板',
      bottomCardboard:'裱白板',
      bottomThick:'2',
      curling:20,
      bottomCurling:20,
      isCurlingBottomSwitch:false,
      isBottomCurlingBottomSwitch:false,
      thick:'2',
      print:'1',
      technique:'1',
      film:false,
      bottomFilm:false,
      bump:0,
      ispermed:0,
      permed:'1',
      pagePrice:0,
      isBottomPaper:true,
      bottomPaper:'铜版纸',
      bottomPaperWeight:'128',
      bottomPagePrice:0,
      bottomPrint:'4',
      dialogPriceVisible:false,
      isCarton:true,
      loading:false,
      boxPrice:{
        count:0,
        topPage:0,
        bottomPage:0,
        topCardboard:0,
        bottomCardboard:0,
        print:0,
        bottomPrint:0,
        permed:0,
        made:0,//卡合
        Vcut:0,
        film:0,
        carton:0,
        bottomFilm:0,
        process:0,
        inclosePrice:0
      }
    }
  },
  mixins: [selectData],
  components: {
    dialogPrice
  },
  computed:{
    changeNumber:function(){//开料尺寸增加+3或10
      return this.technique=='1' ? 3 : 10; 
    },
    bottomBack:function(){//根据盒型，以及高度设置底缩减尺寸
      return this.height > 40 ? 3 : 2; 
    },
    BottomThick:function(){//计算底纸板厚度
      return this.isBottomCardboard ? this.bottomThick : this.thick;
    },
    BottomCardboard:function(){
      return this.isBottomCardboard ? this.bottomCardboard : this.cardboard;
    },
    topCardboardLong:function(){
      return Number(this.long)+Number(this.height*2);
    },
    topCardboardWide:function(){
      return Number(this.wide)+Number(this.height*2);
    },
    bottomCardboardLong:function(){
      return Number(this.long)-Number(this.thick*2)-this.bottomBack+Number(this.height-this.BottomThick)*2;
    },
    bottomCardboardWide:function(){
      return Number(this.wide)-Number(this.thick*2)-this.bottomBack+Number(this.height-this.BottomThick)*2;
    },
    topcolorsurfaceLong:function(){
      return Number(Number(this.long)+Number(this.height*2)+Number(this.thick*2+this.curling*2+1));
    },
    topcolorsurfaceWide:function(){
      return Number(Number(this.wide)+Number(this.height*2)+Number(this.thick*2+this.curling*2+1));
    },
    bottomColorSurfaceLong:function(){
      return Number(this.long-this.BottomThick*2-this.bottomBack)+Number(this.height*2-this.thick*2)+Number(this.bottomCurling*2+this.BottomThick*2+1);
    },
    bottomColorSurfaceWide:function(){
      return Number(this.wide-this.BottomThick*2-this.bottomBack)+Number(this.height*2-this.thick*2+this.bottomCurling*2)+Number(this.BottomThick*2+1);
    }
  },
  methods:{
    closePrice:function(){//清空数据
    this.dialogPriceVisible=false;
    for (var i in this.boxPrice){
      this.boxPrice[i]=0;
    }
  },
    //选择盖-卷边到底计算事件
    isCurlingBottom:function(){
      if(this.isCurlingBottomSwitch){
        this.curling=Number(this.height)+Number(this.thick);
      }else{
        this.curling=20;
      }
    },
    //底-卷边到底计算事件
    isBottomCurlingBottom:function(){
      if(this.isBottomCurlingBottomSwitch){
        this.bottomCurling=this.bottomHeight+Number(this.thick);
      }else{
        this.bottomCurling=20;
      }
    },
    CountPrice:function(){
      this.loading=true;
      var CountPrice=0;
      let cuttQuantity=0;
      let boxName=this.long<250 ? '天地盖1(小)' : this.long>350 ? '天地盖1(大)' : '天地盖1(中)';
      js_CountPrice.ProcessPromise(boxName,this.quantity).then(value=>{
        this.boxPrice.process=value.toFixed(2);
      }).then(()=>{
        if(this.isCardboard=='含纸板'){
          return js_CountPrice.CardboardPromise(this.topCardboardLong+this.changeNumber,this.topCardboardWide+this.changeNumber,this.cardboard,this.thick,true).then(value=>{
            this.boxPrice.topCardboard=value.toFixed(2);
          }).then(()=>{
            return js_CountPrice.CardboardPromise(this.bottomCardboardLong+this.changeNumber,this.bottomCardboardWide+this.changeNumber,this.BottomCardboard,this.BottomThick,true).then(value=>{
              this.boxPrice.bottomCardboard=value.toFixed(2);
            })
          }).then(()=>{
            if(this.technique=='1'){
              this.boxPrice.Vcut=0.4;//计算V槽价格
            }else {
              cuttQuantity+=2;
            }
          })
        }
      }).then(()=>{//计算盖包纸
        if(this.isPaper=='含包纸'){
          if(this.paper=='自设纸'){
            this.boxPrice.topPage=js_CountPrice.ColorSurface(this.topcolorsurfaceLong,this.topcolorsurfaceWide,this.paper,this.paperWeight,this.pagePrice).toFixed(2);
          }else{
            return js_CountPrice.ColorSurfacePromise(this.topcolorsurfaceLong,this.topcolorsurfaceWide,this.paper,this.paperWeight).then(value=>{
              this.boxPrice.topPage=value.toFixed(2);
            }).then(()=>{//覆膜
              if(this.film){
                return js_CountPrice.FilmPromise(this.topcolorsurfaceLong,this.topcolorsurfaceWide,this.quantity).then(value=>{
                  console.info('ddd'+value);
                  this.boxPrice.film=value.toFixed(2);
                });
              }
            });
          }
        }
      }).then(()=>{//计算底包纸
        if(this.isBottomPaper){
          if(this.bottomPaper=='自设纸'){
            this.boxPrice.bottomPage=js_CountPrice.ColorSurface(this.bottomColorSurfaceLong,this.bottomColorSurfaceWide,this.bottomPaper,this.bottomPaperWeight,this.bottomPagePrice).toFixed(2);
          }else {
            return js_CountPrice.ColorSurfacePromise(this.bottomColorSurfaceLong,this.bottomColorSurfaceWide,this.bottomPaper,this.bottomPaperWeight).then(value=>{
              this.boxPrice.bottomPage=value.toFixed(2);
            }).then(()=>{
              if(this.bottomFilm){
                return js_CountPrice.FilmPromise(this.bottomColorSurfaceLong,this.bottomColorSurfaceWide,this.quantity).then(value=>{
                  this.boxPrice.bottomFilm=value.toFixed(2);
                })
              }
            })
          }
        }
      }).then(()=>{//计算印刷
        if(this.print!='4' && this.isPaper=='含包纸'){
          return js_CountPrice.PrintPromise(this.topcolorsurfaceLong,this.topcolorsurfaceWide,this.quantity,this.print).then(value=>{
            console.log('ddd'+value);
            this.boxPrice.print=value.toFixed(2);
          }).then(()=>{
            if(this.bottomPrint!='4' && this.isBottomPaper){
              return js_CountPrice.PrintPromise(this.bottomColorSurfaceLong,this.bottomColorSurfaceWide,this.quantity,this.bottomPrint).then(value=>{
                this.boxPrice.bottomPrint=value.toFixed(2);
              })
            }
          })
        }
      }).then(()=>{//卡合
        //包纸卡合
        cuttQuantity+=2;
        return js_CountPrice.KaHePromise(this.topcolorsurfaceLong,this.topcolorsurfaceWide,this.quantity).then(value=>{
          this.boxPrice.made=(value*cuttQuantity).toFixed(2);
        })
      }).then(()=>{//烫金
        if(this.ispermed){
          return js_CountPrice.PermedPromise(this.permed,this.quantity).then(value=>{
            this.boxPrice.permed=value.toFixed(2);
          })
        }
      }).then(()=>{//计算总价
        if(this.isCarton){ //纸箱
          this.boxPrice.carton=js_CountPrice.Carton(this.long,this.wide,this.height).toFixed(2);
        }
        for (var i in this.boxPrice){
          this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
        }
        this.boxPrice.count=(this.boxPrice.count*1.3).toFixed(2);
        this.dialogPriceVisible=true;
        this.loading=false;
      }).catch(()=>{
        alert('err');
      })
    }
  }
}
</script>