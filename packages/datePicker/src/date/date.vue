<template>
  <div class="dj-date-picker">
    <div class="dj-date-picker-warp">
      <base-shortcut :options="pickerOptions" v-if="shortcuts" @on-change="nowPickerHandlers($event)"/>
      <div :style="{marginLeft: shortcuts ? '110px' : '0px'}">
        <range-input
          :value="dates"
          :format="format"
          :type="type"
          :size="size"
          :picker-type="pickerType"
          :internal-value="visualValue || []"
          v-if="type.includes('time')"
          @on-change="panelPickerHandlers($event)"
          :defaultTime="defaultTime"
        />
        <div class="dj-picker-down">
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
              @on-year-click="modalYearHandler"
              @on-month-click="modalMonthHandler"
              :date-table="panelDateValue"
              :internal-value="internalValue"
              :picker-type="pickerType"
              :type="type"
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
              :value="value"
              :type="type"
              :date-table="panelDateValue"
              :maxDate="maxDate"
              :minDate="minDate"
              :disabled-date="pickerOptions && pickerOptions.disabledDate"
              :cell-class="pickerOptions && pickerOptions.cellClass"
              @on-change="panelPickerHandlers($event)"
              :defaultTime="defaultTime"
            >
            </component>
          </div>
            <!-- <div class="dj-date-picker_time">
              <time-table
                ref="timetable"
                v-if="timeShow"
                :value="visualValue"
                :picker-type="pickerType"
                :date-table="panelDateValue"
                :disabled-hours="pickerOptions && pickerOptions.disabledHours"
                :disabled-minutes="pickerOptions && pickerOptions.disabledMinutes"
                :disabled-seconds="pickerOptions && pickerOptions.disabledSeconds"
                :hour-step="hourStep"
                :format="format"
                :minute-step="minuteStep"
                :second-step="secondStep"
                :max-time="maxTime"
                :min-time="minTime"
                :sectionTime="sectionTime"
                @on-change="panelPickerHandlers"
              >
              </time-table>
          </div> -->
        </div>
      </div>
    </div>
    <btn-operation
      v-if="((type=='datetime' || type=='date') && footerShow) && pickerType == 'date-table'"
      :type="type"
      :value="dates"
      :picker-type="pickerType"
      @on-now="nowPickerHandlers"
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
import YearTable from '../base/year-table';
import TimeTable from '../time/time-table.vue';
import btnOperation from '../base/btn-operation';
import rangeInput from '../base/range-input';
import { initTimeDate } from '../util';
import mixin from '../mixin';
import BaseShortcut from '../base/base-shortcut.vue';
export default {
  name: 'djDatePicker',
  components: { DateTable, YearTable, MonthTable, dateLabel, btnOperation, TimeTable, rangeInput, BaseShortcut, baseShortcut },
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
    },
    footerShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // 初始化
    const panelDateValue = this.value ? this.parseDate(this.value)[0] : initTimeDate();
    const date = this.value ? this.parseDate(this.value)[0] : [null];
    const lals = Array.isArray(date) ? date : [date];
    return {
      dates: lals,
      isFocus: false,
      panelDateValue: panelDateValue,
      internalValue: this.formatDate(this.value),
      pickerType: ''
    };
  },
  computed: {
    shortcuts() {
      return this.pickerOptions && this.pickerOptions.shortcuts && this.pickerOptions.shortcuts.length;
    },
    visualValue() {
      return typeof this.internalValue === 'string' ? [this.internalValue] : this.internalValue;
    },
    timeShow() {
      return !!~this.type.indexOf('time') && this.pickerType !== 'year-table' && this.pickerType !== 'month-table';
    }
  },
  watch: {
    value: {
      handler: function(val,o){
        this.panelDateValue = !!val ? typeof val === 'string' ? this.parseDate(val)[0] : val : initTimeDate();
        // console.log(3233232323,this.panelDateValue);
        this.dates = [!!val ? this.panelDateValue : null];
        let fm = this.formatDate(this.panelDateValue);
        this.internalValue = fm;
      },
      deep: true
    }
  },
  created() {
    this.pickerTypeName();
  },
  mounted() {
  },
  methods: {
    timepickerHandler([val, type]){
      // console.log([val, type]);
    },
    // 切换
    modalYearHandler(){
      this.pickerType = 'year-table';
    },
    modalMonthHandler(){
      this.pickerType = 'month-table';
    },
    cutYearHandler(state){
      if (this.pickerType === 'year-table') {
        this.panelDateValue = new Date(this.panelDateValue.getFullYear() + state * 10, 0, 1);
      } else {
        this.panelDateValue = this.cutDateFilter(this.panelDateValue, state * 12);
      }
    },
    cutMonthHandler(state){
      this.panelDateValue = this.cutDateFilter(this.panelDateValue,state);
    },
    // ----------
    pickerTypeName() {
      if (!/^(?!date).*/.test(this.type) || this.type === void 0 || this.type === 'week'){
        this.pickerType = 'date-table';
        return;
      }
      this.pickerType = `${this.type}-table`;
    },
    panelPickerHandlers(val){
      let value = Array.isArray(val) ? val[0] : val;
      this.panelDateValue = value;

      // console.log('wjx2', 'date',value, this.defaultTime);
      if (this.pickerType === 'year-table' && this.type !== 'year') {
        this.pickerType = 'month-table';
        return;
      }
      if (this.pickerType === 'month-table' && this.type !== 'month') {
        this.$nextTick(() => {
          // this.$refs.timetable.initScrollTop();
        });
        this.pickerType = 'date-table';
        return;
      }
      let dataStr = this.formatDate(value);
      this.internalValue = dataStr;
      this.$parent.$parent.$emit('input',new Date(value));
      this.$parent.$parent.$emit('change', value, dataStr);
      if (this.type != 'datetime') this.$parent.$parent.isFocus = false;
    },
    nowPickerHandlers(val) {
      this.panelPickerHandlers(val);
      this.$parent.$parent.isFocus = false;
    },
    clearPickerHandlers() {
      this.$parent.$parent.$emit('input','');
      this.$parent.$parent.isFocus = false;
    },
    determinePickerHandlers() {
      this.$parent.$parent.isFocus = false;
    }
  }
};
</script>
<style lang='less'>

</style>
