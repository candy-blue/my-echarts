<script>
import MainBeamDeflection from "@/views/integratedManager/components/MainBeamDeflection/index.vue";
import SupportDisplacement from "@/views/integratedManager/components/SupportDisplacement/index.vue";
import CableForce from "@/views/integratedManager/components/CableForce/index.vue";
import StructureVibration from "@/views/integratedManager/components/StructureVibration/index.vue";
import StructureTemperature from "@/views/integratedManager/components/StructureTemperature/index.vue";
import TemperatureHumidity from "@/views/integratedManager/components/TemperatureHumidity/index.vue";
import WindSpeedDirection from "@/views/integratedManager/components/WindSpeedDirection/index.vue";

export default {
  name: "integratedManager",
  components: {
    WindSpeedDirection,
    TemperatureHumidity,
    StructureTemperature,
    StructureVibration,
    CableForce,
    SupportDisplacement,
    MainBeamDeflection,
  },
  data() {
    return {
      mainActive:'2',
      activeList: [
        { name: 'first' },
        { name: 'first' },
        { name: 'third' },
      ],
      tabs2: [
        { label: '风速风向', name: 'first', component: 'WindSpeedDirection' },
        { label: '温湿度', name: 'second', component: 'TemperatureHumidity' },
        { label: '结构温度', name: 'third', component: 'StructureTemperature' },
        { label: '结构震动', name: 'fourth', component: 'StructureVibration' },
        { label: '吊杆索力', name: 'fifth', component: 'CableForce' },
        { label: '支座位移', name: 'sixth', component: 'SupportDisplacement' },
        { label: '主梁挠度', name: 'seventh', component: 'MainBeamDeflection' },
      ],
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<template>
  <el-tabs type="border-card" class="main-box" v-model="mainActive">
    <el-tab-pane label="综合管理" name="1" lazy>
      <div class="tab-item"></div>
    </el-tab-pane>
    <el-tab-pane label="专项展示" name="2" lazy>
      <el-tabs v-model="activeList[1].name" @tab-click="handleClick">
        <el-tab-pane
          v-for="(tab, index) in tabs2"
          :key="index"
          :label="tab.label"
          :name="tab.name"
          lazy
        >
          <!-- 动态组件 -->
          <div class="tab-item">
            <component :is="tab.component"></component>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="通道展示" name="3" lazy>
      <div class="tab-item"></div>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.main-box{
  width: 100%;
  height: 100%;
  
  .tab-item{
    width: 100%;
    height: 80vh;
  }
}
</style>
