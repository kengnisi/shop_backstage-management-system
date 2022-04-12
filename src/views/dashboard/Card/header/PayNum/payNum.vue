<template>
  <CardItem title="支付笔数">
    <template slot="number">88460</template>
    <template slot="icon">
      <div class="payChart" ref="charts"></div>
    </template>
    <template slot="footer"> 转换率64% </template>
  </CardItem>
</template>

<script>
import * as echarts from "echarts";
import CardItem from "../../CardItem";
export default {
  name: "payNum",
  components: {
    CardItem,
  },
  data() {
    return {};
  },

  mounted() {
    let categoryEcharts = echarts.init(this.$refs.charts);
    categoryEcharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        //均分
        type: "category",
      },
      yAxis: {
        //隐藏y轴
        show: false,
      },
      //系列
      series: [
        {
          //图标形式-柱状图
          type: "bar",
          data: [10, 7, 33, 12, 48, 9,29,10,44,33,22,8],
          color:'cyan'
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip:{}
    });
  },

  methods: {},
};
</script>

<style scoped>
.payChart {
  width: 100%;
  height: 100%;
}
</style>
