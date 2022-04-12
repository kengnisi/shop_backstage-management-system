<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"><Sale/></el-col>
      <el-col :span="6"><PV/></el-col>
      <el-col :span="6"><payNum/></el-col>
      <el-col :span="6"><operation/></el-col>
    </el-row>
  </div>
</template>

<script>
import Sale from "./Sale/sale.vue"
import PV from "./PV/PV.vue"
import payNum from "./PayNum/payNum.vue"
import operation from "./Operation/operation.vue"
export default {
  name: 'hea',
  components: {
    Sale,
    PV,
    payNum,
    operation
  },
  data() {
    return {

    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>

</style>
