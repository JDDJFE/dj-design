<template>
  <div class="dj-date-picker">
    <div class="dj-date-picker-warp">
      <base-shortcut :options="pickerOptions" v-if="shortcuts" @on-change="panelPickerHandlers($event)"/>
      <div :style="{marginLeft: shortcuts ? '110px' : '0px'}">
        <range-input
          :value="dates"
          :format="format"
          :type="type"
          :internal-value="visualValue"
          :picker-type="pickerType"
          :maxDate="maxDate"
          :minDate="minDate"
          v-if="type.includes('time')"
          @on-change="timepickerHandler($event)"
          :defaultTime="defaultTime"
        />
        <div class="dj-picker-down">
          <div class="dj-picker-down_left">
            <div class="dj-date-picker-header">
              <div class="dj-date-picker-icon">
                <dj-icon icon="double-left" @click="cutYearHandler(-1)"></dj-icon>
                <dj-icon
                  v-if="pickerType === 'date-table'"
                  icon="arrow-left"
                  @click="cutMonthHandler(-1)"
                ></dj-icon>
              </div>
              <date-label
                :date-table="leftPanelDate"
                :picker-type="pickerType"
                :type="type"
                :value="value"
              ></date-label>
              <div class="dj-date-picker-icon">
              </div>
            </div>
            <div class="dj-date-picker-content">
              <component
                :is="pickerType"
                ref="pickerTable"
                :picker-type="pickerType"
                :range-state="rangeState"
                :value="dates[0]"
                :type="type"
                :maxDate="maxDate"
                :startEnd='startEnd'
                :minDate="minDate"
                :date-table="leftPanelDate"
                :disabled-date="pickerOptions && pickerOptions.disabledDate"
                :cell-class="pickerOptions && pickerOptions.cellClass"
                :defaultTime="defaultTime"
                @on-change="panelPickerHandlers($event, 'left')"
                @on-change-range="handleChangeRange"
              >
              </component>
            </div>
          </div>
          <div class="dj-picker-down_right">
            <div class="dj-date-picker-header">
              <div class="dj-date-picker-icon">
              </div>
              <date-label
                :date-table="rightPanelDate"
                :internal-value="visualValue"
                :picker-type="pickerType"
                :value="value"
              ></date-label>
              <div class="dj-date-picker-icon">
                <dj-icon
                  v-if="pickerType === 'date-table'"
                  icon="arrow-right"
                  @click="cutMonthHandler(+1)"
                ></dj-icon>
                <dj-icon icon="double-right" @click="cutYearHandler(+1)"></dj-icon>
              </div>
            </div>
            <div class="dj-date-picker-content">
              <component
                :is="pickerType"
                ref="pickerTable"
                :picker-type="pickerType"
                :range-state="rangeState"
                :value="dates[1]"
                :type="type"
                :startEnd='startEnd'
                :maxDate="maxDate"
                :minDate="minDate"
                :date-table="rightPanelDate"
                :disabled-date="pickerOptions && pickerOptions.disabledDate"
                :cell-class="pickerOptions && pickerOptions.cellClass"
                @on-change="panelPickerHandlers($event, 'right')"
                @on-change-range="handleChangeRange"
                :defaultTime="defaultTime"
              >
              </component>
            </div>
          </div>
          <div class="dj-date-picker_time">
          </div>
        </div>
      </div>
    </div>
    <btn-operation
      :value="dates"
      :type="type"
      :picker-type="pickerType"
      @on-now="panelPickerHandlers"
      @on-determine="determinePickerHandlers"
      @on-clear="clearPickerHandlers"
    ></btn-operation>
  </div>
</template>

<script>
import baseShortcut from '../base/base-shortcut';
import dateLabel from '../base/date-label';
import DateTable from './date-table';
import MonthTable from '../base/month-table';
import rangeInput from '../base/range-input';
import YearTable from '../base/year-table';
import TimeTable from '../time/time-table.vue';
import btnOperation from '../base/btn-operation';
import mixin from '../mixin';
import { parseDate, formatDate, DEFAULT_FORMATS, initTimeDate } from '../util';
const dateSorter = (a, b) => {
  if (!a || !b) return 0;
  return a.getTime() - b.getTime();
};
const isEmptyArray = val => val.reduce((isEmpty, str) => isEmpty && !str || typeof str === 'string' && str.trim() === '', true);
export default {
  name: 'djDatePicker',
  components: { DateTable, YearTable, MonthTable, dateLabel, btnOperation, TimeTable, rangeInput, baseShortcut },
  mixins: [mixin],
  props: {
    separator: {
      type: String,
      default: ' - '
    },
    pickerOptions: {
      type: Object
    },
    type: {
      type: String,
      default: 'date'
    },
    format: {
      type: String
    },
    value: {
      type: [Date, String, Array]
    },
    size: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
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
    sectionTime: {
      type: [String, Array]
    },
    minDate: {
      type: [String, Date]
    },
    maxDate: {
      type: [String, Date]
    },
    defaultTime: {
      type: [String, Array]
    }
  },
  data() {
    return {
      startEnd: [],
      dates: [],
      isFocus: false,
      panelDateValue: '',
      // internalValue: this.formatDate(this.value),
      pickerType: '',
      rangeState: {},
      leftPanelDate: null,
      rightPanelDate: null
    };
  },
  computed: {
    shortcuts() {
      return this.pickerOptions && this.pickerOptions.shortcuts && this.pickerOptions.shortcuts.length;
    },
    visualValue() {
      return this.formatDate(this.value) || [];
    },
    timeShow() {
      return !!~this.type.indexOf('time') && this.pickerType !== 'year-table' && this.pickerType !== 'month-table';
    }
  },
  watch: {
    value: {
      handler: function(n,o){
      },
      deep: true
    }
  },
  created() {
    this.defaultInit();
    this.pickerTypeName();
  },
  mounted() {
  },
  methods: {
    defaultInit(){
      const emptyArray = [null, null];
      const vs = isEmptyArray(this.value || []) ? emptyArray : this.parseDate(this.value);
      // console.log('欢迎光临',this.value);
      const [minDate, maxDate] = vs.map(date => {
        if (date && typeof date === 'string') {
          return parseDate(date, DEFAULT_FORMATS[this.type]);
        }
        return date;
      });
      this.dates = [minDate, maxDate];
      this.startEnd = [minDate, maxDate];
      this.leftPanelDate = minDate || initTimeDate();
      this.rightPanelDate = new Date(this.leftPanelDate.getFullYear(), this.leftPanelDate.getMonth() + 1, 1);
      this.rangeState = {from: minDate, to: maxDate, selecting: minDate && !maxDate};
    },
    cutYearHandler(state){
      if (this.pickerType === 'year-table') {
        // this.leftPanelDate = new Date(this.leftPanelDate.getFullYear() + state * 10, 0, 1);
        // this.rightPanelDate = new Date(this.leftPanelDate.getFullYear() + state * 10, 0, 1);
      } else {
        this.leftPanelDate = this.cutDateFilter(this.leftPanelDate, state * 12);
        this.rightPanelDate = this.cutDateFilter(this.rightPanelDate, state * 12);
      }
    },
    cutMonthHandler(state){
      this.leftPanelDate = this.cutDateFilter(this.leftPanelDate,state);
      this.rightPanelDate = this.cutDateFilter(this.rightPanelDate,state);
    },
    // ----------
    pickerTypeName() {
      if (!/^(?!date).*/.test(this.type) || this.type === void 0 || this.type === 'week'){
        this.pickerType = 'date-table';
        return;
      }
      this.pickerType = `${this.type}-table`;
    },
    panelPickerHandlers(val, type){
      // 此判断是为了处理快捷选择[]
      let short = Array.isArray(val);
      if (this.isRange && !short) {
        // 默认零时00:00:00
        val = new Date(val.getFullYear(), val.getMonth(), val.getDate());
      }
      // console.log(val);
      // 开始/结束点击区分
      let qufen = this.rangeState.selecting || short;
      if (qufen){
        const [minDate, maxDate] = short ? val : [this.rangeState.from, val].sort(dateSorter);
        this.dates = [minDate, maxDate];
        this.rangeState = {
          from: minDate,
          to: maxDate,
          selecting: false
        };
        this.$emit('to-change',val);
      } else {
        this.rangeState = {
          from: val,
          to: null,
          selecting: true
        };
        this.$emit('from-change',val);
      }

      // 是否开启默认时间
      let format = 'yyyy-MM-dd HH:mm:ss';
      if (this.defaultTime && this.defaultTime.length) {
        if (qufen) {
          // 设置了结束日期默认时间才进入
          if (this.defaultTime[1] && qufen) {
            let nas = formatDate(this.rangeState.to, format).split(' ')[0];
            this.rangeState.to = parseDate(`${nas} ${this.defaultTime[1]}`,format);
          }
        }
        let nas = formatDate(this.rangeState.from, format).split(' ')[0];
        this.rangeState.from = parseDate(`${nas} ${this.defaultTime[0]}`,format);
      }

      if (short) {
        this.dates = val;
        this.determinePickerHandlers();
      } else {
        this.dates = [this.rangeState.from, this.rangeState.to];
      }
      if (this.type === 'daterange') {
        this.determinePickerHandlers();
      }
      this.startEnd = this.dates;
    },
    timepickerHandler(val) {
      this.dates = val;
    },
    handleChangeRange(val) {
      this.rangeState.to = val;
      const [minDate, maxDate] = [this.rangeState.from, val].sort(dateSorter);
      this.startEnd = [minDate, maxDate];
    },
    determinePickerHandlers() {
      if (this.dates[0] && this.dates[1]) {
        let parents = this.$parent.$parent;
        parents.$emit('input', this.dates);
        parents.isFocus = false;
        this.$emit('calendarChange',this.dates, this.formatDate(this.dates));
      }
    },
    clearPickerHandlers() {
      this.$parent.$parent.$emit('input',[]);
      this.dates = [null, null];
      this.$parent.$parent.isFocus = false;
    }
  }
};
</script>
<style lang='less'>

</style>
