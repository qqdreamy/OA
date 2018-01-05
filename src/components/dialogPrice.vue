<template>
  <el-dialog title="报价" @close="closePrice" :visible="dialogPriceVisible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="true">
    <el-switch v-model="isShowPrice" on-text="" off-text="">
    </el-switch>
      <slot v-if="isShowPrice" name="list"></slot>
      <slot name="count"></slot>
      <el-button type="primary" @click="closePrice">关闭</el-button>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      isShowPrice: false
      // dialogPriceVisible:false,
    }
  },
  components: {

  },
  props: ['dialogPriceVisible'],
  methods: {
    // 清空价格数据
    closePrice: function () {
       // this.$emit('update:dialogPriceVisible', false);
      this.$emit('closePrice')
       // this.dialogPriceVisible=false;
       // console.log('closePrice');
    }
  }
}
</script>