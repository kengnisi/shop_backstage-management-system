<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        线上热门搜索
        <el-dropdown>
          <span
            ><svg
              t="1649747636923"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3946"
              width="16"
              height="16"
            >
              <path
                d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608z"
                p-id="3947"
                fill="#8a8a8a"
              ></path>
              <path
                d="M512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608z"
                p-id="3948"
                fill="#8a8a8a"
              ></path>
              <path
                d="M800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z"
                p-id="3949"
                fill="#8a8a8a"
              ></path></svg
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="Charts">
        <el-row :gutter="10">
          <el-col :span="12"><line-charts></line-charts></el-col>
          <el-col :span="12"><line-charts></line-charts></el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="排名" width="80" align="center">
          </el-table-column>
          <el-table-column prop="date" label="搜索关键字" width="180">
          </el-table-column>
          <el-table-column prop="name" label="用户数" sortable width="180">
          </el-table-column>
          <el-table-column prop="address" label="周涨幅" sortable>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "Search",
  components: {
    lineCharts,
  },
  data() {
    return {
      tableData: [{}],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header > span {
  margin-left: 20px;
}
.table {
  margin-top: 10px;
}
.Charts {
}
</style>
