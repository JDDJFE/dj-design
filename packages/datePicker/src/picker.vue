<template>
  <div class="dj-date-picker" :type="type">
    <!-- <dj-input
      :readonly="true"
      v-if="!isRange"
      @blur="handleBlur"
      @focus="handleFocus"
      showclear
      v-model="visualValue"
      :size="sizes[size]"
      :placeholder="placeholderName"
      icon="calendar"
      style="width:310px"
    /> -->
    <!-- <div class="dj-date-range"  v-if="!isRange"  style="width:310px">
      <dj-icon icon="calendar"></dj-icon>
      <div class="dj-date-range-inputcon"
        :class="[
          isFocus && 'focus',
          size ? `dj-date-size-${size}` : ''
        ]"
        :placeholder="placeholderName"
        style="width:310px"
      >
        <input type="text" :placeholder="placeholderName" class="dj-date-range-input" :readonly="true" :value="visualValue"  @blur="handleBlur"
        @focus="handleFocus">
        <div class="dj-date-range-icon">
          <i class="iconfont close-solid" @click.stop="clearableHandler"  v-if="showClose"></i>
        </div>
      </div>
    </div> -->
    <input type="hidden" :value="value" :name="name">
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
      <div style="display: inherit;width:100%">
        <div class="dj-date-range-inputcon">
            <!-- :style="{'width': isTime}" -->
          <input
            type="text"
            autocomplete="off"
            :placeholder="isRange ?placeholderName[0] : placeholderName"
            class="dj-date-range-input"
            :readonly="true"
            :size="isTime ? 20 : 11"
            :value="isRange ? visualValue && visualValue[0] : visualValue"
            @blur="handleBlur"
            @focus="handleFocus">
          <slot name="range-separator" v-if="isRange">
            <span class="dj-range-separator">{{separator}}
              <dj-icon icon="swap-right" v-if="!separator"></dj-icon>
            </span>
          </slot>
          <input
            v-if="isRange"
            type="text"
            :size="isTime ? 20 : 11"
            autocomplete="off"
            class="dj-date-range-input"
            :placeholder="placeholderName[1]"
            :readonly="true" :value="visualValue && visualValue[1]"
            @blur="handleBlur"
            @focus="handleFocus">
        </div>
      </div>
      <div class="dj-date-range-icon">
        <dj-icon icon="calendar" v-show="!showClose"></dj-icon>
        <i class="iconfont close-solid" @click.stop="clearableHandler" v-show="showClose"></i>
      </div>
    </div>
    <dj-popover
      className="dj-down-popover"
      v-if="triggerElm"
      trigger="click"
      ref="popoverItem"
      :reference="triggerElm"
      :visible.sync="isFocus"
      append-to-body
      :disabled="disabled"
      :contraryVertical="250"
      placement="bottom">
      <div slot="content">
        <datePicker
          ref="datePicker"
          v-if="!isRange"
          :type="type"
          :format="format"
          :value="value"
          :minData="minDate"
          :footerShow="footerShow"
          :maxData="maxDate"
          :pickerOptions="pickerOptions"
          @calendarChange="calendarChange"
          :defaultTime="defaultTime"
        />
        <dateRange
          ref="dateRangePicker"
          v-if="isRange"
          :type="type"
          :format="format"
          :value="value"
          :minData="minDate"
          :maxData="maxDate"
          :pickerOptions="pickerOptions"
          @calendarChange="calendarChange"
          @to-change="toChange"
          @from-change="fromChange"
          :defaultTime="defaultTime"
        />
      </div>
    </dj-popover>
  </div>
</template>

<script>
import datePicker from './date/date';
import dateRange from './date/date-range';
import mixin from './mixin';

const placeholder = {
  date: '选择日期',
  month: '选择月份',
  year: '选择年份',
  datetime: '选择时间',
  time: '选择时间',
  timerange: ['开始时间','结束时间'],
  daterange: ['开始日期','结束日期'],
  datetimerange: ['开始时间','结束时间'],
  week: '选择周'
};
export default {
  name: 'djDatePicker',
  components: { datePicker, dateRange },
  mixins: [mixin],
  props: {
    separator: {
      type: String
    },
    pickerOptions: {
      type: Object
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'date'
    },
    format: {
      type: String
    },
    placeholder: {
      type: [String, Array]
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
    return {
      triggerElm: null,
      isFocus: false,
      inputHovering: false,
      internalValue: this.value && this.formatDate(this.value)
    };
  },
  computed: {
    placeholderName() {
      return typeof placeholder[this.type] === typeof this.placeholder && this.placeholder || placeholder[this.type];
    },
    visualValue: {
      get(){
        return this.internalValue;
      },
      set(v){
        this.$emit('input', '');
        this.internalValue = '';
      }
    },
    showClose() {
      return !this.disabled && this.clearable && this.inputHovering && this.formatDate(this.value);
    },
    isTime() {
      return this.type.includes('time');
    }
  },
  watch: {
    value: {
      handler: function(val,o){
        let fm = this.formatDate(val);
        this.internalValue = fm;
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
    this.triggerElm = this.$el.querySelector('.dj-input') || this.$el.querySelector('.dj-picker-input');
  },
  methods: {
    handleBlur(){
      this.$emit('blur',this);
    },
    handleFocus(){
      if (this.isRange) {
        this.$refs.dateRangePicker.defaultInit();
      }
      this.$refs.datePicker?.$refs.timetable?.initScrollTop();
      this.$emit('focus',this);
    },
    clearableHandler() {
      this.isFocus = false;
      this.$emit('clear', this);
      this.$emit('input', this.isRange? [] : '');
      this.$emit('change',this.isRange? [] : '');
    },
    calendarChange(parseDate, formatDate){
      this.$emit('change', parseDate, formatDate);
    },
    fromChange(val){
      this.$emit('fromChange', val);
    },
    toChange(val){
      this.$emit('toChange', val);
    }
  }
};
</script>
<style lang='less'>

</style>
