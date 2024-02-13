<template>
  <div>
    <q-input outlined bottom-slots v-model="store.device_id[0]" label="Device ID" counter maxlength="100">
      <template v-slot:append>
        <q-icon v-if="store.device_id[0] !== ''" name="close" @click="store.device_id[0] = ''" class="cursor-pointer" />
      </template>
    </q-input>

    <!-- 为数值类型的字段，我们不需要counter和maxlength属性 -->
    <q-input outlined v-model="store.x[0]" type="number" label="X" />
    <q-input outlined v-model="store.y[0]" type="number" label="Y" />
    <q-input outlined v-model="store.altitude[0]" type="number" label="Altitude" />
    <q-input outlined v-model="store.speed_x[0]" type="number" label="Speed X" />
    <q-input outlined v-model="store.speed_y[0]" type="number" label="Speed Y" />
    <q-input outlined v-model="store.speed_z[0]" type="number" label="Speed Z" />

    <q-input outlined bottom-slots v-model="store.posture[0]" label="Posture" counter maxlength="100">
      <template v-slot:append>
        <q-icon v-if="store.posture[0] !== ''" name="close" @click="store.posture[0] = ''" class="cursor-pointer" />
      </template>
    </q-input>

    <!-- 对于时间，我们使用一个特殊的类型 -->
    <div>{{ store.page_time }}</div>
    <q-input outlined v-model="store.transmit_n" type="number" label="thread number" />
  </div>
</template>
<script setup>
import { onMounted, onUnmounted} from 'vue';
import { useDeviceStore } from 'stores/usr_store.ts'; // 确保路径正确

const store = useDeviceStore();

onMounted(() => {
  store.updateCurrentTime();
  const intervalId = setInterval(store.updateCurrentTime, 1000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>