<template>
  <div>
  <el-tabs type="border-card" v-if="PriceList" value="Cardboards" @tab-click="TabsClick" v-loading.body="loading">
    <el-tab-pane label="纸板" name="Cardboards">
      <el-table :data="PriceList.Cardboards">
        <el-table-column  prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="price" label="吨价">
        </el-table-column>
        <el-table-column :context="_self" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="PriceEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="计算公式参考">
          <template slot-scope="scope">
            <label>吨价÷[2327,1884]×克重÷500=单张价格</label>
           </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="纸张" name="Papers">
      <el-table :data="PriceList.Papers" >
        <el-table-column prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="price" label="价格" >
        </el-table-column>
        <el-table-column :context="_self" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="PriceEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="提绳" name="Ropes">
      <el-table :data="PriceList.Ropes" >
        <el-table-column prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="price" label="价格" >
        </el-table-column>
        <el-table-column :context="_self" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="PriceEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="印刷" name="Prints">
      <el-table :data="PriceList.Prints" >
        <el-table-column prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="price" label="起步价" >
        </el-table-column>
        <el-table-column prop="addPrice" label="递增价格" >
        </el-table-column>
        <el-table-column :context="_self" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="PriceEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="印后工艺" name="FinishPrints">
      <el-table :data="PriceList.FinishPrints" >
        <el-table-column prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="price" label="起步价" >
        </el-table-column>
        <el-table-column prop="addPrice" label="递增价格" >
        </el-table-column>
        <el-table-column :context="_self" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="PriceEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="加工费" name="Process">
      <el-table :data="PriceList.Process">
        <el-table-column fixed prop="name" label="名称" >
        </el-table-column>
        <el-table-column prop="startPrice" label="起步价" >
        </el-table-column>
        <el-table-column label="报价">
          <el-table-column prop="500" label="500个" >
          </el-table-column>
          <el-table-column prop="1000" label="1000个" >
          </el-table-column>
          <el-table-column prop="2000" label="2000个" >
          </el-table-column>
          <el-table-column prop="5000" label="5000个" >
          </el-table-column>
          <el-table-column prop="10000" label="10000个" >
          </el-table-column>
          <el-table-column prop="20000" label="20000个" >
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" :context="_self" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="PriceEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-dialog title="提示" width="30%" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
      <el-form-item>
        <label>{{form.name}}</label>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" auto-complete="off"></el-input>
      </el-form-item>
      <template v-for="(value, key)  in form">
        <el-form-item :label="key" :key="key" v-if="key!='name' && key!='price'">
          <el-input v-model="form[key]" :value="value" auto-complete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="UpdatePrice">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import CountPriceJs from '../lib/CountPrice'

export default {
  data () {
    return {
      loading: true,
      // 当前选中的tabs名称
      activeName: 'Cardboards',
      avID: null,
      ref: {},
      // 当前选择的行
      index: 0,
      dialogFormVisible: false,
      PriceList: null,
      form: {
      }
    }
  },
  created: function () {
    CountPriceJs.getPriceList().then(res => {
      this.PriceList = res
      this.loading = false
    })
  },
  methods: {
    // 更新价格
    UpdatePrice: function () {
      // 对象复制到新对象
      let newPrice = JSON.parse(JSON.stringify(this.PriceList[this.activeName]))
      newPrice[this.index] = this.form
      // 需通过parseJSON转换获取leancloud对象
      let pp = CountPriceJs.parseJSON(this.PriceList)
      pp.set(this.activeName, newPrice)
      pp.save().then(() => {
        // 更新成功 修改视图
        this.PriceList[this.activeName] = newPrice
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
      this.dialogFormVisible = false
    },
    // 目前选中的Tabsindex
    TabsClick: function (i) {
      this.activeName = i.name
    },
    // 价格修改
    PriceEdit (index, row) {
      this.dialogFormVisible = true
      // 判断目前在那个tabs页面操作
      this.index = index
      this.form = null
      this.form = JSON.parse(JSON.stringify(this.PriceList[this.activeName][index]))
      console.log(this.form)
      // this.form.name = this.PriceList[this.activeName][index].name
      // this.form.price = this.PriceList[this.activeName][index].price
    }
  }
}
</script>