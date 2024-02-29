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
        select:0,
        page_time: '',
        mtn:0.01,
        sdevice_id:'',
        sx:0,
        sy:0,
        saltitude:0,
        sspeed_x:0,
        sspeed_y:0,
        sspeed_z:0,
        sposture:'',
        stime:'',
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
        this.data_maintain();
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
        this.data_maintain_running();
      },
      data_maintain() {
        this.sdevice_id = this.device_id[this.select];
        this.sx = this.x[this.select];
        this.sy = this.y[this.select];
        this.saltitude = this.altitude[this.select];
        this.sspeed_x = this.speed_x[this.select];
        this.sspeed_y = this.speed_y[this.select];
        this.sspeed_z = this.speed_z[this.select];
        this.sposture = this.posture[this.select];
        this.stime = this.time[this.select];
        //console.log("maintain");
        //console.log(this.select);
        //console.log(this.sdevice_id);
        //console.log(this.device_id);
      },
      data_maintain_running() {
        if(this.device_id[this.select] != this.sdevice_id)
        {
          this.device_id[this.select] = this.sdevice_id;
        }
        if(this.x[this.select] != this.sx)
        {
          this.x[this.select] = this.sx;
        }
        if(this.y[this.select] != this.sy)
        {
          this.y[this.select] = this.sy;
        }
        if(this.altitude[this.select] != this.saltitude)
        {
          this.altitude[this.select] = this.saltitude;
        }
        if(this.sposture[this.select] != this.sposture)
        {
          this.posture[this.select] = this.sposture;
        }
        this.sspeed_x = this.speed_x[this.select];
        this.sspeed_y = this.speed_y[this.select];
        this.sspeed_z = this.speed_z[this.select];
        this.stime = this.time[this.select];
      }
      
  },
});
