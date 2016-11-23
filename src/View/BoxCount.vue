<template>
<div>
  <TopBoxMenu v-on:updateID="updateID"></TopBoxMenu>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>

<script>
import TopBoxMenu from '../components/TopBoxMenu.vue'

export default {
  data () {
    return {
      
    }
  },
  components: {
    TopBoxMenu,
  },
  computed:{
    
  },
  methods:{
    updateID:function(aa){
      this.id=aa;//子组件调用修改
      if(aa=='2'){
        //this.currentView='BoxCount_2'
        this.$router.push('/BoxCount/BoxCount_2');
      }else if(aa=='1'){
        this.$router.push('/BoxCount/BoxCount_1');
        //this.currentView='BoxCount_1'
      }else if(aa=='3'){
        this.$router.push('/BoxCount/BoxCount_3');
        //this.currentView="BoxCount_3"
      }
    }
  }
}
</script>

<style>

</style>