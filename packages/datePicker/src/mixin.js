import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS, formatDate } from './util';
export default {
  data() {
    return {
      // sizes: {
      //   small: 'tiny',
      //   mini: 'mini',
      //   large: 'large'
      // }
    };
  },
  computed: {
    isRange() {
      return this.type.includes('range');
    }
  },
  methods: {
    cutDateFilter(date, state) {
      let temp = new Date(date);
      let monthP = temp.getMonth() + state;
      let dayCount = new Date(temp.getFullYear(), monthP + 1, 0).getDate();
      if (dayCount < temp.getDate()) {
        temp.setDate(dayCount);
      }
      temp.setMonth(monthP);
      return temp;
    },
    // 周数转为日期
    weekDate(year, week, day=1) {
      //   year       年
      //   week       周
      //   day        需要输出星期几对应的日期   (0-6,   0代表周日)
      var date1 = new Date(year, 0, 1);
      var dayMS = 24 * 60 * 60 * 1000;
      var firstDay = (7 - date1.getDay()) * dayMS;
      var weekMS = (week - 2) * 7 * dayMS;
      var result = date1.getTime() + firstDay + weekMS + day * dayMS;
      date1.setTime(result);
      // return date1.toLocaleDateString();
      return formatDate(date1);
    },
    // 将字符串数据转化中国标准时间格式
    parseDate(val) {
      const isRange = this.type.includes('range');
      const type = this.type;
      const parser = (
        TYPE_VALUE_RESOLVER_MAP[type] ||
        TYPE_VALUE_RESOLVER_MAP['default']
      ).parser;
      const format = this.format || DEFAULT_FORMATS[type];

      if (val && type === 'time' && !(val instanceof Date)) {
        val = parser(val, format, this.separator);
      } else if (isRange) {
        if (!val) {
          val = [null, null];
        } else if (typeof val === 'string') {
          val = parser(val, format, this.separator);
        } else if (type === 'timerange') {
          val = parser(val, format, this.separator).map(v => v || '');
        } else {
          const [start, end] = val;
          if (start instanceof Date && end instanceof Date) {
            val = val.map(date => new Date(date));
          } else if (typeof start === 'string' && typeof end === 'string') {
            val = parser(val.join(this.separator), format, this.separator);
          } else if (!start || !end) {
            val = [null, null];
          }
        }
      } else if (typeof val === 'string' && type.indexOf('time') !== 0) {
        val = parser(val, format) || null;
      }
      return isRange ? val || [] : [val];
    },
    // 将中国标准时间格式转化字符串数据
    formatDate(value) {
      const format = DEFAULT_FORMATS[this.type];
      const { formatter } = TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP['default'];
      return formatter(value, this.format || format, this.separator);
    }
  }
};
