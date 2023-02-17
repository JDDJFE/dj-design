<template>
  <div class="dj-date-picker_rangeinput">
    <dj-input
      :disabled="disabledInput"
      :readonly="true"
      v-model="dateRange.startD"
      size="tiny"
      style="width:120px"
      placeholder="开始日期"
    />
    <div class="dj-date-picker_timeinput dj-date-picker_from">
      <dj-input
        :disabled="disabledInput"
        :readonly="true"
        v-model="dateRange.startT"
        style="width:120px"
        size="tiny"
        placeholder="开始时间"
        @focus="handleFocus('timeFrom', 'isFrom')"
      />
      <!-- {{internalValue}}=={{value}} -->
      <transition name="dj-zoom-in-top">
        <div class="dj-date-picker_transition" v-show="isFrom">
          <time-table
            ref="timeFrom"
            :format="format"
            :value="internalValue[0]"
            :picker-type="pickerType"
            :date-table="value[0]"
            @on-change="handleStartChange"
          >
          </time-table>
        </div>
      </transition>
    </div>
    <dj-icon icon="arrow-right" class="dj-date-picker_icon" v-if="isRange"></dj-icon>
    <dj-input
      v-if="isRange"
      :disabled="disabledInput"
      :readonly="true"
      v-model="dateRange.endD"
      style="width:120px"
      size="tiny"
      placeholder="结束日期"
    />
    <div class="dj-date-picker_timeinput dj-date-picker_to" v-if="isRange">
      <dj-input
        class="abc"
        :disabled="disabledInput"
        :readonly="true"
        size="tiny"
        v-model="dateRange.endT"
        style="width:120px"
        placeholder="结束时间"
        @focus="handleFocus('timeTo', 'isTo')"
      />
      <transition name="dj-zoom-in-top">
        <div class="dj-date-picker_transition" v-show="isTo">
          <time-table
            ref="timeTo"
            :format="format"
            :value="internalValue[0]"
            :picker-type="pickerType"
            :date-table="value[1] || value[0]"
            @on-change="handleEndChange"
          >
          </time-table>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { formatDate, DEFAULT_FORMATS, extractTimeFormat } from '../util';
import TimeTable from '../time/time-table.vue';
import { on } from '@/utils/dom';
const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
export default {
  name: 'djRangeInput',
  components: { TimeTable },
  props: {
    value: {
      type: [Date, String, Array]
    },
    pickerType: {
      type: String
    },
    type: {
      type: String
    },
    internalValue: {
      type: [String, Array]
    },
    format: {
      type: String
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
      isFrom: false,
      isTo: false
    };
  },
  computed: {
    isRange() {
      return this.type.includes('range');
    },
    dateRange() {
      let fm = this.format ? extractTimeFormat(this.format) : DEFAULT_FORMATS.timerange,
        [from, to]= this.isRange ? this.value : [this.value, null];
      return {
        startD: from && formatDate(from),
        endD: to && formatDate(to),
        startT: from && formatDate(from, fm),
        endT: to && formatDate(to, fm)
      };
    },
    disabledInput() {
      return Array.isArray(this.value) && !!~this.value.indexOf(null);
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    let handler = e => {
      if (!this.$el.querySelector('.dj-date-picker_from')?.contains(e.target)) {
        this.isFrom = false;
      }
      if (!this.$el.querySelector('.dj-date-picker_to')?.contains(e.target)) {
        this.isTo = false;
      }
    };
    on(document, 'click', handler);
  },
  methods: {
    handleFocus(type, is){
      this[is] = true;
      this.$refs[type].initScrollTop();
    },
    // panelPickerHandlers(val, type) {
    //   this.$emit('on-change', [new Date(val), type]);
    // },
    handleChange(start, end, emit = true) {
      let [dateStart, dateEnd] = this.value;
      Object.keys(start).forEach(type => {
        dateStart[`set${capitalize(type)}`](start[type]);
      });

      Object.keys(end).forEach(type => {
        dateEnd[`set${capitalize(type)}`](end[type]);
      });
      if (dateEnd < dateStart) {
        dateEnd = dateStart;
      }

      this.$emit('on-change', [new Date(dateStart), new Date(dateEnd)]);
      // this.$emit('on-change', [[dateStart, dateEnd], 'range']);
    },
    handleStartChange(date, obj) {
      this.handleChange(obj, {});
    },
    handleEndChange(date, obj) {
      this.handleChange({}, obj);
    }
  }
};
</script>
<style>

</style>
