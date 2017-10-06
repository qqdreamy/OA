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
					<el-menu-item index="1-6">彩盒</el-menu-item>
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
		<el-tabs v-model="editableTabsValue2" type="card" @tab-click="tabClick"  @tab-remove="removeTab">
			<el-tab-pane
				v-for="(item, index) in editableTabs2"
				:key="item.name"
				:label="item.title"
				:name="item.name" :closable="item.closable">
			</el-tab-pane>
		</el-tabs>
		<router-view></router-view>
		</el-col>
	</el-row>
  </div>
</template>

<script>
import myHeader from './components/myHeader.vue'
import Home from './View/home.vue'
export default {
  data () {
    return {
			editableTabs2:[{
				title: '首页',
				name: '首页',
				closable:false
			}],
			tabIndex:1,
			editableTabsValue2: '1',
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
	methods:{
		tabClick(targetName){
			if(targetName.label=='天地盖盒报价'){
				this.$router.push('/BoxPrice/BoxPrice_TopBox_1');
			}else if(targetName.label=='书型盒报价'){
				this.$router.push('/BookBoxPrice');
			}else if(targetName.label=='首页'){
				this.$router.push('/');
			}else if(targetName.label=='台历架报价'){
				this.$router.push('/Calendar_Price');
			}else if(targetName.label=='手提袋报价'){
				this.$router.push('/Bag');
			}else if(targetName.label=='内托报价'){
				this.$router.push('/Model_Price/Model_Price_1');
			}else if(targetName.label=='纸张开别计算'){
				this.$router.push('/SizeCount');
			}else if(targetName.label=='书型盒开料'){
				this.$router.push('/BookBoxCount');
			}else if(targetName.label=='天地盖开料'){
				this.$router.push('/BoxCount/BoxCount_1');
			}else if(targetName.label=='纸张/纸板价格计算'){
				this.$router.push('/PaperTransform');
			}else if(targetName.label=='纸箱计算'){
				this.$router.push('/Carton');
			}
		},
		addTab(targetName) {
			let newTabName = ++this.tabIndex + '';
			if(this.editableTabs2.find(function(x){
					return x.title==targetName;
			})==undefined){
				this.editableTabs2.push({
				title: targetName,
				name: targetName,
				closable:true
				});
				this.editableTabsValue2 = targetName;
			}
    },
		removeTab(targetName) {
			let tabs = this.editableTabs2;
			let activeName = this.editableTabsValue2;
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							console.log(nextTab);
							activeName = nextTab.name;
						}
					}
				});
			}
			this.tabClick({label:activeName});//对象化重用代码
			this.editableTabsValue2 = activeName;
			this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    },
		Paper:function(index,Path){
			if(Path=='c,3-1'){
				this.addTab('纸张开别计算');
				this.$router.push('/SizeCount');
			}else if(Path=='c,3-2'){
				this.addTab('纸张/纸板价格计算');
				this.$router.push('/PaperTransform');
			}else if(Path=='b,2-1'){
				this.addTab('天地盖开料');
				this.$router.push('/BoxCount/BoxCount_1');
			}else if(Path=='a,1-1'){
				this.addTab('天地盖盒报价');
				this.$router.push('/BoxPrice/BoxPrice_TopBox_1');
			}else if(Path=='b,2-2'){
				this.addTab('书型盒开料');
				this.$router.push('/BookBoxCount');
			}else if(Path=='a,1-2'){
				this.addTab('书型盒报价');
				this.$router.push('/BookBoxPrice');
			}else if(Path=='a,1-3'){
				this.addTab('台历架报价');
				this.$router.push('/Calendar_Price');
			}else if(Path=='a,1-4'){
				this.addTab('内托报价');
				this.$router.push('/Model_Price/Model_Price_1');
			}else if(Path=='c,3-3'){
				this.addTab('纸箱计算');
				this.$router.push('/Carton');
			}else if(Path=='a,1-5'){
				this.addTab('手提袋报价');
				this.$router.push('/Bag');
			}else if(Path=='a,1-6'){
				this.addTab('彩盒');
				this.$router.push('/Corrugate/HandleBox');
			}
		}
	}
}
</script>

<style>
body {
	font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
</style>
