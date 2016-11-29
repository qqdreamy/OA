<template>
  <div>
  <el-tabs type="border-card" style="width: 100%" :active-name="activeName" @tab-click="TabsClick" v-loading.body="loading">
    <el-tab-pane label="纸板">
      <el-table :data="Cardboard" style="width: 100%">
        <el-table-column  prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="吨价" width="180">
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作" >
          <el-button size="small" @click="handleEdit($index, row)">
          编辑
          </el-button>
        </el-table-column>
        <el-table-column inline-template prop="price" label="计算公式参考">
          <label>吨价÷[2327,1884]×克重÷500=单张价格</label>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="纸张">
      <el-table :data="CopperplatePaper" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180">
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作">
          <el-button size="small" @click="CPEdit($index, row)">
          编辑
          </el-button>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="提绳">
      <el-table :data="ropes" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180">
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作">
          <el-button size="small" @click="RopesEdit($index, row)">
          编辑
          </el-button>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="印刷">
      <el-table :data="Print" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="起步价" width="180">
        </el-table-column>
        <el-table-column prop="addPrice" label="递增价格" width="180">
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作">
          <el-button size="small" @click="PrintEdit($index, row)">
          编辑
          </el-button>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="印后工艺">
      <el-table :data="finishPrint" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="起步价" width="180">
        </el-table-column>
        <el-table-column prop="addPrice" label="递增价格" width="180">
        </el-table-column>
        <el-table-column :context="_self" inline-template label="操作">
          <el-button size="small" @click="FinishPrintEdit($index, row)">
          编辑
          </el-button>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="加工费">
      <el-table :data="process" border style="width: 100%">
        <el-table-column fixed prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="起步价" label="起步价" width="180">
        </el-table-column>
        <el-table-column label="报价">
          <el-table-column prop="500" label="500个" width="180">
          </el-table-column>
          <el-table-column prop="1000" label="1000个" width="180">
          </el-table-column>
          <el-table-column prop="2000" label="2000个" width="180">
          </el-table-column>
          <el-table-column prop="5000" label="5000个" width="180">
          </el-table-column>
          <el-table-column prop="10000" label="10000个" width="180">
          </el-table-column>
          <el-table-column prop="20000" label="20000个" width="180">
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" :context="_self" inline-template label="操作">
          <el-button size="small" @click="ProcessBox($index, row)">
          编辑
          </el-button>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-button type="primary" @click.native="CountPrice">测试</el-button>
  <el-dialog title="编辑" v-model="dialogFormVisible" size="tiny">
    <el-form :model="form">
      <el-form-item label="名称" :label-width="formLabelWidth" >
        <el-col :span="24"><label>{{form.name}}</label></el-col>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" auto-complete="off"></el-input>
      </el-form-item>
      <template v-if="activeName=='4' || activeName=='5'">
      <el-form-item label="递增价格" :label-width="formLabelWidth">
        <el-input v-model="form.addPrice" auto-complete="off"></el-input>
      </el-form-item>
      </template>
      <template v-if="activeName=='6'">
      <el-form-item label="500价格" :label-width="formLabelWidth">
        <el-input v-model="form.quantity500" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="1000价格" :label-width="formLabelWidth">
        <el-input v-model="form.quantity1000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="2000价格" :label-width="formLabelWidth">
        <el-input v-model="form.quantity2000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="5000价格" :label-width="formLabelWidth">
        <el-input v-model="form.quantity5000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="10000价格" :label-width="formLabelWidth">
        <el-input v-model="form.quantity10000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="20000价格" :label-width="formLabelWidth">
        <el-input v-model="form.quantity20000" auto-complete="off"></el-input>
      </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="UpdatePrice">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import wilddog from 'wilddog'
import js_CountPrice from '../lib/CountPrice.js'
export default {
  data () {
    return {
      loading: true,
      activeName:'1',
      ref:{},
      dialogFormVisible:false,
      Cardboard:[],
      CopperplatePaper:[],
      Print:[],
      finishPrint:[],
      process:[],
      ropes:[],
      form: {
        name: '',
        price:'0',
        addPrice:'0',
        quantity500:'0',
        quantity1000:'0',
        quantity2000:'0',
        quantity5000:'0',
        quantity10000:'0',
        quantity20000:'0'
      }
    }
  },
  created: function () {
    var config = {
      authDomain: "decbzoa.wilddog.com",
      syncURL: "https://decbzoa.wilddogio.com"
    };
    wilddog.initializeApp(config);
    this.ref = wilddog.sync().ref();
    this.ref.child('纸板').on('value', (snapshot)=>{
      this.Cardboard=Object.keys(snapshot.val()).map(function(k){return snapshot.val()[k]});
      this.loading=false;
    });
    this.ref.child('纸张').on('value',(snapshot)=>{
      this.CopperplatePaper=Object.keys(snapshot.val()).map(function(k){return snapshot.val()[k]});
    });
    this.ref.child('印刷').on('value',(snapshot)=>{
      this.Print=Object.keys(snapshot.val()).map(function(k){return snapshot.val()[k]});
    });
    this.ref.child('印后').on('value',(snapshot)=>{
      this.finishPrint=Object.keys(snapshot.val()).map(function(k){return snapshot.val()[k]});
    });
    this.ref.child('加工费').on('value',(snapshot)=>{
      this.process=Object.keys(snapshot.val()).map(function(k){return snapshot.val()[k]});
    });
    this.ref.child('提绳').on('value',(snapshot)=>{
      this.ropes=Object.keys(snapshot.val()).map(function(k){return snapshot.val()[k]});
    });
  },
  methods:{
    UpdatePrice:function(){
      if(this.activeName=='1'){
        var hopperRef = this.ref.child("纸板").child(this.form.name);
        hopperRef.update({
          "price": this.form.price
        }).then(()=>{
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
        }).catch(function(err){
          //error
        });
      }else if(this.activeName=='2'){
        var hopperRef = this.ref.child("纸张").child(this.form.name);
        hopperRef.update({
          "price": this.form.price
        });
      }else if(this.activeName=='3'){
        var hopperRef = this.ref.child("提绳").child(this.form.name);
        hopperRef.update({
          "price": this.form.price
        });
      }else if(this.activeName=='4'){
        var hopperRef = this.ref.child("印刷").child(this.form.name);
        hopperRef.update({
          "price": this.form.price,
          "addPrice":this.form.addPrice
        }).then(()=>{
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
        }).catch(function(err){
          //error
        });
      }else if(this.activeName=='5'){
        let hopperRef=this.ref.child("印后").child(this.form.name);
        hopperRef.update({
          "price": this.form.price,
          "addPrice":this.form.addPrice
        });
      }else if(this.activeName=='6'){
        let hopperRef=this.ref.child("加工费").child(this.form.name);
        hopperRef.update({
          "起步价": this.form.price,
          "500":this.form.quantity500,
          "1000":this.form.quantity1000,
          "2000":this.form.quantity2000,
          "5000":this.form.quantity5000,
          "10000":this.form.quantity10000,
          "20000":this.form.quantity20000
        });
      }
      this.dialogFormVisible=false;
    },
    TabsClick:function(i){
      this.activeName=i.index;
    },
    CPEdit(index,row){
      this.form.name=this.CopperplatePaper[index].name;
      this.form.price=this.CopperplatePaper[index].price;
      this.dialogFormVisible=true;
    },
    handleEdit(index, row) {
      this.form.name=this.Cardboard[index].name;
      this.form.price=this.Cardboard[index].price;
      this.dialogFormVisible=true;
    },
    RopesEdit(index,row){
      this.form.name=this.ropes[index].name;
      this.form.price=this.ropes[index].price;
      this.dialogFormVisible=true;
    },
    PrintEdit(index,row){
      this.form.name=this.Print[index].name;
      this.form.price=this.Print[index].price;
      this.form.addPrice=this.Print[index].addPrice;
      this.dialogFormVisible=true;
    },
    FinishPrintEdit(index,row){
      this.form.name=this.finishPrint[index].name;
      this.form.price=this.finishPrint[index].price;
      this.form.addPrice=this.finishPrint[index].addPrice;
      this.dialogFormVisible=true;
    },
    ProcessBox(index,row){
      this.form.name=this.process[index].name;
      this.form.price=this.process[index]['起步价'];
      this.form.quantity500=this.process[index]['500'];
      this.form.quantity1000=this.process[index]['1000'];
      this.form.quantity2000=this.process[index]['2000'];
      this.form.quantity5000=this.process[index]['5000'];
      this.form.quantity10000=this.process[index]['10000'];
      this.form.quantity20000=this.process[index]['20000'];
      this.dialogFormVisible=true;
    },
    CountPrice:function(){
      /*js_CountPrice.CardboardPromise(100,100,'双灰板','2',true).then(function(value){
        console.log(value);
      }).catch(function(){

      });*/
      //console.log(this.activeName);
    }
  }
}
</script>