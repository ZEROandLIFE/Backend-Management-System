<template>
  <div class="outer">
    <!-- 头部 -->
    <div class="header">
      <div class="hleft"></div>
      <div class="hmiddle">
        <span>番茄管理系统智慧大屏</span>
      </div>
      <div class="hright">
        <span>日期：{{ time }}</span>
      </div>
    </div>
    <!-- 主要部分 -->
    <div class="main">
      <div class="left">
        <div class="lbox1">
          <Box :headname="box1">
            <div class="total">
              <span v-for="item in people">{{ item }}</span>
            </div>
            <div class="chart1" ref="chart1"></div>
          </Box>
        </div>
        <div class="lbox2">
          <Box :headname="box2">
            <div class="chart2" ref="chart2"></div>
          </Box>
        </div>
        <div class="lbox3">
          <Box :headname="box3">
            <div class="chart3" ref="chart3"></div>
          </Box>
        </div>
      </div>
      <div class="middle">
        <div class="map" ref="map"></div>

        <div class="bottom">
          <Box :headname="box7">
            <div class="chart7" ref="chart7"></div>
          </Box>
        </div>
      </div>
      <div class="right">
        <div class="rbox1">
          <Box :headname="box4">
            <div class="chart4" ref="chart4"></div>
          </Box>
        </div>
        <div class="rbox2">
          <Box :headname="box5">
            <div class="chart5" ref="chart5"></div>
          </Box>
        </div>
        <div class="rbox3">
          <Box :headname="box6">
            <div class="chart6" ref="chart6"></div>
          </Box>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick } from "vue";
  import Box from "./box.vue";
  import moment from "moment";
  import * as echarts from "echarts";
  import chinaJson from "./china.json";
  import "echarts-liquidfill";
  let time = ref(moment().format("YYYY年MM月DD日 HH：mm：ss"));
  let timekeeper = ref();

  // 6个盒子的标题
  let box1 = "实时用户统计";
  let people = ref("114514人");
  let box2 = "销售额趋势";
  let box3 = "用户分布";
  let box4 = "渠道转化率";
  let box5 = "业务指标";
  let box6 = "目标完成率";
  let box7 = "各省活跃人数";
  // 6个图表引用
  let chart1 = ref();
  let chart2 = ref();
  let chart3 = ref();
  let chart4 = ref();
  let chart5 = ref();
  let chart6 = ref();
  let chart7 = ref();
  let map = ref();
  // 初始化所有图表
  const initCharts = () => {
    initChart1(); // 用户增长折线图
    initChart2(); // 销售额柱状图
    initChart3(); // 用户分布饼图
    initChart4(); // 渠道转化率条形图
    initChart5(); // 业务指标雷达图
    initChart6(); // 完成率仪表盘
    initChart7();
    initMap(); //初始化地图
  };

  const initChart1 = () => {
    let mychart1 = echarts.init(chart1.value);
    mychart1.setOption({
      title: {
        text: "用户增长趋势",
        textStyle: { color: "#fff" },
      },
      backgroundColor: "transparent",
      textStyle: { color: "#fff" },
      tooltip: {
        trigger: "axis",
        formatter: "{b}<br/>{a}: {c}",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: { color: "#fff" },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
      },
      series: [
        {
          name: "用户数量",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          itemStyle: { color: "#FF6B9D" },
          lineStyle: { color: "#FF6B9D", width: 3 },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(255, 107, 157, 0.6)" },
                { offset: 1, color: "rgba(255, 107, 157, 0.1)" },
              ],
            },
          },
        },
      ],
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    });
  };

  const initChart2 = () => {
    let mychart2 = echarts.init(chart2.value);
    mychart2.setOption({
      title: { text: "品牌销量对比", textStyle: { color: "#fff" } },
      backgroundColor: "transparent",
      textStyle: { color: "#fff" },
      tooltip: {
        trigger: "axis",
        formatter: "{b}<br/>{a}: {c}台",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: { color: "#fff" },
      },
      legend: {
        data: ["Apple", "Sony", "Samsung"],
        textStyle: { color: "#fff" },
        top: "bottom",
      },
      xAxis: {
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月", "6月"],
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
      },
      yAxis: {
        type: "value",
        name: "销量(台)",
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
      },
      series: [
        {
          name: "Apple",
          data: [320, 432, 301, 434, 590, 630],
          type: "line",
          smooth: true,
          itemStyle: { color: "#FF6B6B" },
          lineStyle: { color: "#FF6B6B", width: 3 },
          symbol: "circle",
          symbolSize: 8,
        },
        {
          name: "Sony",
          data: [220, 282, 291, 334, 390, 430],
          type: "line",
          smooth: true,
          itemStyle: { color: "#4ECDC4" },
          lineStyle: { color: "#4ECDC4", width: 3 },
          symbol: "circle",
          symbolSize: 8,
        },
        {
          name: "Samsung",
          data: [150, 232, 201, 254, 290, 330],
          type: "line",
          smooth: true,
          itemStyle: { color: "#45B7D1" },
          lineStyle: { color: "#45B7D1", width: 3 },
          symbol: "circle",
          symbolSize: 8,
        },
      ],
      grid: { left: "3%", right: "4%", bottom: "15%", containLabel: true },
    });
  };

  const initChart3 = () => {
    let mychart3 = echarts.init(chart3.value);
    mychart3.setOption({
      title: { text: "用户分类", textStyle: { color: "#fff" } },
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: { color: "#fff" },
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        textStyle: { color: "#fff" },
      },
      series: [
        {
          name: "用户分布",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["40%", "50%"],
          data: [
            { value: 1048, name: "新用户", itemStyle: { color: "#FF6B6B" } },
            { value: 735, name: "活跃用户", itemStyle: { color: "#4ECDC4" } },
            { value: 580, name: "沉默用户", itemStyle: { color: "#45B7D1" } },
            { value: 320, name: "VIP用户", itemStyle: { color: "#96CEB4" } },
          ],
          label: { color: "#fff" },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  };

  const initChart4 = () => {
    let mychart4 = echarts.init(chart4.value);
    mychart4.setOption({
      title: { text: "渠道效果", textStyle: { color: "#fff" } },
      backgroundColor: "transparent",
      textStyle: { color: "#fff" },
      tooltip: {
        trigger: "axis",
        formatter: "{b}: {c}%",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: { color: "#fff" },
      },
      xAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: {
          color: "#fff",
          formatter: "{value}%",
        },
      },
      yAxis: {
        type: "category",
        data: ["搜索引擎", "社交媒体", "直接访问", "邮件营销", "推荐算法"],
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
      },
      series: [
        {
          name: "转化率",
          data: [65, 78, 45, 32, 88],
          type: "bar",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: "#FF6B6B" },
                { offset: 1, color: "#FFA36B" },
              ],
            },
          },
          label: {
            show: true,
            position: "right",
            formatter: "{c}%",
            color: "#fff",
          },
        },
      ],
      grid: { left: "3%", right: "8%", bottom: "3%", containLabel: true },
    });
  };

  const initChart5 = () => {
    let mychart5 = echarts.init(chart5.value);

    let value = 0.75;
    let data = [value, 0.3, 0.4];

    mychart5.setOption({
      backgroundColor: "transparent",
      title: [
        {
          text: "用户活跃度",
          textStyle: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#fff",
          },
          left: "center",
          top: "10%",
        },
        {
          // text: (value * 100) + '%',
          textStyle: {
            fontSize: 36,
            fontWeight: "normal",
            color: "#fff",
          },
          x: "center",
          y: "center",
        },
      ],
      series: [
        {
          type: "liquidFill",
          radius: "80%",
          center: ["50%", "50%"],
          data: data,
          amplitude: 4,
          waveAnimation: true,
          animationDuration: 2,
          animationDurationUpdate: 2,
          // 图形样式
          itemStyle: {
            opacity: 0.8,
            shadowBlur: 0,
          },
          // 水球背景样式
          backgroundStyle: {
            color: "rgba(255,255,255,0)",
            borderWidth: 0,
          },
          // 水球轮廓
          outline: {
            show: true,
            borderDistance: 0,
            itemStyle: {
              borderWidth: 2,
              borderColor: "#2feef2",
              shadowBlur: 0,
            },
          },
          // 波浪颜色
          color: ["#2feef2"],
          label: {
            show: true,
            color: "#fff",
            insideColor: "transparent",
            fontSize: 18,
          },
        },
      ],
    });
  };

  const initChart6 = () => {
    let mychart6 = echarts.init(chart6.value);
    mychart6.setOption({
      title: {
        text: "每日活跃度分布",
        textStyle: { color: "#fff" },
      },
      backgroundColor: "transparent",
      textStyle: { color: "#fff" },
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          return `时间: ${params.value[0]}时<br/>活跃度: ${params.value[1]}`;
        },
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: { color: "#fff" },
      },
      xAxis: {
        type: "value",
        name: "时间(小时)",
        min: 0,
        max: 24,
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
      },
      yAxis: {
        type: "value",
        name: "活跃度",
        min: 0,
        max: 100,
        axisLine: { lineStyle: { color: "#2feef2" } },
        axisLabel: { color: "#fff" },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
      },
      series: [
        {
          name: "活跃度",
          type: "scatter",
          symbolSize: function (data: any) {
            return Math.sqrt(data[1]) * 2;
          },
          data: [
            [2, 15],
            [3, 8],
            [4, 5],
            [5, 12],
            [6, 35],
            [7, 68],
            [8, 85],
            [9, 78],
            [10, 65],
            [11, 55],
            [12, 70],
            [13, 65],
            [14, 60],
            [15, 75],
            [16, 80],
            [17, 85],
            [18, 90],
            [19, 88],
            [20, 82],
            [21, 75],
            [22, 60],
            [23, 40],
            [24, 25],
          ],
          itemStyle: {
            color: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: "#FF6B6B" },
                { offset: 0.5, color: "#FFA36B" },
                { offset: 1, color: "#FFD56B" },
              ],
            },
            opacity: 0.8,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "#FFD56B",
            },
          },
        },
      ],
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    });
  };

  const initMap = () => {
    echarts.registerMap("china", chinaJson as any);
    let mapchart = echarts.init(map.value);
    mapchart.setOption({
      geo: {
        map: "china",
        roam: true,
        label: {
          show: true,
          color: "#F5F5F5",
        },
        itemStyle: {
          areaColor: "#4A6572",
          borderColor: "#90A4AE",
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 2,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#64B5F6",
          },
          label: {
            color: "#FFFFFF",
          },
        },
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          symbolSize: function (val: any) {
            return Math.min(val[2] / 50, 20);
          },
          label: {
            show: true,
            formatter: function (params: any) {
              return params.data.value[2].toLocaleString();
            },
            position: "top",
            backgroundColor: "rgba(0,0,0,0.7)",
            borderColor: "#2feef2",
            borderWidth: 1,
            borderRadius: 4,
            padding: [4, 6],
            color: "#fff",
            fontSize: 10,
          },
          itemStyle: {
            color: "#2feef2",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: "bold",
            },
            itemStyle: {
              color: "#FF6B6B",
            },
          },
          data: [
            // 华北地区
            { name: "北京", value: [116.46, 39.92, 1258] },
            { name: "天津", value: [117.2, 39.13, 856] },
            { name: "河北", value: [114.48, 38.03, 2456] },
            { name: "山西", value: [112.53, 37.87, 1875] },
            { name: "内蒙古", value: [111.65, 40.82, 1342] },

            // 东北地区
            { name: "辽宁", value: [123.38, 41.8, 2890] },
            { name: "吉林", value: [125.35, 43.88, 1567] },
            { name: "黑龙江", value: [126.63, 45.75, 1983] },

            // 华东地区
            { name: "上海", value: [121.48, 31.22, 1689] },
            { name: "江苏", value: [118.78, 32.04, 4567] },
            { name: "浙江", value: [120.19, 30.26, 3890] },
            { name: "安徽", value: [117.27, 31.86, 2678] },
            { name: "福建", value: [119.3, 26.08, 2234] },
            { name: "江西", value: [115.89, 28.68, 1895] },
            { name: "山东", value: [117.0, 36.65, 4789] },

            // 华中地区
            { name: "河南", value: [113.65, 34.76, 4123] },
            { name: "湖北", value: [114.31, 30.52, 2987] },
            { name: "湖南", value: [113.0, 28.21, 3125] },

            // 华南地区
            { name: "广东", value: [113.23, 23.16, 7234] },
            { name: "广西", value: [108.33, 22.84, 1876] },
            { name: "海南", value: [110.35, 20.02, 645] },

            // 西南地区
            { name: "重庆", value: [106.54, 29.59, 2231] },
            { name: "四川", value: [104.06, 30.67, 4123] },
            { name: "贵州", value: [106.71, 26.57, 1567] },
            { name: "云南", value: [102.73, 25.04, 1989] },
            { name: "西藏", value: [91.11, 29.97, 234] },

            // 西北地区
            { name: "陕西", value: [108.95, 34.27, 2234] },
            { name: "甘肃", value: [103.73, 36.03, 1345] },
            { name: "青海", value: [101.74, 36.56, 456] },
            { name: "宁夏", value: [106.27, 38.47, 678] },
            { name: "新疆", value: [87.68, 43.77, 1567] },

            // 特别行政区
            { name: "香港", value: [114.17, 22.28, 789] },
            { name: "澳门", value: [113.54, 22.19, 123] },
            { name: "台湾", value: [121.5, 25.03, 1678] },
          ],
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          if (params.componentType === "series") {
            return `${
              params.name
            }<br/>活跃用户: ${params.data.value[2].toLocaleString()}人`;
          }
          return params.name;
        },
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: {
          color: "#fff",
        },
      },
      visualMap: {
        type: "continuous",
        min: 0,
        max: 8,
        calculable: true,
        inRange: {
          color: [
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
          ],
        },
        textStyle: {
          color: "#fff",
        },
        left: "left",
        bottom: "bottom",
      },
    });
  };

  const initChart7 = () => {
    let mychart7 = echarts.init(chart7.value);

    const provinceData = [
      { name: "北京", value: [116.46, 39.92, 1258] },
      { name: "天津", value: [117.2, 39.13, 856] },
      { name: "辽宁", value: [123.38, 41.8, 2890] },
      { name: "吉林", value: [125.35, 43.88, 1567] },
      { name: "黑龙江", value: [126.63, 45.75, 1983] },
      { name: "上海", value: [121.48, 31.22, 1689] },
      { name: "江苏", value: [118.78, 32.04, 4567] },
      { name: "河南", value: [113.65, 34.76, 4123] },
      { name: "湖北", value: [114.31, 30.52, 2987] },
      { name: "广西", value: [108.33, 22.84, 1876] },
      { name: "海南", value: [110.35, 20.02, 645] },
      { name: "四川", value: [104.06, 30.67, 4123] },

      { name: "陕西", value: [108.95, 34.27, 2234] },
    ];

    // 按人数降序排序
    const sortedData = [...provinceData].sort((a, b) => {
      const aValue = a.value?.[2] ?? 0;
      const bValue = b.value?.[2] ?? 0;
      return bValue - aValue;
    });

    const provinces = sortedData.map((item) => item.name);
    const values = sortedData.map((item) => item.value[2]);

    mychart7.setOption({
      title: {
        text: "各省活跃用户排名",
        textStyle: {
          color: "#fff",
          fontSize: 16,
        },
        left: "center",
      },
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params: any) {
          return `${params[0].name}<br/>活跃用户: ${params[0].value}人`;
        },
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "#2feef2",
        textStyle: {
          color: "#fff",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#2feef2",
          },
        },
        axisLabel: {
          color: "#fff",
          formatter: "{value}人",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.2)",
          },
        },
      },
      yAxis: {
        type: "category",
        data: provinces,
        axisLine: {
          lineStyle: {
            color: "#2feef2",
          },
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
          interval: 0,
          formatter: function (value:any) {
            // 名称过长时截断
            return value.length > 3 ? value.substring(0, 3) + "..." : value;
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: "活跃用户",
          type: "bar",
          data: values,
          barWidth: "60%",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#2feef2",
                },
                {
                  offset: 1,
                  color: "#1a8cff",
                },
              ],
            },
            borderRadius: [0, 4, 4, 0],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(47, 238, 242, 0.5)",
            },
          },
          label: {
            show: true,
            position: "right",
            formatter: "{c}人",
            color: "#fff",
            fontSize: 11,
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          yAxisIndex: 0,
          filterMode: "empty",
          width: 12,
          borderColor: "transparent",
          backgroundColor: "rgba(47, 238, 242, 0.1)",
          handleStyle: {
            color: "#2feef2",
          },
          textStyle: {
            color: "#fff",
          },
        },
      ],
    });

    // 窗口大小变化时重绘
    window.addEventListener("resize", () => {
      mychart7.resize();
    });
  };
  onMounted(() => {
    //日期显示
    setInterval(() => {
      timekeeper.value = time.value = moment().format(
        "YYYY年MM月DD日  HH：mm：ss"
      );
    }, 1);
    nextTick(() => {
      initCharts();
    });
  });

  onUnmounted(() => {
    clearInterval(timekeeper.value);
  });
</script>

<style scoped lang="scss">
  .outer {
    width: 100%;
    height: 100%;
    background: url("./images/bg.png");
    .header {
      width: 100%;
      height: 10%;
      display: flex;
      .hleft {
        flex: 1;
        background: url("./images/dataScreen-header-left-bg.png") no-repeat;
      }
      .hmiddle {
        flex: 2;
        background: url("./images/dataScreen-header-center-bg.png") no-repeat;
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 30px;
          color: #2feef2;
          margin-bottom: 20px;
        }
      }
      .hright {
        flex: 1;
        background: url("./images/dataScreen-header-right-bg.png") no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 20px;
          color: #2feef2;
          margin-bottom: 50px;
        }
      }
    }
    .main {
      width: 100%;
      height: 90%;
      display: flex;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .lbox1,
        .lbox2,
        .lbox3 {
          flex: 1;
          display: flex;
          flex-direction: column;
          .total {
            display: flex;
            span {
              color: white;
              flex: 1;
              margin: 0 auto;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size: 18px;
              background: url("./images/total.png") no-repeat;
              // width: 100%;
            }
          }
          .chart1,
          .chart2,
          .chart3,
          .chart4,
          .chart5,
          .chart6 {
            flex: 1;
            width: 100%;
            height: 100%;
            min-height: 200px;
          }
        }
      }
      .middle {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 2;
        }
        .bottom {
          flex: 1;
          width: 100%;
          height: 100%;
          .chart7 {
            flex: 1;
            width: 100%;
            height: 100%;
            min-height: 300px;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rbox1,
        .rbox2,
        .rbox3 {
          flex: 1;
          display: flex;
          flex-direction: column;
          .chart4,
          .chart5,
          .chart6 {
            flex: 1;
            width: 100%;
            height: 100%;
            min-height: 200px;
          }
        }
      }
    }
  }
</style>
