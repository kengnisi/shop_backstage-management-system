<template>
  <CardItem title="访问量">
    <template slot="number">88460</template>
    <template slot="icon">
      <div class="chart" ref="charts"></div>
    </template>
    <template slot="footer">
      日访问量 1234
    </template>
  </CardItem>
</template>

<script>
import CardItem from "../../CardItem";
import * as echarts from "echarts";

export default {
  name: "PV",
  components: {
    CardItem,
  },
  data() {
    return {};
  },

  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    // 绘制图表
    lineCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        //隐藏y轴
        show: false,
      },
      //系列
      series: [
        {
          smooth: true,
          type: "line",
          data: [10, 7, 33, 12, 48, 9,29,10,44],
          //拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: "purple",
          },
          //填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },

  methods: {},
};
</script>

<style scoped>
.chart{
  width: 100%;
  height: 100%;
}
</style>
