<template>
<div>
  <Corrugate_Menu v-on:updateID="updateID"></Corrugate_Menu>
  <router-view ></router-view>
</div>
</template>
<script>
import Corrugate_Menu from '../components/Corrugate_Menu.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    Corrugate_Menu,
  },
  methods:{
    updateID:function(aa){
      this.id=aa;//子组件调用修改
      if(aa=='1'){
        this.$router.push('/Corrugate/HandleBox');
      }else if(aa=='2'){
        this.$router.push('/Corrugate/DoubleInsertBox');
      }
    }
  }
}
</script>