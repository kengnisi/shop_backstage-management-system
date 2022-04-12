<template>
<!--  品牌管理 -->
  <div>
    <!--按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!--
      表格组件
      data:表格组件将来需要展示的数据
      border: 是给表格添加边框

      column属性
      label:显示标题
      width：对于列的宽度
      align:标题的对齐方式
     -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $idnex }">
          <!-- 代码被改，图片用不了 -->
          <img :src="row.logoUrl" alt="" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-edit"
            @click="updataTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--
      分页器
      当前第几页，数据总条数，每一页展示条数，连续页码数
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="this.currentPage"
      :total="this.total"
      :page-size="this.pageSize"
      @current-change="getdata"
      @size-change="sizeChange"
      :page-count="7"
      :page-sizes="[3, 5, 9]"
      layout="prev, pager, next, jumper, ->, sizes, total"
    ></el-pagination>

    <!-- 添加修改品牌对话框 -->
    <el-dialog
      :title="this.tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :rules="rules" ref="tmForm" :model="tmForm">
        <el-form-item
          label="品牌名称"
          label-width="100px"
          :model="tmForm"
          prop="tmName"
        >
          <el-input
            autocomplete="off"
            style="width: 80%"
            v-model="tmForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "trademark",

  data() {
    var validateLogoUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Logo图片不能为空"));
      } else {
        callback();
      }
    };
    return {
      currentPage: 1,
      pageSize: 3,
      list: [],
      total: 0,
      // 是否展示对话款属性
      dialogFormVisible: false,
      // 上传图片使用属性
      imageUrl: "",
      // 上传品牌信息
      tmForm: {
        logoUrl: "",
        tmName: "",
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入活动名称", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          // 使用自定义校验规则***重点
          { validator: validateLogoUrl },
        ],
      },
    };
  },

  mounted() {
    this.getdata();
  },

  methods: {
    // 获取表单数据
    async getdata(page = 1) {
      if (page >= 1) {
        this.currentPage = page;
      } else {
        this.currentPage = 1;
      }

      const { currentPage, pageSize } = this;
      let result = await this.$API.tradeMark.reqTradeMark(
        currentPage,
        pageSize
      );
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        alert("请求失败");
      }
    },
    // 分页器每一页展示条数改变
    sizeChange(pagesize) {
      this.pageSize = pagesize;
      const { currentPage, pageSize } = this;
      this.getdata(currentPage, pageSize);
    },
    // 添加触发展示dirlog对话框
    showDialog() {
      this.dialogFormVisible = true;
      // 再次点击添加时，清楚数据
      this.tmForm = {
        logoUrl: "",
        tmName: "",
      };
    },
    // 修改触发展示dirlog对话框
    updataTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    // 上传图片
    // 上传成功
    handleAvatarSuccess(res, file) {
      // res:上传成功之后返回前端的数据
      // file:上传成功之后服务器返回给前端的数据
      this.tmForm.logoUrl = res.data;
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确认添加品牌信息(添加或修改信息)
    addOrUpdateTradeMark() {
      // 表单验证是否符合规则
      this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          let result = await this.$API.tradeMark.reqaddOrUpdateTrademack(
            this.tmForm
          );
          if (result.code == 200) {
            this.dialogFormVisible = false;
            // 弹出信息：添加品牌或修改品牌
            this.$message({
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            // 添加或者修改品牌成功之后还要再次获取品牌展示
            this.getdata(this.tmForm.id ? this.currentPage : 1);
          } else {
            this.$message.error(
              this.tmForm.id ? "修改品牌失败" : "添加品牌失败"
            );
          }
        } else {
          this.$message.error("添加内容不能为空");
        }
      });
    },
    deleteTradeMark(row) {
      this.$confirm(`是否要删除${row.tmName}品牌?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          this.getdata(
            this.list.length > 1 ? this.currentPage : this.currentPage - 1
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
