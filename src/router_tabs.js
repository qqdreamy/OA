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

Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
//const home = { template: '<div>欢迎</div>' }
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
const routes = [
  { path: '/', component: Home },
  //{ path: '/SizeCount', components:{SizeCount:SizeCount} },
  { path: '/Menus',
    components:
    {
      PaperTransform:PaperTransform,
      SizeCount:SizeCount,
      Carton:Carton,
      Bag:Bag,
      BoxCount:BoxCount,
      BookBoxCount:BookBoxCount,
      BoxPrice:BoxPrice,
      Calendar_Price:Calendar_Price,
      Model_Price:Model_Price,
      BookBoxPrice:BookBoxPrice,
    },
    children:[
      {path:'BoxCount_1',
      components:{BoxCount:BoxCount_1}
      },
      {path:'BoxCount_2',components:{BoxCount:BoxCount_2}},
      {path:'BoxCount_3',components:{BoxCount:BoxCount_3}},
      {path:'BookBoxCount_1',components:{BookBoxCount_1:BookBoxCount_1}},
      {path:'BoxPrice_TopBox_1',components:{BoxPrice:BoxCount_1}},
      {path:'BoxPrice_TopBox_2',components:{BoxPrice:BoxCount_2}},
      {path:'BoxPrice_TopBox_3',components:{BoxPrice:BoxCount_3}},
      { path:'Model_Price_1',components:{Model_Price:Model_Price_1}},
      {path:'BoxPrice_BookBox_1',components:{BookBoxPrice:BoxPrice_BookBox_1}}
    ]
  },
  //{ path: '/Carton',component:Carton },
  /*{ path: '/BoxCount',component:BoxCount,
  children:[
    {path:'BoxCount_1',component:BoxCount_1},
    {path:'BoxCount_2',component:BoxCount_2},
    {path:'BoxCount_3',component:BoxCount_3},
    {path: '', component: BoxCount_1}
    ]
  },*/
  /*{ path: '/BoxPrice',component:BoxPrice ,
  children:[
    {path:'BoxPrice_TopBox_1',component:BoxPrice_TopBox_1},
    {path:'BoxPrice_TopBox_2',component:BoxPrice_TopBox_2},
    {path:'BoxPrice_TopBox_3',component:BoxPrice_TopBox_3},
    {path: '', component: BoxPrice_TopBox_1 },
  ]},*/
 /* { path: '/BookBoxCount',component:BookBoxCount ,
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
  //{ path: '/Calendar_Price',component:Calendar_Price },
  //{ path: '/Bag',component:Bag },
  { path: '/Model_Price',component:Model_Price,
    children:[
      { path:'Model_Price_1',component:Model_Price_1}
    ]
  }*/
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数，不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

export default router