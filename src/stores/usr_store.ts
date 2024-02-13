// src/stores/deviceStore.js
import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('deviceStore', {
    state: () => ({
        transmit_n:1,
        device_id: [] as string[],
        x: [] as number[],
        y: [] as number[],
        altitude: [] as number[],
        speed_x: [] as number[],
        speed_y: [] as number[],
        speed_z: [] as number[],
        posture: [] as string[],
        time: [] as string[],
        page_time: '',
        mtn:0.01,
      }),       
  actions: {
    updateCurrentTime() {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      this.page_time = formatter.format(now);
    },
    datatimegenerator() {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      for(let i=0;i<this.transmit_n;i++)
      {
        this.time[i] = formatter.format(now);
      }
    },
    generateRandomData() {
      
        // 重置数组
        this.x = [];
        this.y = [];
        this.altitude = [];
        this.speed_x = [];
        this.speed_y = [];
        this.speed_z = [];
        this.posture = [];
        this.device_id = [];
      
        // 生成 n 个随机值
        for (let i = 0; i < this.transmit_n; i++) {
          this.x.push(Math.random() * 360-180);
          this.y.push(Math.random() * 180-90);
          this.altitude.push(Math.random() * 1000);
          this.speed_x.push((Math.random() * 10-5)*this.mtn);
          this.speed_y.push((Math.random() * 10-5)*this.mtn);
          this.speed_z.push((Math.random() * 10-5)*this.mtn);
          // posture 和 device_id 的生成逻辑保持不变
          this.posture.push(Math.random().toString(36).substring(2, 10).replace(/(.{2})/g, '\$1 ').trim());
          this.device_id.push(Math.random().toString(36).substring(2, 7));
          
        }
        this.datatimegenerator();
      },
      
      data_generater_running() {
        // 确保速度数组有 n 个元素，如果没有则初始化
        if (this.speed_x.length < this.transmit_n) this.speed_x = Array(this.transmit_n).fill(0).map(() => (Math.random() * 10 - 5) * this.mtn);
        if (this.speed_y.length < this.transmit_n) this.speed_y = Array(this.transmit_n).fill(0).map(() => (Math.random() * 10 - 5) * this.mtn);
        if (this.speed_z.length < this.transmit_n) this.speed_z = Array(this.transmit_n).fill(0).map(() => (Math.random() * 10 - 5) * this.mtn);
      
        // 更新位置和速度
        for (let i = 0; i < this.transmit_n; i++) {
          // 如果数组长度不够，先扩展数组
          if (i >= this.x.length) this.x.push(0);
          if (i >= this.y.length) this.y.push(0);
          if (i >= this.altitude.length) this.altitude.push(0);
      
          // 更新位置，使用当前速度值
          this.x[i] += this.speed_x[i];
          this.y[i] += this.speed_y[i];
          this.altitude[i] += this.speed_z[i];
      
          // 处理经度边界
          if (this.x[i] > 180) this.x[i] = this.x[i] - 360;
          else if (this.x[i] < -180) this.x[i] = this.x[i] + 360;
      
          // 处理纬度边界
          if (this.y[i] > 90) {
            const excess = this.y[i] - 90; // 计算超出的部分
            this.y[i] = 90 - excess; // 反向移动
          } else if (this.y[i] < -90) { // 检查并处理纬度低于-90度的情况
            const excess = -90 - this.y[i]; // 计算超出的部分
            this.y[i] = -90 + excess; // 反向移动
          }
          // 直接更新速度值为新的随机值
          this.speed_x[i] = (Math.random() * 10 - 5) * this.mtn;
          this.speed_y[i] = (Math.random() * 10 - 5) * this.mtn;
          this.speed_z[i] = (Math.random() * 10 - 5) * this.mtn;
        }
        this.datatimegenerator();
      },
      
      
      
  },
});
