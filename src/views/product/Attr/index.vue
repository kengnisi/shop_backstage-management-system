<template>
  <!-- 平台属性管理 -->
  <div>
    <el-card style="margin: 20px 0px">
      <Category-select @getCategoryId="getCategoryId" :show="!isShowTable"></Category-select>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-Tag
                type="success"
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 0px 15px"
                >{{ item.valueName }}</el-Tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updataAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性和修改属性界面 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button style="margin-bottom: 20px" @click="isShowTable = true"
          >取消</el-button
        >
        <el-table style="width: 100%" border :data="attrInfo.attrValueList">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                :ref="$index"
                placeholder="请输入属性值名称"
                size="mini"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                @keyup.native.enter="toLook(row, $index)"
              ></el-input>
              <span
                v-else
                style="display: block"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`你确定要删除${row.valueName}?`"
                @onConfirm="deleteAttrValue($index)">
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="refeence"r
              ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 20px" @click="addOrUpdateAttr()" ref="save" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "attr",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性
      attrList: [],
      // 添加修改属性界面和平台属性界面切换
      isShowTable: true,
      // 收集新增或修改属性的数据
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },

  mounted() {},

  methods: {
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    // 获取平台属性数据
    // 当用户获取确定三级分类数据的收，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值  按钮
    addAttrValue() {
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        // attrId是你相应属性的id，目前还没有添加到后台中，所以还没有分配属性对应的Id，设为空
        attrId: this.attrInfo.id,
        valueName: "",
        // flag属性：给每一个属性值天啊及一个标记。用户切换查看模式与编辑模式，能过做到每个属性值独立控制模式
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性  按钮回调
    addAttr() {
      this.isShowTable = false;
      // 当点击添加属性按钮时，将之前的数据清空
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      };
      this.attrInfo.categoryId = this.category3Id;
    },
    // 点击修改属性回调
    updataAttr(row) {
      this.isShowTable = false;
      // 由于数据结构中存在对象里面有数组，数组中有对象，因此需要使用深拷贝
      this.attrInfo = cloneDeep(row);
      // 点击修改时，数据中没有flag属性
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样添加不是响应式数据， Vue无法探测普通新增数据，数据会改变但是视图不会发送变化
        // item.flag = false
        // 给属性添加一个响应式数据
        // 第一个参数：对象， 第二个参数：添加新的响应式属性，第三个参数：值
        this.$set(item, "flag", false);
      });
    },
    // 观察和修改模式转换
    toLook(row, index) {
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      // 新增的属性值不能与已有属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 不和自己本身相比
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) {
        this.$message("请你不要输入重复的属性值");
        this.$refs[index].focus();
        this.$refs.save.disabled = true
        return;
      }
      this.$refs.save.disabled = false
      row.flag = false;
    },
    // 插看模式转换成编辑模式，自动聚焦
    toEdit(row, index) {
      row.flag = true;
      // 点击span到时候变为编辑模式，页面的重绘时要耗时间的，不可能立马获取到input
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存数据
    async addOrUpdateAttr() {
      // 整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if(item.valueName!='') {
          // 删除flag属性
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:'success', message:'保存成功'})
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
