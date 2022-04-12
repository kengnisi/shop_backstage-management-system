<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        销售额类别占比
        <el-radio-group v-model="location" size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <div class="charts" ref="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",

  data() {
    return {
      location: "渠道 ",
    };
  },

  mounted() {
    //饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: "视频",
        subtext: 1048,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "游戏" },
            { value: 580, name: "音乐" },
            { value: 484, name: "购物" },
            { value: 300, name: "学习" },
          ],
        },
      ],
    });
    //绑定事件

    mychart.on("mouseover",(params)=>{
        //获取鼠标移上去那条数据
        const {name,value} = params.data;
        //重新设置标题
        mychart.setOption({
          title:{
            text:name,
            subtext:'value'
          }
        })
    });
  },

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
.charts {
  width: 100%;
  height: 300px;
}
</style>
