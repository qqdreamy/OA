import Vue from 'vue' 
import VueRouter from 'vue-router'
import SizeCount from './View/SizeCount.vue'
import PaperTransform from './View/PaperTransform.vue'
import BoxCount from './View/BoxCount.vue'
import BoxPrice from './View/BoxPrice_TopBox.vue'
import BookBoxCount from './View/BookBoxCount.vue'
import BookBoxPrice from './View/BookBoxPrice.vue'
import Calendar_Price from './View/Calendar_Price.vue'
import BoxPrice_TopBox_1 from './components/BoxPrice_TopBox_1.vue'
import BoxPrice_TopBox_2 from './components/BoxPrice_TopBox_2.vue'
import BoxPrice_TopBox_3 from './components/BoxPrice_TopBox_3.vue'
import BoxCount_1 from './components/BoxCount_1.vue'
import BoxCount_2 from './components/BoxCount_2.vue'
import BoxCount_3 from './components/BoxCount_3.vue'
import BoxPrice_BookBox_1 from './components/BoxPrice_BookBox_1.vue'
import BookBoxCount_1 from './components/BookBoxCount_1.vue'
import Model_Price from './View/Model_Price.vue'
import Model_Price_1 from './components/Model_Price_1.vue'
import Carton from './View/Carton.vue'
import Home from './View/home.vue'
import Bag from './View/Bag.vue'
import PriceSet from './view/PriceSet.vue'
import Corrugate from './view/corrugate.vue'
import HandleBox from './components/Corrugate/Corrugate_HandleBox.vue'
import DoubleInsertBox from './components/Corrugate/Corrugate_DoubleInsertBox.vue'
import AircraftBox from './components/Corrugate/Corrugate_AircraftBox.vue'
import DrawerBox from './components/Corrugate/Corrugate_DrawerBox.vue'

Vue.use(VueRouter)

// 1. 定义
// 可以从其他文件 import 进来
//const home = { template: '<div>欢迎</div>' }
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
const routes = [
  { path: '/', component: Home },
  { path: '/SizeCount', component: SizeCount },
  { path: '/PaperTransform',component:PaperTransform},
  { path: '/Carton',component:Carton },
  { path: '/BoxCount',component:BoxCount,
  children:[
    {path:'BoxCount_1',component:BoxCount_1},
    {path:'BoxCount_2',component:BoxCount_2},
    {path:'BoxCount_3',component:BoxCount_3},
    {path: '', component: BoxCount_1}
    ]
  },
  { path: '/BoxPrice',component:BoxPrice ,
  children:[
    {path:'BoxPrice_TopBox_1',component:BoxPrice_TopBox_1},
    {path:'BoxPrice_TopBox_2',component:BoxPrice_TopBox_2},
    {path:'BoxPrice_TopBox_3',component:BoxPrice_TopBox_3},
    {path: '', component: BoxPrice_TopBox_1 },
  ]},
  { path: '/BookBoxCount',component:BookBoxCount ,
  children:[
    {path:'BookBoxCount_1',component:BookBoxCount_1},
    {path: '', component: BookBoxCount_1 },
  ]
  },
  { path: '/BookBoxPrice',component:BookBoxPrice ,
  children:[
    {path:'BoxPrice_BookBox_1',component:BoxPrice_BookBox_1},
    {path: '', component: BoxPrice_BookBox_1 },
  ]
  },
  { path: '/Calendar_Price',component:Calendar_Price },
  { path: '/Bag',component:Bag },
  {path:'/Corrugate',component:Corrugate,
  children:[
    {path:'HandleBox',component:HandleBox},
    {path:'DoubleInsertBox',component:DoubleInsertBox},
    {path:'AircraftBox',component:AircraftBox},
    {path:'DrawerBox',component:DrawerBox}
    ]
  },
  { path: '/PriceSet',component:PriceSet },
  { path: '/Model_Price',component:Model_Price,
    children:[
      { path:'Model_Price_1',component:Model_Price_1}
    ]
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数，不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

export default router