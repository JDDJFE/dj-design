<template>
  <span class="data-head-label" :class="pickerType !== 'year-table' && type && !type.includes('range') && `data-head-hov`">
    <span v-show="pickerType == 'date-table' || pickerType == 'month-table'" @click="yearModal()"> {{dates.year}}</span>
    <span v-show="pickerType == 'year-table'" @click="yearModal()">{{dates.yearF}} - {{dates.yearL}}</span>
    <span v-show="pickerType == 'date-table'" @click="monthModal()">{{dates.month}}</span>
  </span>
</template>

<script>
import mixin from './mixin';
export default {
  name: '',
  mixins: [mixin],
  components: {},
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    dates(){
      return this.setTime(this.dateTable);
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
  },
  methods: {
    setTime(now) {
      let year=now.getFullYear();
      let month=now.getMonth()+1;
      let kd = Math.floor(year / 10) * 10;
      return {
        year: year+'年',
        yearF: kd,
        yearL: kd+9,
        month: month+'月'
      };
    },
    yearModal() {
      this.$emit('on-year-click');
    },
    monthModal() {
      this.$emit('on-month-click');
    }
  }
};
</script>
<style lang="less">
.data-head-label{
  font-weight: 500;
}
.data-head-hov{
  cursor: pointer;
  span:hover{
    color:#2d8cf0
  }
}
</style>
