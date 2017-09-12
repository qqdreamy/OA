<template>
<div>
  <BookBoxMenu v-on:updateID="updateID"></BookBoxMenu>
  <router-view ></router-view>
</div>
</template>
<script>
import BookBoxMenu from '../components/BookBoxMenu.vue'
var mythick={
  '2':1150,
  '1.5':850,
  '2.5':1450,
  '3':1750
}
export default {
  data () {
    return {
    }
  },
  components: {
    BookBoxMenu,
  },
  methods:{
    updateID:function(aa){
      this.id=aa;//子组件调用修改
      if(aa=='1'){
        this.$router.push('/BoxPrice/BoxPrice_BookBox_1');
        //this.currentView='BoxPrice_BookBox_1'
      }
    }
  }
}
</script>