<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="纸张尺寸">
        <el-input placeholder="自定义尺寸" v-model="long">
          <template slot="prepend">长</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="自定义尺寸"  v-model="wide">
          <template slot="prepend">宽</template>
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-input placeholder="自定义克重"  v-model="tableData[0].weight">
          <template slot="prepend">克重</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入内容" v-model="tableData[0].tonprice">
          <template slot="prepend">吨价</template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="7" :offset="1">
        <el-select @change="changeSize" v-model="tableData[0].size">
          <el-option v-for="item in Sizes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-select placeholder="请选择克重" v-model="tableData[0].weight">
          <el-option-group v-for="group in Weights" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="纸张尺寸" width="180">
        <template slot-scope="scope">
          {{long}}*{{wide}}
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="克重" width="180">
      </el-table-column>
      <el-table-column prop="tonprice" label="吨价">
      </el-table-column>
      <el-table-column prop="ream" label="令价">
        <template slot-scope="scope">
          {{ream}}
        </template>
      </el-table-column>
      <el-table-column  label="单价">
        <template slot-scope="scope">
          {{price}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      long: 889,
      wide: 1194,
      Sizes: [
        {value: '889*1194', label: '889*1194'},
        {value: '787*1092', label: '787*1092'}
      ],
      Weights: [{
        label: '纸张',
        options: [{
          value: '75',
          label: '75g'
        }, {
          value: '80',
          label: '80g'
        }, {
          value: '100',
          label: '100g'
        }, {
          value: '120',
          label: '120g'
        }, {
          value: '150',
          label: '150g'
        }, {
          value: '157',
          label: '157g'
        }, {
          value: '250',
          label: '250g'
        }]
      }, {
        label: '纸板',
        options: [{
          value: '850',
          label: '1.5mm'
        }, {
          value: '1150',
          label: '2.0mm'
        }, {
          value: '1450',
          label: '2.5mm'
        }, {
          value: '1750',
          label: '3.0mm'
        }]
      }],
      tableData: [{
        size: '',
        weight: '',
        tonprice: '',
        ream: '',
        price: ''
      }]
    }
  },
  computed: {
    ream: function () {
      let cs = 1000 * 1000 / (((this.long / 1000) * (this.wide / 1000)) * 500)
      return (this.tableData[0].tonprice / cs * this.tableData[0].weight).toFixed(2)
    },
    price: function () {
      return (this.ream / 500).toFixed(2)
    }
  },
  mounted () {
  },
  methods: {
    changeSize: function (size) {
      this.long = size.substring(0, 3)
      this.wide = size.substring(4)
    }
  }
}
</script>
<style type="text/css">

</style>
