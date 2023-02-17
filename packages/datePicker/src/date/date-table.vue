// 日期
<template>
  <div>
    <table
      class="dj-date-picker-cell"
      cellspacing="0"
      cellpadding="0">
      <tbody>
        <tr class="dj-date-picker-week">
            <th v-for="(day) in weekDays" :key="day">
                <span>{{day}}</span>
            </th>
        </tr>
        <tr
          v-for="(cell, key) in cells"
          :class="[
            typeName ? 'dj-date-picker-cell-week' : 'dj-date-picker-cell-date',
            weekTimes(cell).includes(timeStampIn) && 'is-active'
          ]"
          @click="typeName && weekHandleClick(cell, $event)"
          :key="key">
          <td
            v-for="(item, i) in cell.calss"
            :class="getDateCells(item)"
            @click="!typeName && handleClick(item, $event)"
            @mouseenter="handleMouseMove(item)"
            :key="String(item.date) + i">
            <div>
              <span>
                <em>{{ item.desc }}</em>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import mixin from '../base/mixin';
import jsCalendar from 'js-calendar';
import { isInRange, clearHours } from '../util';
export default {
  mixins: [mixin],
  components: {},
  props: {
    startEnd: Array
  },
  data() {
    return {
    };
  },
  computed: {
    timeStampIn(){
      return this.timeStamp(this.value);
    },
    typeName() {
      return this.type == 'week';
    },
    weekDays(){
      let arr = ['', '日','一','二','三','四','五','六'];
      return this.typeName ? arr : arr.slice(1);
    },
    cells() {
      // 优化～～～
      let year = this.dateTable.getFullYear();
      let month = this.dateTable.getMonth();
      let today = this.timeStamp(new Date());
      let jsCal = new jsCalendar.Generator({onlyDays: !this.typeName, weekStart: 0});
      let weekNum = this.typeName ? 8 : 7;

      let rangeStart = this.rangeState.from && clearHours(this.rangeState.from);
      let rangeEnd = this.rangeState.to && clearHours(this.rangeState.to);
      // 双拼转换时间戳 高亮
      let selectedDays = this.newvalue.filter(Boolean).map(clearHours);
      return jsCal(year, month, (cell) => {
        let time = cell.date && this.timeStamp(cell.date);
        let date = new Date(time);
        let disable = this.disabledDate?.(date);
        // 动态class
        let cellClass = this.cellClass?.(date);
        const dateIsInCurrentMonth = cell.date && month === cell.date.getMonth();
        return {
          ...cell,
          type: time === today ? 'today' : cell.type,
          class: cellClass,
          disabled: cell.date && disable,
          wjx: disable,
          range: dateIsInCurrentMonth && isInRange(time, rangeStart, rangeEnd),
          selected: dateIsInCurrentMonth && selectedDays.includes(time),
          time: time
        };
      }).cells.splice(this.typeName ? 8 : 0).reduce((r, e, i) => {
        const page = Math.floor(i / weekNum);
        if (!r[page]) {
          r[page] = {
            calss: [],
            week: '',
            disabled: true
          };
        }
        if (e.type !== 'weekLabel' && !e.disabled) {
          r[page].disabled= false;
        }
        r[page].calss.push(e);
        r[page].week=e.week;
        return r;
      }, []);
      // console.log(222,aa);
      // return aa;
    }
  },
  watch: {

  },
  created() {

  },
  methods: {
    weekTimes(cell) {
      return cell.calss.map(el => el.time);
    },
    getDateCells(cell){
      let { type,disabled, date, selected } = cell;
      let disableds = type == 'prevMonth' || type == 'nextMonth' || disabled;
      let datetime = this.timeStamp(date);
      let check = !disableds && (selected || datetime === this.timeStamp(this.value));
      // let start = datetime === this.timeStamp(this.$parent.dates[0]);
      // console.log(1111,selected);
      // let ssss = check;
      // if () {

      // }
      return [
        {
          ['dj-date-picker-cell_today']: type === 'today',
          // 非当月、设置了禁用日期
          ['dj-date-picker-week_disabled']: type == 'weekLabel',
          ['dj-date-picker-cell_disabled']: disableds,
          ['dj-date-picker-cell_range']: cell.range && !cell.start && !cell.end,
          ['dj-date-picker-start-date']: this.startEnd && datetime === this.timeStamp(this.startEnd[0]),
          ['dj-date-picker-end-date']: this.startEnd && datetime === this.timeStamp(this.startEnd[1]),
          ['dj-date-picker-cell_check']: check,
          // ['dj-date-picker-cell_before']: datetime === this.timeStamp(this.value),
          // ['dj-date-picker-cell_before']: datetime === this.timeStamp(this.$parent.dates[1]),
          [cell.class]: cell.class
        }
      ];
    }
  }
};
</script>
<style lang="less" scoped>

</style>
