<template>
  <div class="dj-time-picker-inner">
    <div class="dj-time-picker_list" ref="hours">
      <ul class="dj-time-picker_ul" v-show="formatShow.includes('HH')">
         <li :class="getDateCells(item)" v-for="(item, index) in hoursList" :key="index+item" v-show="!item.hide" @click="handleClick('Hours', item)">{{timeFilter(item.date)}}</li>
      </ul>
    </div>
    <div class="dj-time-picker_list" ref="minutes" v-show="formatShow.includes('mm')">
      <ul class="dj-time-picker_ul">
        <li :class="getDateCells(item)" v-for="(item, index) in minutesList" :key="index+item" v-show="!item.hide" @click="handleClick('Minutes', item)">{{timeFilter(item.date)}}</li>
      </ul>
    </div>
    <div class="dj-time-picker_list" ref="seconds" v-show="formatShow.includes('ss')">
      <ul class="dj-time-picker_ul">
        <li :class="getDateCells(item)" v-for="(item, index) in secondsList" :key="index+item" v-show="!item.hide" @click="handleClick('Seconds', item)">{{timeFilter(item.date)}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { scrollTop } from '@/utils/util';
// import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from '../util';
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: String
    },
    dateTable: {
      type: Date
    },
    disabledHours: {
      type: Function
    },
    disabledMinutes: {
      type: Function
    },
    disabledSeconds: {
      type: Function
    },
    pickerType: {
      type: String
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    format: {
      type: String
    },
    sectionTime: {
      type: [String, Array]
    },
    minTime: {
      type: String
    },
    maxTime: {
      type: String
    },
    start: {
      type: String
    },
    end: {
      type: String
    }
  },
  data() {
    return {
      hours: '',
      minutes: '',
      seconds: '',
      sectionTimes: []
    };
  },
  computed: {
    hoursList(){
      return this.computedList('hour', 24);
    },
    minutesList(){
      return this.computedList('minute', 60);
    },
    secondsList(){
      return this.computedList('second', 60);
    },
    formatShow(){
      let mat = [];
      if (this.format) {
        if (!!~this.format.indexOf('HH')) {
          mat.push('HH');
        }
        if (!!~this.format.indexOf('mm')) {
          mat.push('mm');
        }
        if (!!~this.format.indexOf('ss')) {
          mat.push('ss');
        }
      }
      return mat.length ? mat : ['HH', 'mm', 'ss'];
    }
  },
  watch: {
    dateTable: {
      handler: function(n,o){
        this.hours = n?.getHours();
        this.minutes = n?.getMinutes();
        this.seconds = n?.getSeconds();
        // const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
        // const format = this.format || DEFAULT_FORMATS.timerange;
        // console.log(this.end && parser(this.end, format, ' - '));

        // if (this.sectionTime) {
        //   let ranges = this.sectionTime;
        //   const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
        //   const format = DEFAULT_FORMATS.timerange;
        //   ranges = Array.isArray(ranges) ? ranges : [ranges];
        //   console.log(ranges);
        //   this.sectionTimes = ranges.map(range => parser(range, format, ' - ') ).flat().map(e => {
        //     // console.log(e);
        //     // return i.map(e => {
        //     return {
        //       hour: e.getHours(),
        //       minute: e.getMinutes(),
        //       second: e.getSeconds()
        //     };
        //     // });
        //   });
        //   // console.log(n,ranges);
        //   // this.sectionTimes = ranges.map(range => parser(range, format, '-') ).map(i => {
        //   //   return i.map(e => {
        //   //     return {
        //   //       hour: e.getHours(),
        //   //       minute: e.getMinutes(),
        //   //       second: e.getSeconds()
        //   //     };
        //   //   });
        //   // });
        // }
      },
      immediate: true
    },
    hours(n){
      this.scroll('hours');
    },
    minutes(n){
      this.scroll('minutes');
    },
    seconds(n){
      this.scroll('seconds');
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    computedList(type, num){
      let newTime = [],
        disabledName = type.charAt(0).toUpperCase() + type.slice(1),
        disabledProp = this[`disabled${disabledName}s`],
        arrs = disabledProp && disabledProp() instanceof Array;

      for (let i = 0; i < num; i += this[`${type}Step`]) {
        let mx = false;
        let disableds = false;
        let section = false;
        // if (this.sectionTimes.length) {
        //   section = i > this.sectionTimes[1]?.[type] || i < this.sectionTimes[0]?.[type];
        // }
        if (disabledProp) {
          if (arrs) {
            disableds = disabledProp().includes(i);
          } else {
            disableds = disabledProp && disabledProp(i);
          }
        } else {
          disableds = mx;
        }
        newTime.push({
          date: i,
          checked: i == this[`${type}s`],
          disabled: disableds,
          section: section
          // disabled: disabledProp ? arrs ? disabledProp().includes(i) : disabledProp && disabledProp(i) : mx
        });
      }
      return newTime;
    },
    findIndex(type){
      return this[`${type}List`].findIndex(obj => obj.date == this[type]);
    },
    initScrollTop() {
      this.$nextTick(() => {
        ['hours', 'minutes', 'seconds'].forEach(type => {
          setTimeout(() => {
            if (this.$refs[type]){
              this.$refs[type].scrollTop = 32 * this.findIndex(type);
            }
          }, 100);
        });
      });
    },
    scroll(type) {
      if (!this.$refs[type]){
        return;
      }
      let index = this.findIndex(type),
        from = this.$refs[type].scrollTop,
        to = 32 * index;
      scrollTop(this.$refs[type], from, to, 500);
    },
    timeFilter(str) {
      return str < 10 ? '0' + str : str;
    },
    handleClick(name, time) {
      if (time.disabled) return;
      let newDate = this.dateTable;
      newDate[`set${name}`](time.date);
      this.$emit('on-change', newDate, {[name.toLowerCase()]: time.date});
    },
    getDateCells(cell){
      let { disabled, checked, section } = cell;
      return [
        {
          ['dj-time-picker-cell_disabled']: disabled,
          ['dj-time-picker-cell_section']: section,
          ['dj-time-picker-cell_check']: checked
        }
      ];
    }
  }
};
</script>
<style lang='less' scoped>

</style>
