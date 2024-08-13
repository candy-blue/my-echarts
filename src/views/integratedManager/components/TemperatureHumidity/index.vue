<script>
import * as echarts from 'echarts';
export default {
  name: "TemperatureHumidity",
  mounted() {
    this.$nextTick(() => {
      this.wsdDraw();
      this.pjwsdDraw();
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
      selectList1: [
        {
          label: '全部',
          value: '全部'
        },
        {
          label: '青州航道桥',
          value: '青州航道桥'
        },
      ],
      selectValue1: '全部',
      selectList2: [
        {
          label: '环境湿度',
          value: '环境湿度'
        },
        {
          label: '环境温度',
          value: '环境温度'
        }
      ],
      selectValue2: '环境湿度',
    }
  },
  methods: {
    wsdDraw() {
      const myChart = echarts.init(this.$refs.wsdRef);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['最大值', '最小值', '平均值', '最新值'],
          right: 10,
          top: 30,
          orient: 'vertical'
        },
        xAxis: [
          {
            type: 'category',
            data: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6', '设备7'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: {
          type: 'value',
          name: '平均值(%RH)',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            show: true,
          }
        },
        dataZoom: [
          {
            type: 'slider', // 滑动条类型的 dataZoom
            show: true,
            xAxisIndex: [0], // 控制 x 轴
            start: 0, // 初始视图的起始位置（0%）
            end: 100 // 初始视图的结束位置（100%）
          },
          {
            type: 'inside', // 内部缩放，可以使用鼠标滚轮缩放
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: '最大值',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + '%RH';
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
          },
          {
            name: '最小值',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + '%RH';
              }
            },
            data: [1.0, 1.2, 1.3, 1.5, 2.3, 5.2, 12.3]
          },
          {
            name: '平均值',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + '%RH';
              }
            },
            data: [1.0, 1.2, 2.3, 3.5, 2.3, 7.2, 18.3]
          },
          {
            name: '最新值',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + '%RH';
              }
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
          }
        ]
      };
      myChart.setOption(option);
    },
    pjwsdDraw() {
      const myChart = echarts.init(this.$refs.pjwsdRef);
      const option = {
        title: {
          text: '10分钟平均湿度数据',
          top: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 30,
          data: ['ITH-HM/QB/L/0001_H', 'ITH-HM/QB/R/0001_H', 'ITH-HM/QB/0001_H', 'ITH-HM/QB/L/0002'],
          type: 'scroll',
          width: '80%'
        },
        grid: {
          top: 80, // 为绘图区保留足够的空间
          left: 50,
          right: 30,
          bottom: 70,
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            formatter: function (value) {
              const date = new Date(value);
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              return `${year}-${month}-${day} ${hours}:${minutes}`;
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '平均值(%RH)',
          min: 30,
          max: 100,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            show: true,
          }
        },
        dataZoom: [
          {
            type: 'slider', // 滑动条类型的 dataZoom
            show: true,
            xAxisIndex: [0], // 控制 x 轴
            start: 0, // 初始视图的起始位置（0%）
            end: 100 // 初始视图的结束位置（100%）
          },
          {
            type: 'inside', // 内部缩放，可以使用鼠标滚轮缩放
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: 'ITH-HM/QB/L/0001_H',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 80],
              ['2023-04-22 03:20:00', 79],
              ['2023-04-22 06:40:00', 78],
              ['2023-04-22 10:00:00', 77],
              ['2023-04-22 13:20:00', 76],
              ['2023-04-22 16:40:00', 75],
              ['2023-04-22 20:00:00', 74],
              ['2023-04-22 23:20:00', 73],
              ['2023-04-23 02:40:00', 72],
              ['2023-04-23 06:00:00', 71],
              ['2023-04-23 09:20:00', 70],
              ['2023-04-23 12:40:00', 69]
            ]
          },
          {
            name: 'ITH-HM/QB/R/0001_H',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 70],
              ['2023-04-22 03:20:00', 69],
              ['2023-04-22 06:40:00', 68],
              ['2023-04-22 10:00:00', 67],
              ['2023-04-22 13:20:00', 66],
              ['2023-04-22 16:40:00', 75],
              ['2023-04-22 20:00:00', 88],
              ['2023-04-22 23:20:00', 73],
              ['2023-04-23 02:40:00', 60],
              ['2023-04-23 06:00:00', 71],
              ['2023-04-23 09:20:00', 55],
              ['2023-04-23 12:40:00', 69]
            ]
          },
          {
            name: 'ITH-HM/QB/0001_H',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 60],
              ['2023-04-22 03:20:00', 59],
              ['2023-04-22 06:40:00', 58],
              ['2023-04-22 10:00:00', 57],
              ['2023-04-22 13:20:00', 56],
              ['2023-04-22 16:40:00', 75],
              ['2023-04-22 20:00:00', 74],
              ['2023-04-22 23:20:00', 78],
              ['2023-04-23 02:40:00', 75],
              ['2023-04-23 06:00:00', 89],
              ['2023-04-23 09:20:00', 70],
              ['2023-04-23 12:40:00', 88]
            ]
          },
          {
            name: 'ITH-HM/QB/L/0002',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 50],
              ['2023-04-22 03:20:00', 49],
              ['2023-04-22 06:40:00', 48],
              ['2023-04-22 10:00:00', 47],
              ['2023-04-22 13:20:00', 46],
              ['2023-04-22 16:40:00', 75],
              ['2023-04-22 20:00:00', 74],
              ['2023-04-22 23:20:00', 46],
              ['2023-04-23 02:40:00', 55],
              ['2023-04-23 06:00:00', 62],
              ['2023-04-23 09:20:00', 83],
              ['2023-04-23 12:40:00', 78]
            ]
          },
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="main-top">
      <div class="top-box">
        <div class="top-select">
          <div class="select-item">
            <div style="margin-right: 10px">
              监测组
            </div>
            <el-select v-model="selectValue1" size="mini" placeholder="请选择">
              <el-option
                v-for="item in selectList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-item">
            <div style="margin-right: 10px">
              监测内容
            </div>
            <el-select v-model="selectValue2" size="mini" placeholder="请选择">
              <el-option
                v-for="item in selectList2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="select-box">
          <div class="top-left">
            <div ref="wsdRef" class="echarts"></div>
          </div>
          <div class="top-right">
            <div ref="pjwsdRef" class="echarts"></div>
          </div>
        </div>
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
    
    .top-box{
      width: 100%;
      height: 100%;
      
      .top-select{
        width: 100%;
        height: 40px;
        display: flex;
        
        .select-item{
          width: 300px;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      
      .select-box{
        width: 100%;
        height: calc(100% - 40px);
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

