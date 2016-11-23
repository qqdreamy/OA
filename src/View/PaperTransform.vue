<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item >
        纸张尺寸
        <el-select v-model="tableData[0].size">
          <el-option v-for="item in Sizes" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        克重
        <el-select v-model="tableData[0].weight">
          <el-option-group v-for="group in Weights" :label="group.label">
            <el-option v-for="item in group.options" :label="item.label" :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item>
        吨价
        <el-input placeholder="请输入内容" v-on:input="Count"  v-model="tableData[0].tonprice">
        </el-input>
      </el-form-item>
    </el-form>
      <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="size"
            label="纸张尺寸"
            width="180">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="克重"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tonprice"
            label="吨价">
          </el-table-column>
          <el-table-column inline-template
            label="令价">
            <div>{{ream}}</div>
          </el-table-column>
          <el-table-column inline-template
            label="单价">
            <div>{{price}}</div>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Sizes: [{
        value: '889*1194',
        label: '889*1194'
      }, {
        value: '787*1092',
        label: '787*1092'
      }],
      Weights:[{
        label:'纸张',
      options:[{
        value:'75',
        label:'75g'
      },{
        value:'80',
        label:'80g'
      },{
        value:'100',
        label:'100g'
      },{
        value:'120',
        label:'120g'
      },{
        value:'150',
        label:'150g'
      },{
        value:'157',
        label:'157g'
      },{
        value:'250',
        label:'250g'
      }]
      },{
        label:'纸板',
        options:[{
          value:'850',
          label:'1.5mm'
        },{
          value:'1150',
          label:'2.0mm'
        },{
          value:'1450',
          label:'2.5mm'
        },{
          value:'1750',
          label:'3.0mm'
        }]
      }],
      tableData: [{
        size: '',
        weight: '',
        tonprice: '',
        ream:'',
        price:''
      }],
      ream:'',
      price:''
    }
  },
  computed:{
    ream:function(){
      if(this.tableData[0].size=='889*1194'){
        return (this.tableData[0].tonprice/1884*this.tableData[0].weight).toFixed(2);
      }else{
        return (this.tableData[0].tonprice/2327*this.tableData[0].weight).toFixed(2);
      }
    },
    price:function(){
      return (this.ream/500).toFixed(2);
    }
  },
  methods:{
    Count:function(){
      //alert (1);
      //var ream= (this.tableData[0].tonprice/1884*this.tableData[0].weight).toFixed(2)
      //this.$set(this.tableData[0],'ream','111');
      //alert (this.tableData[0].size);
    }
  }
}
</script>
<style type="text/css">

</style>
