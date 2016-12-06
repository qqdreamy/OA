<template>
<div>
  <el-form label-width="80px" v-loading.body="loading" element-loading-text="正在计算ing">
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
    <el-col :span="4" :offset="1">
        <el-input placeholder="内盒缩进" v-model="insidecut" >
          <template slot="prepend">缩进:</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="成品工艺">
      <el-col :span="4">
        <el-select placeholder="请选择纸张" v-model="technique">
          <el-option label="V槽" value="1"></el-option>
          <el-option label="半断" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" :offset="1">搭口</el-col>
      <el-col :span="3" >
        <el-select placeholder="请选择搭口" v-model="take">
          <el-option label="齐下口" value="1"></el-option>
          <el-option label="齐盒高" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="" v-model="curling">
          <template slot="prepend">卷边：</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="皮壳包纸">
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
      <el-col :span="3" :offset="1">
        <el-checkbox class="checkbox" v-model="isHullFilm">覆膜</el-checkbox>
      </el-col>
      </template>
    </el-form-item>
    <el-form-item label="内贴纸">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isSticker">
        含内贴
        </el-checkbox>
      </el-col>
      <template v-if="isSticker">
        <el-col :span="3">
          <el-select placeholder="请选择纸张" v-model="StickerPaper">
            <el-option label="铜版纸" value="铜版纸"></el-option>
            <el-option label="特种纸" value="特种纸"></el-option>
            <el-option label="牛皮纸" value="牛皮纸"></el-option>
            <el-option label="自设纸" value="自设纸"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <template v-if="StickerPaper!='自设纸'">
            <el-select placeholder="请选择克重" v-model="StickerPaperWeight">
              <el-option label="100g" value="100"></el-option>
              <el-option label="128g" value="128"></el-option>
              <el-option label="157g" value="157"></el-option>
            </el-select>
          </template>
          <template v-if="StickerPaper=='自设纸'">
            <el-input placeholder="单价" v-model="StickerPagePrice">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="请选择印刷" v-model="stickerPrint">
            <el-option label="四色" value="1"></el-option>
            <el-option label="单色" value="2"></el-option>
            <el-option label="专色" value="3"></el-option>
            <el-option label="无需印刷" value="4"></el-option>
          </el-select>
        </el-col>
      <el-col :span="3" :offset="1">
        <el-checkbox class="checkbox" v-model="isStickerFilm">覆膜</el-checkbox>
      </el-col>
      </template>
    </el-form-item>
    <el-form-item label="内盒包纸">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isOuterPaper" true-label="含包纸" false-label="不含包纸">
          {{isOuterPaper}}
        </el-checkbox>
      </el-col>
      <template v-if="isOuterPaper=='含包纸'">
        <el-col :span="3">
          <el-select placeholder="请选择纸张" v-model="outerPaper">
            <el-option label="铜版纸" value="铜版纸"></el-option>
            <el-option label="特种纸" value="特种纸"></el-option>
            <el-option label="牛皮纸" value="牛皮纸"></el-option>
            <el-option label="自设纸" value="自设纸"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <template v-if="outerPaper!='自设纸'">
            <el-select placeholder="请选择克重" v-model="outerPaperWeight">
              <el-option label="100g" value="100"></el-option>
              <el-option label="128g" value="128"></el-option>
              <el-option label="157g" value="157"></el-option>
            </el-select>
          </template>
          <template v-if="outerPaper=='自设纸'">
            <el-input placeholder="单价" v-model="outerPagePrice">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="请选择印刷" v-model="outerPrint">
            <el-option label="四色" value="1"></el-option>
            <el-option label="单色" value="2"></el-option>
            <el-option label="专色" value="3"></el-option>
            <el-option label="无需印刷" value="4"></el-option>
          </el-select>
        </el-col>
      <el-col :span="3" :offset="1">
        <el-checkbox class="checkbox" v-model="isOuterFilm">覆膜</el-checkbox>
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
          <el-option v-for="item in this.cardboards" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择厚度" v-model="thick">
          <el-option v-for="item in this.thicks" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-checkbox class="checkbox" v-model="isOuterCardboard">内盒纸板</el-checkbox>
      </el-col>
      <template v-if="isOuterCardboard">
      <el-col :span="3">
      <el-select placeholder="请选择纸板" v-model="outerCardboard">
        <el-option v-for="item in this.cardboards" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select placeholder="请选择厚度" v-model="outerThick">
          <el-option v-for="item in this.thicks" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      </template>
      </template>
    </el-form-item>
    <el-form-item label="后道工艺">
      <el-col :span="3">
        <el-checkbox class="checkbox" v-model="isUV">UV油</el-checkbox>
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
  <el-dialog title="报价" @close="closePrice" v-model="dialogPriceVisible" :close-on-click-modal="false" :close-on-press-escape="false">
    皮壳包纸：纸张：{{this.boxPrice.hullPage}} 印刷：{{this.boxPrice.hullPrint}}覆膜：{{this.boxPrice.hullFilm}}</br>
    皮壳纸板：{{this.boxPrice.hullCardboard}} </br>
    内盒包纸：{{this.boxPrice.boxOuterPage}} 印刷：{{this.boxPrice.outerPrint}} 覆膜：{{this.boxPrice.outerFilm}}</br>
    内盒纸板：{{this.boxPrice.boxOuterCardboard}}</br>
    内贴纸张：{{this.boxPrice.sticker}}
    印刷：{{this.boxPrice.stickerPrint}}
    覆膜：{{this.boxPrice.stickerFilm}}</br>
    卡合：{{this.boxPrice.made}}
    V槽：{{this.boxPrice.Vcut}}</br>
    纸箱：{{this.boxPrice.carton}}
    烫金：{{this.boxPrice.permed}}
    加工费：{{this.boxPrice.process}}</br>
    合计：{{this.boxPrice.count}}
  </el-dialog>
</div>
</template>

<script>
import js_CountPrice from '../lib/CountPrice.js'
import selectData from '../data/selectData.vue'
export default {
  data () {
    return {
      long:100,
      wide:100,
      height:100,
      insidecut:2,
      take:'1',
      quantity:'1000',
      isPaper:'含包纸',
      paper:'铜版纸',
      paperWeight:'128',
      isHullFilm:false,
      pagePrice:0,   //自设纸价格
      isOuterPaper:'含包纸',
      outerPaper:'铜版纸',
      outerPaperWeight:'128',
      outerPagePrice:0,
      isOuterFilm:false,    
      isCardboard:'含纸板',
      cardboard:'双灰板',
      thick:'2',
      isOuterCardboard:false,//内盒纸板
      outerCardboard:'双灰板',
      outerThick:'2',
      isSticker:false,
      StickerPaper:'铜版纸',
      StickerPaperWeight:'128',
      StickerPagePrice:0,
      stickerPrint:'1',
      isStickerFilm:false,
      curling:15,
      print:'1',
      outerPrint:'4',
      technique:'1',
      isUV:false,
      ispermed:0,
      permed:'1',
      dialogPriceVisible:false,
      isCarton:true,
      loading:false,
      boxPrice:{
        count:0,
        hullPage:0,
        boxOuterPage:0,
        sticker:0,
        hullCardboard:0,
        boxOuterCardboard:0,
        hullPrint:0,
        outerPrint:0,
        stickerPrint:0,
        cutt:0,//刀模
        made:0,//卡合
        Vcut:0,
        hullFilm:0,
        outerFilm:0,
        stickerFilm:0,
        process:0,
        inclosePrice:0,
        carton:0,
        permed:0
      }
    }
  },
  mixins: [selectData],
  components: {
    
  },
  computed:{
    boxOuterCardboard:function(){
      return this.isOuterCardboard ? this.outerCardboard : this.cardboard;
    },
    boxOuterThick:function(){
      return this.isOuterCardboard ? outerThick : this.thick;
    },
    hullLong:function(){
      return this.take=='1' ? this.wide*2+this.height*2-this.thick-1 : this.wide*2+this.height*2-this.thick-0.5;
    },
    hullWide:function(){
      return this.long;
    },
    stickerLong:function(){
      let long=this.take=='1' ? this.wide+this.height*1.5-this.thick-1 : this.wide+this.height*1.5-this.thick-0.5;
      return long-1;
    },
    stickerWide:function(){
      return this.hullWide-2;
    },
    techniqueCheage:function(){
      return this.technique=='1' ? 3 : 10; 
    },
    boxOuterlong:function(){
      return this.long-this.insidecut*2;
    },
    boxOuterWide:function(){
      return this.wide-this.thick*2-1;
    },
    boxOuterHeight:function(){
      return this.height-this.thick*2;
    },
    boxOuterCardboardLong:function(){
      return this.boxOuterlong+this.boxOuterHeight*2;
    },
    boxOuterCardboardWide:function(){
      return this.boxOuterWide+this.boxOuterHeight*2;
    },
    hullColorSurfaceLong:function(){
      return this.hullLong+this.thick*2+this.curling;
    },
    hullColorSurfaceWide:function(){
      return this.hullWide+this.thick*2+this.curling*2;
    },
    boxOuterColorSurfaceLong:function(){
      return this.boxOuterCardboardLong+this.thick*2+this.curling*2
    },
    boxOuterColorSurfaceWide:function(){
      return this.boxOuterCardboardWide+this.thick*2+this.curling*2
    }
  },
  methods:{
    closePrice:function(){//清空价格数据
      for (var i in this.boxPrice){
        this.boxPrice[i]=0;
      }
    },
    CountPrice:function(){
      let PrintPrint=0;
      let cuttQuantity=0;//计算刀版数量
      this.loading=true;
      js_CountPrice.ProcessPromise('书型盒1',this.quantity).then(value=>{
        this.boxPrice.process=value.toFixed(2);
      }).then(()=>{//纸板
        if(this.isCardboard=='含纸板'){
          return js_CountPrice.CardboardPromise(this.hullLong+this.techniqueCheage,this.hullWide+this.techniqueCheage,this.cardboard,this.thick,true).then(value=>{
            this.boxPrice.hullCardboard=value.toFixed(2);
          }).then(()=>{
            return js_CountPrice.CardboardPromise(this.boxOuterCardboardLong+this.techniqueCheage,this.boxOuterCardboardWide+this.techniqueCheage,this.boxOuterCardboard,this.boxOuterThick,true).then(value=>{
              this.boxPrice.boxOuterCardboard=value.toFixed(2);
            })
          })  
          if(this.technique=='1'){//计算V槽
            this.boxPrice.Vcut=0.3;
          }else{
            this.boxPrice.Vcut=0.1;
            cuttQuantity+=2;
          }
        }
      }).then(()=>{//皮壳包纸
        if(this.isPaper=='含包纸'){
          if(this.paper=='自设纸'){
            this.boxPrice.hullPage=js_CountPrice.ColorSurface(this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.paper,this.paperWeight,this.pagePrice).toFixed(2);
          }else{
            return js_CountPrice.ColorSurfacePromise(this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.paper,this.paperWeight).then(value=>{
              this.boxPrice.hullPage=value.toFixed(2);
            }).then(()=>{
              if (this.isHullFilm){//覆膜
                return js_CountPrice.FilmPromise(this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.quantity).then(value=>{
                  this.boxPrice.hullFilm=value.toFixed(2);
                })
              }
            })
          }
        }
      }).then(()=>{//内盒包纸
        if(this.isOuterPaper=='含包纸'){
          if(this.outerPaper=='自设纸'){
            this.boxPrice.boxOuterPage=js_CountPrice.ColorSurface(this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceWide,this.outerPaper,this.outerPaperWeight,this.outerPagePrice).toFixed(2);
          }else{
            return js_CountPrice.ColorSurfacePromise(this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceWide,this.outerPaper,this.outerPaperWeight).then(value=>{
              this.boxPrice.boxOuterPage=value.toFixed(2);
            }).then(()=>{//内盒覆膜
              if(this.isOuterFilm){
                return js_CountPrice.FilmPromise(this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceWide,this.quantity).then(value=>{
                  this.boxPrice.outerFilm=value.toFixed(2);
                });
              }
            })
          }
        }
      }).then(()=>{//印刷费
        if(this.print!='4' && this.isPaper=='含包纸'){
          return js_CountPrice.PrintPromise(this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.quantity,this.print).then(value=>{
            this.boxPrice.hullPrint=value.toFixed(2);
          }).then(()=>{//内盒
            return js_CountPrice.PrintPromise(this.boxOuterColorSurfaceLong,this.boxOuterColorSurfaceWide,this.quantity,this.outerPrint).then(value=>{
              this.boxPrice.outerPrint=value.toFixed(2);
            })
          }).then(()=>{//内贴
            return js_CountPrice.PrintPromise(this.stickerLong,this.stickerWide,this.quantity,this.stickerPrint).then(value=>{
              this.boxPrice.stickerPrint=value.toFixed(2);
            })
          })
        }
      }).then(()=>{//卡合
        return js_CountPrice.KaHePromise(this.hullColorSurfaceLong,this.hullColorSurfaceWide,this.quantity).then(value=>{
          cuttQuantity+=1;
          this.boxPrice.made=(value*cuttQuantity).toFixed(2);
        })
      }).then(()=>{//内贴纸
        if(this.isSticker){
          if(this.StickerPaper=='自设纸'){
            this.boxPrice.sticker=js_CountPrice.ColorSurface(this.stickerLong,this.stickerWide,this.StickerPaper,this.StickerPaperWeight,this.StickerPagePrice).toFixed(2);
          }else{
            return js_CountPrice.ColorSurfacePromise(this.stickerLong,this.stickerWide,this.StickerPaper,this.StickerPaperWeight).then(value=>{
              this.boxPrice.sticker=value.toFixed(2);
            }).then(()=>{//覆膜
              if(this.isStickerFilm){
                return js_CountPrice.FilmPromise(this.stickerLong,this.stickerWide,this.quantity).then(value=>{
                  this.boxPrice.stickerFilm=value.toFixed(2);
                })
              }
            })
          }
        }
      }).then(()=>{//烫金
        if(this.ispermed){
          return js_CountPrice.Permed(this.permed,this.quantity).then(value=>{
            this.boxPrice.permed=value.toFixed(2);
          })
        }
      }).then(()=>{
      if(this.isCarton){//纸箱价格计算
        this.boxPrice.carton=js_CountPrice.Carton(this.long,this.wide,this.height).toFixed(2);
      }
      for (var i in this.boxPrice){//合计价格计算
        this.boxPrice.count+= i=="count" ?  0 : Number(this.boxPrice[i]);
      }
      this.boxPrice.count=this.boxPrice.count.toFixed(2);
      this.dialogPriceVisible=true;
      this.loading=false;
      })

    }
  }
}
</script>