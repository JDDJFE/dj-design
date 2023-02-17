<template>
  <div class="dj-time-picker">
    <div
      class="dj-picker-input"
      @blur="handleBlur"
      @focus="handleFocus"
      @mouseenter="inputHovering = true"
      @mouseleave="inputHovering = false"
      :class="[
        isRange ? `dj-date-range` : '',
        isFocus && 'dj-date-focus',
        size ? `dj-date-size-${size}` : '',
        disabled && 'dj-date-disabled'
      ]">
      <div style="display: inherit;">
        <div class="dj-date-range-inputcon">
          <input type="text" size="12" :placeholder="isRange ?placeholderName[0] : placeholderName" class="dj-date-range-input" :readonly="true" :value="visualValue"  @blur="handleBlur"
        @focus="handleFocus">
          <slot name="range-separator"
        v-if="isRange">
            <span class="dj-range-separator">{{separator}}</span>
          </slot>
          <input  v-if="isRange" size="12" type="text" class="dj-date-range-input" :placeholder="placeholderName[1]" :readonly="true" :value="visualValue && visualValue[1]" @blur="handleBlur"
        @focus="handleFocus">
        </div>
      </div>
      <div class="dj-date-range-icon">
          <dj-icon icon="time" v-show="!showClose"></dj-icon>
          <i class="iconfont close-solid" @click.stop="clearableHandler"  v-show="showClose"></i>
        </div>
    </div>
    <dj-popover
      className="dj-down-popover"
      v-if="triggerElm"
      trigger="click"
      :disabled="disabled"
      ref="popoverItem"
      :reference="triggerElm"
      :visible.sync="isFocus"
      append-to-body
      placement="bottom">
      <div class="dj-picker-down"  slot="content">
        <div class="dj-date-picker-content">
          <time-table
            ref="timetable"
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
            :end="end"
            :start="start"
            @on-change="panelPickerHandlers"
          >
          </time-table>
        </div>
        <!-- <btn-operation
          :picker-type="pickerType"
          :date-table="panelDateValue"
          @on-change="panelPickerHandlers"
        ></btn-operation> -->
      </div>
    </dj-popover>
  </div>
</template>

<script>
// import btnOperation from './base/btn-operation';
import mixin from './mixin';
import TimeTable from './time/time-table.vue';
import { initTimeDate } from './util';
const placeholder = {
  date: '请选择日期',
  month: '请选择月份',
  year: '请选择年份',
  datetime: '请选择日期时间',
  time: '请选择时间',
  timerange: ['开始时间','结束时间'],
  daterange: ['开始日期','结束日期'],
  datetimerange: ['开始时间','结束时间'],
  week: '请选择周'
};
export default {
  name: 'djTimePicker',
  components: { TimeTable
  // btnOperation
  },
  mixins: [mixin],
  props: {
    placeholder: {
      type: [String, Array]
    },
    pickerOptions: {
      type: Object
    },
    type: {
      type: String,
      default: 'time'
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
      default: true
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
    // 初始化
    const panelDateValue = this.value ? this.parseDate(this.value)[0] : initTimeDate();
    return {
      triggerElm: null,
      isFocus: false,
      inputHovering: false,
      panelDateValue: panelDateValue,
      internalValue: this.value,
      pickerType: 'time'
    };
  },
  computed: {
    placeholderName() {
      return typeof placeholder[this.type] === typeof this.placeholder && this.placeholder || placeholder[this.type];
    },
    visualValue() {
      return this.internalValue ? this.formatDate(this.panelDateValue) : null;
    },
    showClose() {
      return !this.disabled && this.clearable && this.inputHovering && this.visualValue;
    }
  },
  watch: {
    value(val) {
      let vals = this.parseDate(val)[0];
      if (vals) {
        this.panelDateValue = vals;
        let fm = this.formatDate(this.panelDateValue);
        this.internalValue = fm;
      }
    }
  },
  created() {
  },
  mounted() {
    this.triggerElm = this.$el.querySelector('.dj-input') || this.$el.querySelector('.dj-picker-input');
  },
  methods: {
    handleBlur(){
    },
    handleFocus(){
      this.$refs.timetable.initScrollTop();
      // this.isFocus = true;
    },
    clearableHandler() {
      this.isFocus = false;
      this.internalValue = '';
      this.$emit('clear', this);
      this.$emit('input', '');
    },
    panelPickerHandlers(val){
      this.panelDateValue = val;
      this.$emit('input',this.formatDate(val));
      // console.log('time',this.formatDate(val));
    }
  }
};
</script>
