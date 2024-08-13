<script>
import * as echarts from 'echarts';
import dayjs from "dayjs";
export default {
  name: "CableForce",
  mounted() {
    this.$nextTick(() => {
      this.newslDraw();
      this.oldslDraw();
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
          sensor: '传感器1',
          location: '位置A',
          maxForce: 12000,
          minForce: 9500,
          avgForce: 10500,
          maxForceChange: 2500,
        },
        {
          sensor: '传感器2',
          location: '位置B',
          maxForce: 11000,
          minForce: 9000,
          avgForce: 10000,
          maxForceChange: 2000,
        },
        {
          sensor: '传感器3',
          location: '位置C',
          maxForce: 12500,
          minForce: 10000,
          avgForce: 11200,
          maxForceChange: 2700,
        },
        {
          sensor: '传感器4',
          location: '位置D',
          maxForce: 13000,
          minForce: 9500,
          avgForce: 11000,
          maxForceChange: 2800,
        },
        {
          sensor: '传感器5',
          location: '位置E',
          maxForce: 11800,
          minForce: 9200,
          avgForce: 10300,
          maxForceChange: 2600,
        },
        {
          sensor: '传感器6',
          location: '位置E',
          maxForce: 11800,
          minForce: 9200,
          avgForce: 10300,
          maxForceChange: 2600,
        },
        {
          sensor: '传感器7',
          location: '位置E',
          maxForce: 11800,
          minForce: 9200,
          avgForce: 10300,
          maxForceChange: 2600,
        },
      ],
      columns2: [
        {
          prop: 'sensor',
          label: '传感器',
          width: 180
        },
        {
          prop: 'location',
          label: '位置信息',
        },
        {
          prop: 'maxForce',
          label: '最大索力(KN)',
          width: 100
        },
        {
          prop: 'minForce',
          label: '最小索力(KN)',
          width: 100
        },
        {
          prop: 'avgForce',
          label: '平均索力(KN)',
          width: 100
        },
        {
          prop: 'maxForceChange',
          label: '索力最大变化(KN)',
          width: 100
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
    newslDraw() {
      const myChart = echarts.init(this.$refs.newslRef);
      const option = {
        title: {
          text: '索力(实时数据)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['索力值', '设计值', '一级报警', '二级报警', '三级报警'],
          orient: 'vertical',
          right: 0
        },
        xAxis: [
          {
            type: 'category',
            data: ['左跨7#索', '中塔跨高侧1#索', '左跨8#索', '中塔跨高侧2#索', '左跨9#索'],  // 示例数据，可以根据实际情况修改
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '压力 (kN)',
            min: 0,
            max: 15000,
            interval: 3000,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              show: true,
            }
          }
        ],
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
            name: '索力值',
            type: 'bar',
            data: [9000, 11000, 8000, 12000, 10000],  // 示例数据，可以根据实际情况修改
            itemStyle: {
              color: '#3C8DBC'
            }
          },
          {
            name: '设计值',
            type: 'line',
            data: [11000, 12500, 10000, 13000, 12000],  // 示例数据，可以根据实际情况修改
          },
          {
            name: '一级报警',
            type: 'line',
            data: [12000, 13000, 11000, 13500, 12500],  // 示例数据，可以根据实际情况修改
          },
          {
            name: '二级报警',
            type: 'line',
            data: [13000, 13500, 12000, 13900, 12900],  // 示例数据，可以根据实际情况修改
          },
          {
            name: '三级报警',
            type: 'line',
            data: [14000, 14000, 13000, 14900, 13900],  // 示例数据，可以根据实际情况修改
          }
        ]
      };
      myChart.setOption(option);
    },
    oldslDraw() {
      const myChart = echarts.init(this.$refs.oldslRef);
      const option = {
        title: {
          text: '索力(历史数据)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          top: 80,
        },
        legend: {
          data: [
            '中塔跨高侧7#索 (AC-HM/HR/C/0009)',
            '珠海塔边跨7#索 (AC-HM/HR/C/0024)',
            '香港塔边跨7#索 (AC-HM/HR/C/0025)'
          ],
          top:30
        },
        xAxis: {
          type: 'time', // 设置x轴类型为时间轴
          boundaryGap: false,
          min: 'dataMin',
          max: 'dataMax',
          axisLabel: {
            formatter: (value)=>{
              let time = dayjs(value).format('MM-DD HH:mm')
              return `${time}`;
            },
            interval: 1000 * 60 * 60 * 4
          }
        },
        yAxis: {
          type: 'value',
          name: '压力 (kN)',
          min: 7200,
          max: 12800,
          interval: 1000,
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
            name: '中塔跨高侧7#索 (AC-HM/HR/C/0009)',
            symbol: 'none',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 11800],
              ['2023-04-22 03:00:00', 11500],
              ['2023-04-22 06:00:00', 11200],
              ['2023-04-22 09:00:00', 11000],
              ['2023-04-22 12:00:00', 10900],
              ['2023-04-22 15:00:00', 10700],
              ['2023-04-22 18:00:00', 10600],
              ['2023-04-22 21:00:00', 10500],
              ['2023-04-23 00:00:00', 10500]
            ],
          },
          {
            name: '珠海塔边跨7#索 (AC-HM/HR/C/0024)',
            symbol: 'none',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 9200],
              ['2023-04-22 03:00:00', 9200],
              ['2023-04-22 06:00:00', 9100],
              ['2023-04-22 09:00:00', 9100],
              ['2023-04-22 12:00:00', 9000],
              ['2023-04-22 15:00:00', 9000],
              ['2023-04-22 18:00:00', 8900],
              ['2023-04-22 21:00:00', 8900],
              ['2023-04-23 00:00:00', 8800]
            ],
          },
          {
            name: '香港塔边跨7#索 (AC-HM/HR/C/0025)',
            symbol: 'none',
            type: 'line',
            data: [
              ['2023-04-22 00:00:00', 7300],
              ['2023-04-22 03:00:00', 7350],
              ['2023-04-22 06:00:00', 7400],
              ['2023-04-22 09:00:00', 7450],
              ['2023-04-22 12:00:00', 7500],
              ['2023-04-22 15:00:00', 7550],
              ['2023-04-22 18:00:00', 7600],
              ['2023-04-22 21:00:00', 7650],
              ['2023-04-23 00:00:00', 7700]
            ],
          }
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
            <div ref="newslRef" class="echarts"></div>
          </div>
          <div class="top-right">
            <div ref="oldslRef" class="echarts"></div>
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
          10min索力
        </div>
        <div class="box-table">
          <el-table
            :data="tableData2"
            height="100%"
            border
            stripe
          >
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
    overflow: auto;
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

