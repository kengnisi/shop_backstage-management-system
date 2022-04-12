<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"

        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in Category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :model="cForm">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in Category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" :model="cForm">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in Category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ['show'],
  data() {
    return {
      // 一级分类的数据
      Category1List: [],
      // 二级分类的数据
      Category2List: [],
      // 三级分类的数据
      Category3List: [],

      // 收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },

  mounted() {
    this.getCategory1List();
  },

  methods: {
    // 获取一级分类的数据
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.Category1List = result.data;
      }
    },
    // 一级分类回调函数，获取二级分类的数据
    async handler1() {
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.Category3List = [];
      let { category1Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let result = await this.$API.attr.reqCategory2List(category1Id);
      if (result.code == 200) {
        this.Category2List = result.data;
      }
    },
    // 二级分类回调函数，获取三级分类数据
    async handler2() {
      this.cForm.category3Id = "";
      let { category2Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
        this.Category3List = result.data;
      }
    },
    handler3() {
      let { category3Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
