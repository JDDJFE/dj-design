<template>
  <div>
    <p class=" f30 mb20">datePicker 日期选择器</p>
    <p class="mb10">输入或选择日期的控件。</p><br/>
    <dj-button @click="abc">按钮</dj-button>
    <dj-button @click="abc2()">cellName</dj-button>
    <dj-button @click="abc3">disabledDate</dj-button>
    <h4>日期时间双拼</h4>
    <dj-date-picker class="error" type="datetimerange" v-model="range" format="yyyy-MM-dd HH:mm" separator="至" :pickerOptions="options3"></dj-date-picker>{{range}}
    <dj-date-picker @calendarChange="calendarChange"  type="datetimerange" class="dj-error"  v-model="range"  format="yyyy-MM-dd HH:mm" separator="至" :pickerOptions="pickerOptions1"></dj-date-picker>{{range}}
    <dj-date-picker type="datetimerange" v-model="range1"></dj-date-picker><br/><br/><br/>
     <h4>日期双拼</h4>
    <dj-date-picker type="daterange" size="small" v-model="range"></dj-date-picker>{{range}}
    <h4>日期时间</h4>
    <dj-date-picker  type="datetime" v-model="value2" size="small" separator="~" :pickerOptions="options1"></dj-date-picker>{{value2}}

    <h4>默认</h4>
    <dj-date-picker type="date" format="yyyy~MM~dd" v-model="week1" :minute-step="5"></dj-date-picker>{{week1}}
    <h4>日期+change</h4>
    <dj-date-picker type="date" @change="changeFN" v-model="value"></dj-date-picker> {{value}}
    <h4>年份</h4>
    <dj-date-picker type="year" v-model="value4" :pickerOptions="pickerOptions1"></dj-date-picker>{{value4}}
    <h4>月份</h4>
    <dj-date-picker type="month" v-model="time" :pickerOptions="pickerOptions1"></dj-date-picker>{{value4}}
     <h4>显示周</h4>
    <dj-date-picker type="week" v-model="time" format="yyyy 第 WW 周" @calendarChange="calendarChange" :pickerOptions="pickerOptions1"></dj-date-picker>{{time2}}<br/>
    <dj-date-picker type="week" v-model="week1" format="yyyy 第 WW 周"></dj-date-picker>{{week1}}
    <dj-date-picker type="week" v-model="value4"></dj-date-picker>{{value4}}
    <h4>禁用日期</h4>
    <dj-date-picker type="datetime" :pickerOptions="pickerOptions1" ></dj-date-picker>
    <h4>size</h4>
    <dj-date-picker type="datetime" size="small"  v-model="value2" ></dj-date-picker>
    <!-- <h4>format格式</h4>
    <dj-date-picker></dj-date-picker>
    <h4>value数据</h4>
    <dj-date-picker v-model="value1"></dj-date-picker>{{value1}}<br>
    <dj-date-picker v-model="value2"></dj-date-picker>{{value2}}<br>
    <dj-date-picker :value="value3"></dj-date-picker>:value---{{value3}}<br>
    <dj-date-picker type="year" :value="value3"></dj-date-picker>:value---{{value3}}<br>
    <dj-date-picker type="month" :value="value3"></dj-date-picker>:value---{{value3}}
   <dj-date-picker v-model="'2018-11-3'"></dj-date-picker> -->
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div class="markdown-body">
        <doc></doc>
    </div>
  </div>
</template>

<script>
import doc from '../../docs/datePicker.md';
export default {
  data() {
    return {
      str: '<dj-time-picker v-model="time" :pickerOptions="timeOptions" format="HH点mm分ss秒"></dj-time-picker>',
      lala: '',
      range: [],
      range1: ['2017-1-15 08:30:00'],
      selectableRange1: ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00'],
      selectableRange2: '18:30:00 - 20:30:00',
      minTime: '12:29',
      maxTime: '17:40',
      time: '',
      week1: '2019-8-5 08:30:00',
      time1: '09:02:8',
      time2: '2019-1-5 08:30:00',
      time3: '',
      value: '',
      value4: '2017-1-6',
      value5: new Date(2016, 9, 10, 18, 40),
      value1: '2019-8',
      value2: '',
      value3: '2018-11-3',
      open: false,
      wang: ['2017-02-01', '2017-03-02'],
      options3: {
        shortcuts: [{
          text: '最近一周',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
          onClick(picker) {
            console.log(picker);
          }
        }, {
          text: '最近一个月',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
          onClick(picker) {
          }
        }, {
          text: '最近三个月',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
          onClick(picker) {
          }
        }]
      },
      options1: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        },
        shortcuts: [
          {
            text: 'Today',
            value() {
              return new Date();
            },
            onClick: (picker) => {
              this.$message.info('Click today');
            }
          },
          {
            text: 'Yesterday',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: (picker) => {
              this.$message.info('Click yesterday');
            }
          },
          {
            text: 'One week',
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: (picker) => {
              this.$message.info('Click a week ago');
            }
          }
        ]
      },
      pickerOptions1: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > new Date(new Date() - 24*60*60*1000) || time.getTime() < threeMonths;
        }
      },
      timeOptions: {
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
  mounted(){
    // this.abc2(this.wang);
  },
  methods: {
    calendarChange(val) {
      console.log(val);
      this.abc3();
    },
    abc3(){
      this.pickerOptions1 = {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 10 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      };
    },
    abc2(val){
      let wang = val;
      this.pickerOptions1 = {
        cellClass(date) {
          let y = date.getFullYear().toString();
          let m = (date.getMonth() + 1).toString();
          let d = date.getDate().toString();
          let day = `${y}-${m.length === 1 ? '0' + m : m}-${d.length === 1 ? '0' + d : d}`;
          if (wang.includes(day)) {
            return 'day';
          }
        }
      };
    },
    switchChange(val) {
      this.open = val;
    },
    abc(){
      this.lala = new Date();
      setTimeout(() => {
        this.value1 = '1993-3-4';
        // this.minTime = '9:25';
        this.week1 = '2012-6-30 14:33:1';
      }, 3000);
    },
    changeFN(v,d){
      console.log(v, d);
    }
  }
};
</script>

<style>
.day{
  color: red!important;
}
</style>
