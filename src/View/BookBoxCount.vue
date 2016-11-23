<template>
<div>
  <BookBoxMenu v-on:updateID="updateID"></BookBoxMenu>
  <router-view></router-view>
</div>
</template>

<script>
import BookBoxMenu from '../components/BookBoxMenu.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    BookBoxMenu,
  },
  computed:{
    
  },
  methods:{
    updateID:function(aa){
      this.id=aa;//子组件调用修改
      this.$router.push('/BookBoxCount/BookBoxCount_1');
     /* if(aa=='2'){
        this.currentView='BoxCount_2'
      }else if(aa=='1'){
        this.currentView='BoxCount_1'
      }else if(aa=='3'){
        this.currentView="BoxCount_3"
      }*/
    }
  }
}
</script>

<style>
 
</style>