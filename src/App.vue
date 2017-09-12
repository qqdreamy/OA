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
			<el-tabs type="card" :closable="true">
			</el-tabs>
			<router-view></router-view>
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
		Paper:function(index,Path){
			if(Path=='c,3-1'){
				this.$router.push('/SizeCount');
			}else if(Path=='c,3-2'){
				//this.tabs.push({label:'纸张纸板价格计算',content:'test'});
				// 命名的路由
				//router.push({ name: 'user', params: { userId: 123 }})
				this.$router.push('/PaperTransform');
			}else if(Path=='b,2-1'){
				this.$router.push('/BoxCount/BoxCount_1');
			}else if(Path=='a,1-1'){
				this.$router.push('/BoxPrice/BoxPrice_TopBox_1');
			}else if(Path=='b,2-2'){
				this.$router.push('/BookBoxCount');
			}else if(Path=='a,1-2'){
				this.$router.push('/BookBoxPrice');
			}else if(Path=='a,1-3'){
				this.$router.push('/Calendar_Price');
			}else if(Path=='a,1-4'){
				this.$router.push('/Model_Price/Model_Price_1');
			}else if(Path=='c,3-3'){
				this.$router.push('/Carton');
			}else if(Path=='a,1-5'){
				this.$router.push('/Bag');
			}
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
