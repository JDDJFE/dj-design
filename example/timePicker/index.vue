<template>
  <div>
    <p class=" f30 mb20">timePicker 时间选择器</p>
    <p class="mb10">输入或选择日期的控件。</p><br/>
    <!-- <dj-time-picker v-model="time" :picker-options="timeOptions" format="HH点mm分ss秒"></dj-time-picker>{{time}}<br>
    <h4></h4>-->
    <h4>禁选类</h4>
    <dj-time-picker v-model="time1" :disabled="true" :pickerOptions="timeOptions" format="HH:mm:ss"></dj-time-picker>{{time1}}<br>
     <h4>step步长选项</h4>
    <dj-time-picker v-model="time3" :minute-step="5" format="HH:mm" :clearable="false" ></dj-time-picker>{{time3}}<br>
    <!-- <h4>start/end</h4>
    <dj-time-picker v-model="time3" format="HH:mm"></dj-time-picker>{{time3}} / start:'08:05' end:'21:00'<br> -->

    <h4>sectionTime 范围</h4>
    <!-- <dj-time-picker v-model="time1" format="HH:mm:ss" :section-time="selectableRange1"></dj-time-picker>{{time1}}/{{selectableRange1}}<br> -->
    <dj-time-picker v-model="time2" :section-time="selectableRange2"></dj-time-picker>{{time2}}/{{selectableRange2}}<br>
    <dj-time-picker v-model="time2" :section-time="selectableRange3"></dj-time-picker>{{time2}}/{{selectableRange3}}<br>
            <!-- minTime: messageInfo.pushTime -->
    <!-- <h4>maxTime最大时间</h4>
    <dj-time-picker v-model="time1" :max-time="maxTime"></dj-time-picker>{{time1}}/{{maxTime}}<br>
    <h4>minTime最小时间</h4>
    <dj-time-picker v-model="time1" :min-time="minTime"></dj-time-picker>{{time1}}/{{minTime}}<br>
    <h4>最大最小时间</h4>
    <dj-time-picker v-model="time" :max-time="maxTime" :min-time="minTime"></dj-time-picker>{{time}}<br> -->
    <div class="markdown-body">
        <doc></doc>
    </div>
  </div>
</template>

<script>
import doc from '../../docs/timePicker.md';
export default {
  data() {
    return {
      str: '<dj-time-picker v-model="time" :picker-options="timeOptions" format="HH点mm分ss秒"></dj-time-picker>',
      lala: '',
      selectableRange1: ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00'],
      selectableRange2: '2019-1-5 18:30:00 - 2019-1-8 20:30:00',
      selectableRange3: '18:30:00 - 20:30:00',
      minTime: '12:29',
      maxTime: '17:40',
      time: new Date(2016, 9, 10, 18, 40),
      week1: '2019-1-5 08:30:00',
      time1: '09:02:8',
      time2: '2019-1-5 08:30:00',
      time3: null,
      timeOptions: {
        // start: '08:05',
        // step: '00:05',
        // end: '21:00'
        disabledHours() {
          return [1,5,10];
        },
        disabledMinutes(time) {
          return time > 10;
        },
        disabledSeconds(time) {
          return time > 15 || time < 5;
        }
      }
    };
  },
  components: {
    doc
  },
  watch: {
    lala(val){
      console.log(val);
    }
  },
  mounted() {
  },
  methods: {
    switchChange(val) {
      this.open = val;
    },
    abc(){
      this.lala = new Date();
      setTimeout(() => {
        this.value1 = '1993-3-4';
        this.minTime = '9:25';
        this.week1 = '2019-8-5 08:30:00';
      }, 3000);
    },
    changeFN(v,d){
      console.log(v, d);
    }
  }
};
</script>
