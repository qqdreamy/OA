<template>
  <div>
  <el-form label-width="80px" v-loading.body="loading" element-loading-text="正在计算ing">
    <el-form-item label="类型">
      <el-col :span="4">
        <img src="../assets/bag_model.jpg" width="128px" height="128px" alt="郁金香" />
      </el-col>
    </el-form-item>
    <el-form-item label="成品尺寸">
      <el-col :span="3">
        <el-input placeholder="" v-model.number="long">
          <template slot="prepend">长：</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-input placeholder="" v-model.number="wide">
          <template slot="prepend">宽：</template>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1">
          <el-input placeholder="" v-model.number="height">
            <template slot="prepend">高：</template>
          </el-input>
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
          <el-option v-for="item in this.prints" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
    <el-form-item label="印后工艺">
      <el-col :span="2" >
        <el-checkbox class="checkbox" v-model="isfilm" border>光膜/哑膜</el-checkbox>
      </el-col>
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="ispermed" border>烫工艺</el-checkbox>
      </el-col>
      <template v-if="ispermed">
        <el-col :span="4">
          分色 : 
          <el-input-number v-model="permed" :min="1" :max="5" label="描述文字"></el-input-number>
        </el-col>
      </template>
    </el-form-item>
    <el-form-item label="">
      <el-col :span="2">
        <el-checkbox class="checkbox" v-model="isUV" border>UV上光</el-checkbox>
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
    印刷：{{this.boxPrice.print}}<br/>
    覆膜：{{this.boxPrice.film}}<br/>
    提绳：{{this.boxPrice.rope}}<br/>
    烫金：{{this.boxPrice.permed}}<br/>
    UV：{{this.boxPrice.UV}}<br/>
    加工费:{{this.boxPrice.process}}<br/>
    </p>
    <P slot="count">合计：{{this.boxPrice.count}}</P>
</dialogPrice>
  </div>
</template>

<script>
import selectData from '../data/selectData'
import CountPriceJs from '../lib/CountPrice'
import dialogPrice from '../components/dialogPrice'

export default {
  data () {
    return {
      long: 300,
      wide: 110,
      height: 280,
      quantity: '1000',
      paper: '白卡纸',
      paperWeight: '250',
      pagePrice: 0,
      print: '1',
      rope: '三股棉绳',
      isfilm: true,
      ispermed: false,
      permed: '1',
      bagType: 1, // 手提袋: 1:单粘 2:双粘
      isUV: false,
      uvLong: 0,
      uvWide: 0,
      isExpand: false,
      dialogPriceVisible: false,
      loading: false,
      boxPrice: {
        count: 0,
        paper: 0,
        print: 0,
        film: 0,
        rope: 0,
        process: 0,
        UV: 0,
        permed: 0
      }
    }
  },
  mixins: [selectData],
  components: {
    dialogPrice
  },
  computed: {
    BagLong: function () {
      const MaxLong = 920 - 15 // 最大单粘对开印刷尺寸,15mm印刷咬口
      if (this.long * 2 + this.wide * 2 + 20 > MaxLong) {
        this.bagType = 2
        return this.long + (this.wide - 1) + 20
      } else {
        this.bagType = 1
        return this.long * 2 + this.wide * 2 + 20
      }
    },
    BagWide: function () {
      // 折边40、底部：宽度/2+15
      return this.height + 40 + (this.wide / 2 + 15)
    }
  },
  created: function () {
    console.log(CountPriceJs)
  },
  methods: {
    // 清空数据
    closePrice: function () {
      this.dialogPriceVisible = false
      for (var i in this.boxPrice) {
        this.boxPrice[i] = 0
      }
    },
    CountPrice: function () {
      this.loading = true
      let quantity = this.bagType === 2 ? this.quantity * 2 : this.quantity
      // 20%利润计算常量
      const profit = 1.2
      CountPriceJs.getPrices().then(() => {
        if (this.print !== '4') {
          // 获取印刷价格
          let printPrice = CountPriceJs.PrintPromise(this.BagLong, this.BagWide, quantity, this.print)
          // 判断是否双粘 如果双粘则印刷费x2
          this.boxPrice.print = this.bagType === 2 ? printPrice * 2 : printPrice
        }
        // 加工费
        this.boxPrice.process = CountPriceJs.ProcessPromise(`手提袋${this.bagType}`, this.quantity)
        // 纸张
        let colorSurfacePrice = CountPriceJs.ColorSurface(this.BagLong, this.BagWide, this.paper, this.paperWeight, this.pagePrice)
        this.boxPrice.paper = (this.bagType === 2 ? colorSurfacePrice * 2 : colorSurfacePrice).toFixed(2)
        // 覆膜
        if (this.isfilm) {
          let film = CountPriceJs.Film(this.BagLong, this.BagWide, quantity)
          this.boxPrice.film = (this.bagType === 2 ? film * 2 : film).toFixed(2)
        }
        // 烫金
        if (this.ispermed) {
          this.boxPrice.permed = CountPriceJs.Permed(this.permed, quantity).toFixed(2)
        }
        // 提绳
        this.boxPrice.rope = CountPriceJs.Rope(this.rope)
      }).then(() => {
        // 自动计算总价
        for (var i in this.boxPrice) {
          this.boxPrice.count += i === 'count' ? 0 : Number(this.boxPrice[i])
        }
        this.boxPrice.count = (this.boxPrice.count * profit).toFixed(2)
        this.dialogPriceVisible = true
        this.loading = false
      }).catch(value => console.log(value))
    }
  }
}
</script>