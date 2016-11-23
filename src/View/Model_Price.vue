<template>
<div>
  <Model_Menu v-on:updateID="updateID"></Model_Menu>
  <router-view ></router-view>
</div>
</template>
<script>
import Model_Menu from '../components/Model_Menu.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    Model_Menu,
  },
  methods:{
    updateID:function(aa){
      this.id=aa;//子组件调用修改
      if(aa=='1'){
        this.$router.push('/Model_Price/Model_Price_1');
      }
    }
  }
}
</script>