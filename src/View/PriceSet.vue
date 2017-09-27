<template>
  <div>
  <el-tabs type="border-card" style="width: 100%" :active-name="activeName" @tab-click="TabsClick" v-loading.body="loading">
    <el-tab-pane label="纸板">
      <el-table :data="Cardboard" style="width: 100%">
        <el-table-column  prop="_serverData.Name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.Price" label="吨价" width="180">
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
        <el-table-column prop="_serverData.name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.price" label="价格" width="180">
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
        <el-table-column prop="_serverData.name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.price" label="价格" width="180">
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
        <el-table-column prop="_serverData.name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.price" label="起步价" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.addPrice" label="递增价格" width="180">
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
        <el-table-column prop="_serverData.name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.price" label="起步价" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.addPrice" label="递增价格" width="180">
        </el-table-column>
        <el-table-column :context="_self" label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="FinishPrintEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="加工费">
      <el-table :data="process" border style="width: 100%">
        <el-table-column fixed prop="_serverData.name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="_serverData.startPrice" label="起步价" width="180">
        </el-table-column>
        <el-table-column label="报价">
          <el-table-column prop="_serverData.500" label="500个" width="180">
          </el-table-column>
          <el-table-column prop="_serverData.1000" label="1000个" width="180">
          </el-table-column>
          <el-table-column prop="_serverData.2000" label="2000个" width="180">
          </el-table-column>
          <el-table-column prop="_serverData.5000" label="5000个" width="180">
          </el-table-column>
          <el-table-column prop="_serverData.10000" label="10000个" width="180">
          </el-table-column>
          <el-table-column prop="_serverData.20000" label="20000个" width="180">
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
        <el-input v-model.number="form.price" auto-complete="off"></el-input>
      </el-form-item>
      <template v-if="activeName=='3' || activeName=='4'">
      <el-form-item label="递增价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.addPrice" auto-complete="off"></el-input>
      </el-form-item>
      </template>
      <template v-if="activeName=='5'">
      <el-form-item label="500价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.quantity500" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="1000价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.quantity1000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="2000价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.quantity2000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="5000价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.quantity5000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="10000价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.quantity10000" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="20000价格" :label-width="formLabelWidth">
        <el-input v-model.number="form.quantity20000" auto-complete="off"></el-input>
      </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="UpdatePrice()">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import js_CountPrice from '../lib/CountPrice.js'
export default {
  data () {
    return {
      loading: true,
      activeName:'0',
      avID:null,
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
        price:0,
        addPrice:0,
        quantity500:0,
        quantity1000:0,
        quantity2000:0,
        quantity5000:0,
        quantity10000:0,
        quantity20000:0
      }
    }
  },
  created: function () {
    //实例化储存对象
    const appId = 'cjtOItWI6rsyCzjvJCh9iSMH-gzGzoHsz';
    const appKey = '5uIGW67Gq2wbEnLaD7IlVUHu';
    AV.init({ appId, appKey });
    this.ClassFind('Cardboards').then(results=>{
      this.loading=false;
      this.Cardboard=results;
    }).then(()=>{
      this.ClassFind('CopperplatePapers').then(results=>{
        this.CopperplatePaper=results;
      })
    }).then(()=>{
      this.ClassFind('ropes').then(results=>{
        this.ropes=results;
      })
    }).then(()=>{
      this.ClassFind('Prints').then(results=>{
        this.Print=results;
      })
    }).then(()=>{
      this.ClassFind('FinishPrints').then(results=>{
        this.finishPrint=results;
      })
    }).then(()=>{
      this.ClassFind('Process').then(results=>{
        this.process=results;
      })
    })
  },
  methods:{
    ClassFind:function(className){
      return new Promise((resolve,reject)=>{
        let query=new AV.Query(className);
        query.find().then(results=>{
          resolve(results); 
        }, function(error){
          reject(error);
        });
      });
    },
    UpdatePrice:function(){
      if(this.activeName=='0'){
        this.Cardboard[this.avID].set('Price',this.form.price);
        this.Cardboard[this.avID].save();
      }else if(this.activeName=='1'){
        this.CopperplatePaper[this.avID].set('price',this.form.price);
        this.CopperplatePaper[this.avID].save();
      }else if(this.activeName=='2'){
        this.ropes[this.avID].set('price',this.form.price);
        this.ropes[this.avID].save();
      }else if(this.activeName=='3'){
        this.Print[this.avID].set('price',this.form.price);
        this.Print[this.avID].set('addPrice',this.form.addPrice);
        this.Print[this.avID].save().then(()=>{
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
        })
      }else if(this.activeName=='4'){
        this.finishPrint[this.avID].set('price',this.form.price);
        this.finishPrint[this.avID].save();
      }else if(this.activeName=='5'){
        console.log(this.process[this.avID]);
        this.process[this.avID].set('startPrice',this.form.price);
        this.process[this.avID].set('500',this.form.quantity500);
        this.process[this.avID].set('1000',this.form.quantity1000);
        this.process[this.avID].set('2000',this.form.quantity2000);
        this.process[this.avID].set('5000',this.form.quantity5000);
        this.process[this.avID].set('10000',this.form.quantity10000);
        this.process[this.avID].set('20000',this.form.quantity20000);
        this.process[this.avID].save().then(()=>{
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
        })
      }
      this.dialogFormVisible=false;
    },
    TabsClick:function(i){
      this.activeName=i.index;
    },
    CPEdit(index,row){
      this.form.name=this.CopperplatePaper[index].get('name');
      this.form.price=this.CopperplatePaper[index].get('price');
      this.avID=index;
      this.dialogFormVisible=true;
    },
    handleEdit(index, row) {
      this.form.name=this.Cardboard[index].get('Name');
      this.form.price=this.Cardboard[index].get('Price');
      this.avID=index;
      this.dialogFormVisible=true;
    },
    RopesEdit(index,row){
      this.form.name=this.ropes[index].get('name');
      this.form.price=this.ropes[index].get('price');
      this.avID=index;
      this.dialogFormVisible=true;
    },
    PrintEdit(index,row){
      this.form.name=this.Print[index].get('name');
      this.form.price=this.Print[index].get('price');
      this.form.addPrice=this.Print[index].get('addPrice');
      this.avID=index;
      this.dialogFormVisible=true;
    },
    FinishPrintEdit(index,row){
      this.form.name=this.finishPrint[index].get('name');
      this.form.price=this.finishPrint[index].get('price');
      this.form.addPrice=this.finishPrint[index].get('addPrice');
      this.avID=index;
      this.dialogFormVisible=true;
    },
    ProcessBox(index,row){
      console.log(this.process[index]);
      this.form.name=this.process[index].get('name');
      this.form.price=this.process[index].get('startPrice');
      this.form.quantity500=this.process[index].get('500');
      this.form.quantity1000=this.process[index].get('1000');
      this.form.quantity2000=this.process[index].get('2000');
      this.form.quantity5000=this.process[index].get('5000');
      this.form.quantity10000=this.process[index].get('10000');
      this.form.quantity20000=this.process[index].get('20000');
      this.avID=index;
      this.dialogFormVisible=true;
    },
    CountPrice:function(){

    }
  }
}
</script>