<template>
  <div>
    <q-select square standout v-model="store.select" :options="computedOptions" label="Square standout" emit-value map-options />
    <br /><br />
    <q-input outlined bottom-slots v-model="store.sdevice_id" label="Device ID">
      <template v-slot:append>
        <q-icon v-if="store.sdevice_id !== ''" name="close" @click="store.sdevice_id = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <q-input outlined v-model="store.sx" type="number" label="X" />
    <q-input outlined v-model="store.sy" type="number" label="Y" />
    <q-input outlined v-model="store.saltitude" type="number" label="Altitude" />
    <q-input outlined v-model="store.sspeed_x" type="number" label="Speed X" />
    <q-input outlined v-model="store.sspeed_y" type="number" label="Speed Y" />
    <q-input outlined v-model="store.sspeed_z" type="number" label="Speed Z" />

    <q-input outlined bottom-slots v-model="store.sposture" label="Posture">
      <template v-slot:append>
        <q-icon v-if="store.sposture !== ''" name="close" @click="store.sposture = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <div>{{ store.page_time }}</div>
    <q-input outlined v-model="store.transmit_n" type="number" label="thread number" />
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, computed, watch } from 'vue';
import { useDeviceStore } from 'stores/usr_store.ts';

const store = useDeviceStore();
const computedOptions = computed(() => {
  const options = [];
  for (let i = 0; i < store.transmit_n; i++) {
    options.push({ label: `Device ${i}`, value: i });
  }
  return options;
});
watch(() => store.select, () => {
  store.data_maintain();
});
onMounted(() => {
  store.updateCurrentTime();
  const intervalId = setInterval(store.updateCurrentTime, 1000);
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>
