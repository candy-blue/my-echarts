<script>
import * as echarts from 'echarts';

export default {
  name: "WindSpeedDirection",
  mounted() {
    this.$nextTick(() => {
      this.fssctDraw();
      this.getTsetData();
      this.fsmgtDraw();
      this.fxmgtDraw();
    });
  },
  data() {
    return {
      tableData1: [
        {
          map: '上海市 浦东新区',
          bjnumber: 'A1001',
          bjlevel: '高',
          bjtype: '风速异常',
          time: '2024-08-09 09:30:00'
        },
        {
          map: '北京市 海淀区',
          bjnumber: 'B2002',
          bjlevel: '中',
          bjtype: '温度过高',
          time: '2024-08-09 10:00:00'
        },
        {
          map: '深圳市 南山区',
          bjnumber: 'C3003',
          bjlevel: '低',
          bjtype: '湿度过低',
          time: '2024-08-09 10:30:00'
        },
        {
          map: '广州市 天河区',
          bjnumber: 'D4004',
          bjlevel: '高',
          bjtype: '压力异常',
          time: '2024-08-09 11:00:00'
        },
        {
          map: '杭州市 西湖区',
          bjnumber: 'E5005',
          bjlevel: '中',
          bjtype: '流量过高',
          time: '2024-08-09 11:30:00'
        }
      ],
      columns1: [
        {
          prop: 'map',
          label: '监测位置',
        },
        {
          prop: 'bjnumber',
          label: '设计编号',
        },
        {
          prop: 'bjlevel',
          label: '报警级别',
          width: 100
        },
        {
          prop: 'bjtype',
          label: '报警类型',
          width: 100
        },
        {
          prop: 'time',
          label: '报警开始时间',
          width: 180
        },
      ],
      tableData2: [
        {
          monitorItem: '临时风速',
          featureValue: '25 m/s',
          dataValue: '偏高',
          sensorType: '风速传感器',
          locationInfo: '上海',
          monitorInfo: '2024-08-09 10:00:00'
        },
        {
          monitorItem: '临时风速',
          featureValue: '5 m/s',
          dataValue: '正常',
          sensorType: '风速传感器',
          locationInfo: '北京',
          monitorInfo: '2024-08-09 10:05:00'
        },
        {
          monitorItem: '10min平均风速',
          featureValue: '20 m/s',
          dataValue: '偏高',
          sensorType: '风速传感器',
          locationInfo: '深圳',
          monitorInfo: '2024-08-09 10:10:00'
        },
        {
          monitorItem: '10min平均风速',
          featureValue: '8 m/s',
          dataValue: '正常',
          sensorType: '风速传感器',
          locationInfo: '广州',
          monitorInfo: '2024-08-09 10:15:00'
        }
      ],
      columns2: [
        {
          prop: 'monitorItem',
          label: '监测项',
          width: 180
        },
        {
          prop: 'featureValue',
          label: '特征值',
          width: 100
        },
        {
          prop: 'dataValue',
          label: '数据',
          width: 100
        },
        {
          prop: 'sensorType',
          label: '传感器',
          width: 100
        },
        {
          prop: 'locationInfo',
          label: '位置信息',
          width: 100
        },
        {
          prop: 'monitorInfo',
          label: '监测信息',
        },
      ],
    }
  },
  methods: {
    fssctDraw() {
      // 初始化ECharts实例
      const chart = echarts.init(this.$refs.fsRef);
      const dims = {
        time: 0,
        windSpeed: 1,
        R: 2
      };
      const arrowSize = 18;
      const directionMap = {};
      // prettier-ignore
      ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'].forEach(function (name, index) {
        directionMap[name] = Math.PI / 8 * index;
      });
      const renderArrow = function (param, api) {
        const point = api.coord([
          api.value(dims.time),
          api.value(dims.windSpeed)
        ]);
        return {
          type: 'path',
          shape: {
            pathData: 'M31 16l-15-15v9h-26v12h26v9z',
            x: -arrowSize / 2,
            y: -arrowSize / 2,
            width: arrowSize,
            height: arrowSize
          },
          rotation: directionMap[api.value(dims.R)],
          position: point,
          style: api.style({
            stroke: '#555',
            lineWidth: 1
          })
        };
      };
      // 配置项
      const option = {
        title: {
          text: '风速风向',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const windSpeedValue = params[0].value[dims.windSpeed];
            
            // 如果 windSpeedValue 不是数字类型，尝试将其转换为数字
            const windSpeed = typeof windSpeedValue === 'number' ? windSpeedValue : parseFloat(windSpeedValue);
            
            // 如果转换失败，设置默认值为 0
            const windSpeedText = isNaN(windSpeed) ? 'N/A' : windSpeed.toFixed(2) + ' 米/秒';
            
            return [
              echarts.format.formatTime('yyyy-MM-dd', params[0].value[dims.time]) +
              ' ' +
              echarts.format.formatTime('hh:mm', params[0].value[dims.time]),
              '风速：' + windSpeedText,
              '风向：' + params[0].value[dims.R]
            ].join('<br>');
          }
        },
        grid: {
          top: 50,
          bottom: 125
        },
        xAxis: {
          type: 'time',
          maxInterval: 3600 * 1000 * 24,
          splitLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        yAxis: {
          name: '风速（米/秒）',
          nameLocation: 'middle',
          nameGap: 35,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        visualMap: {
          type: 'piecewise',
          orient: 'vertical', // 垂直排列
          right: 10, // 放置到右侧
          top: 20, // 垂直居中
          pieces: [
            {
              gte: 13.9,
              color: '#D33C3E',
              label: '7级'
            },
            {
              gte: 10.8,
              lt: 13.9,
              color: '#f4e9a3',
              label: '6级'
            },
            {
              gte: 8.3,
              lt: 10.8,
              color: '#f7ba4d',
              label: '5级'
            },
            {
              gte: 5.5,
              lt: 8.3,
              color: '#fbc02d',
              label: '4级'
            },
            {
              gte: 3.3,
              lt: 5.5,
              color: '#ffeb3b',
              label: '3级'
            },
            {
              gte: 1.6,
              lt: 3.3,
              color: '#cddc39',
              label: '2级'
            },
            {
              gte: 0.3,
              lt: 1.6,
              color: '#8bc34a',
              label: '1级'
            },
            {
              lt: 0.3,
              color: '#4caf50',
              label: '0级'
            }
          ],
          seriesIndex: 1,
          dimension: 1
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            minSpan: 5
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            minSpan: 5,
            bottom: 50
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            emphasis: {
              scale: false
            },
            symbolSize: 10,
            lineStyle: {
              color: 'rgba(88,160,253,1)'
            },
            itemStyle: {
              color: 'rgba(88,160,253,1)'
            },
            encode: {
              x: dims.time,
              y: dims.windSpeed
            },
            data: [],  // 测试数据在这里添加
            z: 2
          },
          {
            type: 'custom',
            renderItem: renderArrow,
            encode: {
              x: dims.time,
              y: dims.windSpeed
            },
            data: [],  // 测试数据在这里添加
            z: 10
          },
          {
            type: 'line',
            symbol: 'none',
            encode: {
              x: dims.time,
              y: dims.windSpeed
            },
            lineStyle: {
              color: '#aaa',
              type: 'dotted'
            },
            data: [],  // 测试数据在这里添加
            z: 1
          }
        ]
      };
      
      // 使用配置项显示图表
      chart.setOption(option);
      
      // 调用 resize 方法以确保图表适应容器大小
      window.addEventListener('resize', () => chart.resize());
    },
    fsmgtDraw() {
      const windSpeedChart = echarts.init(this.$refs.fsmgtRef);
      const windSpeedOption = {
        title: {
          text: '风速玫瑰图',
          left: 0
        },
        tooltip: {
          trigger: 'item'
        },
        polar: {},
        angleAxis: {
          type: 'category',
          data: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: true }
        },
        radiusAxis: {
          type: 'value',
          min: 0,
          max: 7,
          interval: 1,
          axisLine: { show: true },
          axisLabel: { show: false }  // 隐藏风速等级标签
        },
        visualMap: {
          type: 'piecewise',
          orient: 'vertical',
          right: 0,
          top: 20,
          pieces: [
            { gt: 6, color: '#D33C3E', label: '7级' },
            { gt: 5, lte: 6, color: '#f4e9a3', label: '6级' },
            { gt: 4, lte: 5, color: '#f7ba4d', label: '5级' },
            { gt: 3, lte: 4, color: '#fbc02d', label: '4级' },
            { gt: 2, lte: 3, color: '#ffeb3b', label: '3级' },
            { gt: 1, lte: 2, color: '#cddc39', label: '2级' },
            { gt: 0, lte: 1, color: '#8bc34a', label: '1级' },
            { lte: 0, color: '#4caf50', label: '0级' }
          ],
          show: true,
          seriesIndex: 0
        },
        series: [
          {
            type: 'bar',
            data: [1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2], // 替换为风速数据
            coordinateSystem: 'polar',
            name: '风速等级',
            stack: 'a'
          }
        ]
      };
      windSpeedChart.setOption(windSpeedOption);
    },
    fxmgtDraw() {
      const windDirectionChart = echarts.init(this.$refs.fxmgtRef);
      const windDirectionOption = {
        title: {
          text: '风向玫瑰图',
          left: 0,
        },
        tooltip: {},
        polar: {},
        angleAxis: {
          type: 'category',
          data: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N', 'NNE'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: true }
        },
        radiusAxis: {
          min: 2,
          max: 7,
          interval: 1,
          name: '风向等级',
          nameLocation: 'middle',
          nameGap: 35,
          axisLine: { show: true },
          axisLabel: { show: true }
        },
        visualMap: {
          type: 'piecewise',
          orient: 'vertical',
          right: 0,
          top: 20,
          pieces: [
            { gt: 6, color: '#D33C3E', label: '7级' },
            { gt: 5, lte: 6, color: '#f4e9a3', label: '6级' },
            { gt: 4, lte: 5, color: '#f7ba4d', label: '5级' },
            { gt: 3, lte: 4, color: '#fbc02d', label: '4级' },
            { gt: 2, lte: 3, color: '#ffeb3b', label: '3级' },
            { gt: 1, lte: 2, color: '#cddc39', label: '2级' },
          ],
          show: true,
          seriesIndex: 0
        },
        series: [
          {
            type: 'bar',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0, 2, 3], // 替换为风向数据
            coordinateSystem: 'polar',
            name: '风向等级',
            stack: 'a'
          }
        ]
      };
      windDirectionChart.setOption(windDirectionOption);
    },
    getTsetData() {
      // 生成测试数据
      const now = new Date();
      const data = [];
      for (let i = 0; i < 150; i++) {
        const time = new Date(now - i * 3600 * 1000);  // 每小时的数据
        const windSpeed = (Math.random() * 15).toFixed(2);  // 随机生成风速，范围为 0 到 15 米/秒
        const windDirection = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)];  // 随机生成风向
        data.push([time, windSpeed, windDirection]);
      }
      
      // 确保 windSpeed 是数字
      const formattedData = data.map(item => [
        item[0],
        parseFloat(item[1]),
        item[2]
      ]);
      
      // 获取 ECharts 实例并设置数据
      const chart = echarts.getInstanceByDom(this.$refs.fsRef);
      const option = chart.getOption();
      option.series.forEach(series => {
        series.data = formattedData;
      });
      
      // 更新图表
      chart.setOption(option);
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="main-top">
      <div class="top-left">
        <!--    风速风向时程图    -->
        <div ref="fsRef" class="echarts"></div>
      </div>
      <div class="top-right">
        <div ref="fsmgtRef" style="height: 100%;width: 50%"></div>
        <div ref="fxmgtRef" style="height: 100%;width: 50%"></div>
      </div>
    </div>
    <div class="main-bottom">
      <div class="bottom-left">
        <div class="box-header">
          报警列表
        </div>
        <div class="box-table">
          <el-table
            :data="tableData1"
            border
            stripe
            height="100%">
            <el-table-column
              v-for="(item, index) in columns1"
              :key="index"
              align="center"
              :prop="item.prop"
              :label="item.label"
              :width="item.width">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bottom-right">
        <div class="box-header">
          监测统计值
        </div>
        <div class="box-table">
          <el-table
            :data="tableData2"
            border
            stripe
            height="100%">
            <el-table-column
              v-for="(item, index) in columns2"
              :key="index"
              align="center"
              :prop="item.prop"
              :label="item.label"
              :width="item.width">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main{
  width: 100%;
  height: 100%;
  
  .echarts{
    width: 100%;
    height: 100%;
  }
  
  .box-header{
    height: 50px;
    line-height: 50px;
  }
  
  .box-table{
    height: calc(100% - 50px);
    width: 100%;
  }
  
  .main-top{
    margin: 5px;
    padding: 5px;
    width: calc(100% - 20px);
    height: calc(50% - 20px);
    border: gray 1px solid;
    display: flex;

    .top-left{
      width: 50%;
      height: 100%;
      margin-right: 10px;
    }
    .top-right{
      width: 50%;
      height: 100%;
      display: flex;
    }
  }
  
  .main-bottom{
    margin: 5px;
    padding: 5px;
    width: calc(100% - 20px);
    height: calc(50% - 20px);
    border: gray 1px solid;
    display: flex;

    .bottom-left{
      width: calc(50% - 15px);
      height: 100%;
      margin-right: 10px;
    }
    .bottom-right{
      width: 50%;
      height: 100%;
    }
  }
}
</style>
