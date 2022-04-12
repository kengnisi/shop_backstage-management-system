<template>
  <div>
    <el-card style="marginbottom: 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!catogoryShow" />
    </el-card>
    <el-card>
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="marginbottom: 20px"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%, marginBottom:20px" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                title="添加sku"
                size="mini"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updataSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handle(row)"
              ></hint-button>
              <el-popconfirm
                :title="`您确定删除${row.spuName}？`"
                @onConfirm="deleteSpu(row.id)"
              >
                <hint-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 6, 9]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total "
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <spu-form
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></spu-form>
      <sku-form
        v-show="scene == 2"
        ref="skuForm"
        @changeScene="changeScene"
      ></sku-form>
    </el-card>
    <!-- 查看sku弹出框 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import spuForm from "./spuForm";
import skuForm from "./skuForm";
export default {
  name: "spu",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      show: true,
      // 分页器当前页数
      page: 1,
      limit: 3,
      // spu列表数据
      records: [],
      total: 0,
      scene: 0, //0表示展示spu列表数据 1添加spu或修改spu 2添加sku
      dialogTableVisible: false, //控制查看sku弹出框
      spu: {},
      skuList: [], //存储的是SKU列表的数据
      loading: true,
    };
  },
  components: {
    spuForm,
    skuForm,
  },
  mounted() {},
  computed: {
    catogoryShow() {
      return this.scene == 0;
    },
  },
  methods: {
    // 三级联动的自定义事件，传递ID
    getCategoryId({ categoryId, level }) {
      // catogoryId:获取一二三级分类的id，level为了分别几级id
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    // 获取spu列表信息
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 修改每页展示的数据条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加SPU按钮回调
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改spu按钮回调
    updataSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 添加或修改页面返回的自定义事件
    changeScene({ scene, type }) {
      this.scene = scene;
      if (type == "修改" || type == "取消") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 点击删除spu按钮确定回调
    async deleteSpu(id) {
      let result = await this.$API.spu.reqDeleteSpu(id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加sku按钮回调
    addSku(spu) {
      this.scene = 2;
      this.$refs.skuForm.getData(this.category1Id, this.category2Id, spu);
    },
    // 查看sku列表按钮回调
    async handle(spu) {
      this.dialogTableVisible = true;
      //保存spu信息
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        //loading隐藏
        this.loading = false;
      }
    },
     //关闭对话框的回调
    close(done){
      //loading属性再次变为真
      this.loading = true;
      //清除sku列表的数据
      this.skuList = [];
      //管理对话框
      done();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
