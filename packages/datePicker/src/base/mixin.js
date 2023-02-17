import { formatDate, parseDate } from '../util';
export default {
  name: '',
  props: {
    dateTable: {
      type: Date
    },
    rangeState: {
      type: Object,
      default: () => ({
        from: null,
        to: null,
        selecting: false
      })
    },
    value: {
      type: [Date, Array, String]
    },
    disabledDate: {
      type: Function
    },
    cellClass: {
      type: Function
    },
    pickerType: {
      type: String
    },
    type: {
      type: String
    },
    defaultTime: {
      type: [String, Array]
    }
  },
  computed: {
    newvalue() {
      const { rangeState } = this;
      return [rangeState.from, rangeState.to];
    }
  },
  methods: {
    handleMouseMove(cell) {
      if (!this.rangeState.selecting) return;
      if (cell.disabled) return;
      const newDate = cell.date;
      this.$emit('on-change-range', newDate);
    },
    handleClick(cell, e) {
      e.stopPropagation();
      let type = cell.type;
      if (type == 'weekLabel' || type == 'prevMonth' || type == 'nextMonth' || cell.disabled) {
        return;
      }
      let format = 'yyyy-MM-dd HH:mm:ss';
      let newDate = null;
      // let newDate = parseDate(`${formatDate(cell.date, format).split(' ')[0]} ${formatDate(this.dateTable, format).split(' ')[1]}`, format);
      // 默认时间节点
      if (this.type && !this.type.includes('range')) {
        if (this.value || !this.defaultTime) {
          newDate = parseDate(`${formatDate(cell.date, format).split(' ')[0]} ${formatDate(this.dateTable, format).split(' ')[1]}`, format);
        } else {
          newDate = parseDate(`${formatDate(cell.date, format).split(' ')[0]} ${this.defaultTime}`, format);
        }
      }
      let short = Array.isArray(cell.date) ? [new Date(cell.date[0]), new Date(cell.date[1])] : new Date(cell.date);
      this.$emit('on-change', newDate || short);
    },
    weekHandleClick(n, e) {
      e.stopPropagation();
      if (n.disabled) return;
      let newDate = new Date(this.timeStamp(n.calss[2].date));
      this.$emit('on-change', newDate);
    },
    timeStamp(time) {
      let cloneDate = new Date(time);
      cloneDate.setHours(0, 0, 0, 0);
      return cloneDate.getTime();
    }
  }
};
