<template>
  <div id="app">
	<myHeader></myHeader>
	<el-row>
		<el-col :span="4">
			<el-menu  :default-openeds="['a','b','c']" @select="Paper">
				<el-submenu index="a">
					<template slot="title">报价</template>
					<el-menu-item index="1-1">天地盖</el-menu-item>
					<el-menu-item index="1-2">书型盒</el-menu-item>
					<el-menu-item index="1-3">台历架</el-menu-item>
					<el-menu-item index="1-5">手提袋</el-menu-item>
					<el-menu-item index="1-4">纸质内托</el-menu-item>
				</el-submenu>
				<el-submenu index="b">
					<template slot="title">开料</template>
					<el-menu-item index="2-1">天地盖</el-menu-item>
					<el-menu-item index="2-2">书型盒</el-menu-item>
				</el-submenu>
				<el-submenu index="c" >
					<template slot="title">工具</template>
					<el-menu-item index="3-1">纸板开别计算</el-menu-item>
					<el-menu-item index="3-2" >纸张/纸板价格计算</el-menu-item>
					<el-menu-item index="3-3" >纸箱计算</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-col>
		<el-col :span="16">
			<el-tabs type="card" :active-name="activeName" @tab-remove="removeTab" :closable="true" @tab-click="test">
				<el-tab-pane label="首页" name="home">
					<Home></Home>
				</el-tab-pane>
				<el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.content">
					<router-view :name="tab.content"></router-view>
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
	
   <!-- 
		 
		 <router-link to="/PaperTransform">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link> 
		-->
  </div>
</template>

<script>
import myHeader from './components/myHeader.vue'
import Home from './View/home.vue'
export default {
  data () {
    return {
			activeName:'home',
			oldActiveName:'',
			cardboard: [{
				value: '双灰板',
				label: '双灰板'
			}, {
				value: '裱白板',
				label: '裱白板'
			}, {
				value: '双面滑',
				label: '双面滑'
			}],
      thick:[{
        value:"1.5",
        label:"1.5mm"
      },{
        value:"2",
        label:"2.0mm"
      },{
        value:"2.5",
        label:"2.5mm"
      },{
        value:"3",
        label:"3.0mm"
      }],
      quantity:[{
        value:"100"
      },{
        value:"500"
      },{
        value:"1000"
      },{
        value:"2000"
      },{
        value:"5000"
      },{
        value:"10000"
      },{
        value:"20000"
      }],
			tabs: [],
    }
  },
	components: {
		myHeader,
		Home
  },
	created:function(){
		this.$router.push('/');
	},
	watch: {
		activeName:function(val, oldVal){
			//console.log(val);
			this.oldActiveName=oldVal;
		}
	},
	methods:{
		removeTab:function(){
			this.$router.go(-1);
			/*this.$nextTick(function () {
				this.activeName=this.oldActiveName;
				console.log(this.oldActiveName);
			});*/
		},
		test:function(i){
			let label=i.$options.propsData.label;
			if(label=='天地盖计算'){
				this.$router.push('/Menus/BoxCount_1');
			}else if(label=='书型盒计算'){
				this.$router.push('/Menus/BookBoxCount_1');
			}else if(label=='天地盖报价'){
				this.$router.push('/Menus/BoxPrice_TopBox_1');
			}else if(label=='书型盒报价'){
				this.$router.push('/Menus/BoxPrice_BookBox_1');
			}else if(label=='纸质内托报价'){
				this.$router.push('/Menus/Model_Price_1');
			}
		},
		Paper:function(index,Path){
			let content;
			if(Path=='c,3-1'){
				this.tabs.push({label:'纸板开别计算',content:'SizeCount'});
				content='SizeCount';
				this.$router.push('/Menus');
			}else if(Path=='c,3-2'){
				this.tabs.push({label:'纸张纸板价格计算',content:'PaperTransform'});
				content='PaperTransform';
				this.$router.push('/Menus');
			}else if(Path=='b,2-1'){
				this.tabs.push({label:'天地盖计算',content:'BoxCount'});
				content='BoxCount';
				this.$router.push('/Menus/BoxCount_1');
			}else if(Path=='a,1-1'){
				this.tabs.push({label:'天地盖报价',content:'BoxPrice'});
				content='BoxPrice';
				this.$router.push('/Menus/BoxPrice_TopBox_1');
			}else if(Path=='b,2-2'){
				this.tabs.push({label:'书型盒计算',content:'BookBoxCount'});
				content='BookBoxCount';
				this.$router.push('/Menus/BookBoxCount_1');
			}else if(Path=='a,1-2'){
				this.tabs.push({label:'书型盒报价',content:'BookBoxPrice'});
				content='BookBoxPrice';
				this.$router.push('/Menus/BoxPrice_BookBox_1');
			}else if(Path=='a,1-3'){
				this.tabs.push({label:'台历架报价',content:'Calendar_Price'});
				content='Calendar_Price';
				this.$router.push('/Menus');
			}else if(Path=='a,1-4'){
				this.tabs.push({label:'纸质内托报价',content:'Model_Price'});
				content='Model_Price';
				this.$router.push('/Menus/Model_Price_1');
			}else if(Path=='c,3-3'){
				this.tabs.push({label:'纸箱计算',content:'Carton'});
				content='Carton';
				this.$router.push('/Menus');
			}else if(Path=='a,1-5'){
				this.tabs.push({label:'手提袋报价',content:'Bag'});
				content='Bag';
				this.$router.push('/Menus');
			}
			this.$nextTick(function () {
				this.activeName=content;
			});
			//this.currentView='PaperTransform'
			//alert (this.currentView);
		}
	}
}
</script>

<style>
body {
	font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
</style>
