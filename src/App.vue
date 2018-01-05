<template>
<div id="app">
	<el-container>
  <el-header>
		<Header v-on:PriceSet="addTab('价格设置','/PriceSet')"></Header>
	</el-header>
  <el-container>
    <el-aside width="200px">
			<el-menu :default-openeds="['a','b','c']"  @select="Paper" active-text-color="#ffd04b">
				<el-submenu index="a">
					<template slot="title">报价</template>
					<el-menu-item :key="item.index" :index="item.index" v-for="item in priceMenu">{{item.label}}
          </el-menu-item>
				</el-submenu>
				<el-submenu index="b">
					<template slot="title">开料</template>
					<el-menu-item index="2-1">天地盖</el-menu-item>
					<el-menu-item index="2-2">书型盒</el-menu-item>
				</el-submenu>
				<el-submenu index="c" >
					<template slot="title">工具</template>
					<el-menu-item index="3-1">纸板开别计算</el-menu-item>
					<el-menu-item index="/PaperTransform">纸张/纸板价格计算</el-menu-item>
					<el-menu-item index="3-3" >纸箱计算</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
    <el-main>
			<el-tabs v-model="editableTabsValue2" type="card" @tab-click="tabClick"  @tab-remove="removeTab">
			<el-tab-pane
				v-for="(item) in editableTabs2"
				:key="item.title"
				:label="item.title"
				:name="item.router" :closable="item.closable">
			</el-tab-pane>
		</el-tabs>
		<router-view></router-view>
		</el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import Header from './components/Header'

export default {
  data () {
    return {
      priceMenu: [
        {index: '1', label: '天地盖'},
        {index: '2', label: '书型盒'},
        {index: '/Bag', label: '手提袋'},
        {index: '4', label: '彩盒'}
      ],
      editableTabs2: [
        {
          title: '首页',
          router: '/',
          closable: false
        }
      ],
      atRouter: null, // 当前路由
      tabIndex: 1,
      editableTabsValue2: '/',
      tabs: []
    }
  },
  components: {
    Header
  },
  watch: {
  },
  created: function () {
    this.$router.push('/')
  },
  methods: {
    tabClick (targetName) {
      console.log(targetName)
      this.$router.push(targetName.name)
    },
    addTab (title, router) {
      if (
        this.editableTabs2.find(function (x) {
          return x.title === title
        }) === undefined
      ) {
        this.editableTabs2.push({
          title: title,
          router: router,
          closable: true
        })
        this.editableTabsValue2 = router
        this.$router.push(router)
      }
    },
    removeTab (targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.router === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.router
            }
          }
        })
      }
      // 对象化重用代码
      this.tabClick({name: activeName})
      this.editableTabsValue2 = activeName
      this.editableTabs2 = tabs.filter(tab => tab.router !== targetName)
    },
    Paper: function (index, Path) {
      switch (index) {
        case '/PaperTransform':
          this.addTab('吨令转换', index)
          break
        case '/Bag':
          this.addTab('手提袋', index)
          break
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-main {
  padding: 10px;
}
.el-header {
  background-color: rgb(64, 158, 255);
}
article {
  padding: 10px;
}
</style>
