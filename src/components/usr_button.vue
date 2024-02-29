<template>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn color="blue" label="Random Data" icon="timeline" @click="store.generateRandomData"/>
        <q-btn :color="isTransmitting ? 'green' : 'red'" :label="isTransmitting ? 'Stop transmitting' : 'n thread transmit'" icon="visibility" @click="toggleTransmit(store.transmit_n)"/>
      </q-btn-group>
        </div>
</template>
    
<script setup>  
import { ref } from 'vue';
import { useDeviceStore } from 'stores/usr_store.ts'; // 确保路径正确
import axios,{ api } from 'boot/axios';

const store = useDeviceStore();
const isTransmitting = ref(false);
let intervalId = null;

const transmitData = async (n) => {
    try {
        for (let i = 0; i < n; i++) {
            const response = await api.post('/usr_data/', {
            device_id: store.device_id[i],
            x: store.x[i],
            y: store.y[i],
            altitude: store.altitude[i],
            speed_x: store.speed_x[i],
            speed_y: store.speed_y[i],
            speed_z: store.speed_z[i],
            posture: store.posture[i],
            time: store.time[i],
            });

        }
        store.data_generater_running(); 
    } catch (error) {
        console.error('Error sending data:', error);
    }
};
const startTransmitting = (n) => {
    if (!isTransmitting.value) {
        isTransmitting.value = true;
        intervalId = setInterval(() => transmitData(n), 200);
    }
};
const stopTransmitting = (n) => {
    if (isTransmitting.value) {
    clearInterval(intervalId);
    isTransmitting.value = false;
    intervalId = null;
    }
};

const toggleTransmit = (n) => {
    if (isTransmitting.value) {
    stopTransmitting(n);
    } else {
    startTransmitting(n);
    }
};
</script>
    