<template>
<div>
  <TopBoxMenu v-on:updateID="updateID"></TopBoxMenu>
  <router-view></router-view>
</div>
</template>
<script>
import TopBoxMenu from '../components/TopBoxMenu.vue'
export default {
  data () {
    return {
      //currentView: 'BoxPrice_TopBox_1',
    }
  },
  components: {
    TopBoxMenu
  },
  methods:{
    updateID:function(aa){
      this.id=aa;//子组件调用修改
      if(aa=='1'){
        this.$router.push('/BoxPrice/BoxPrice_TopBox_1');
        //this.currentView='BoxPrice_TopBox_1'
      }else if(aa=='2'){
        this.$router.push('/BoxPrice/BoxPrice_TopBox_2');
        //this.currentView='BoxPrice_TopBox_2'
      }else if(aa=='3'){
        this.$router.push('/BoxPrice/BoxPrice_TopBox_3');
        //this.currentView='BoxPrice_TopBox_3'
      }
    }
  }
}
</script>