<template>
  <div>
    <el-table style="width: 100%" :data="skuList" border>
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="120">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 1"
            @click="downShop(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-else
            @click="upShop(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 current-change size-change-->
    <el-pagination
      :total="total"
      :current-page="1"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      style="text-align: center"
      @current-change="getSkuList"
      @size-change="handleSize"
    ></el-pagination>
    <!-- 右边抽屉 -->
    <el-drawer
      size="50%"
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="skuAttr in skuInfo.skuAttrValueList"
            :key="skuAttr.id"
            style="margin-right: 10px"
            >{{ skuAttr.attrId }}-{{ skuAttr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="375px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" style="width: 100%"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "sku",

  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      // 展示数据
      skuList: [],
      // 右边抽屉所需数据
      drawer: false,
      direction: "rtl",
      skuInfo: {}, //存储SKU信息
    };
  },

  mounted() {
    this.getSkuList();
  },

  methods: {
    // 获取sku列表信息
    async getSkuList(pages = 1) {
      this.page = pages;
      let { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.skuList = result.data.records;
      }
    },
    //展示数量改变事件回调
    handleSize(limits) {
      this.limit = limits;
      let { page, limit } = this;
      this.getSkuList(page, limit);
    },
    // 下架
    async downShop(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if ((result.code = 200)) {
        row.isSale = 0;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    // 上架
    async upShop(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    //正在kaifa
    edit() {
      this.$message("正在开发中");
    },
    // 右侧展示sku信息
    async getSkuInfo(sku) {
      this.drawer = true;
      //获取SKU数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>
<style>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
<style scoped>
>>>.el-carousel__button{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
}
</style>
