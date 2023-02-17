// 年份
<template>
  <table class="dj-date-picker-year" cellspacing="0"
      cellpadding="0">
    <tbody>
      <tr v-for="(cell, i) in cells" :key="String(cell.date) + i">
        <td v-for="item in cell" :key="String(item.date) + i">
          <em :class="getDateCells(item)"  @click="handleClick(item, $event)">
            {{item.desc}}
          </em>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import mixin from '../base/mixin';
import { parseDate,DEFAULT_FORMATS } from '../util';
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {

    };
  },
  computed: {
    cells() {
      let year = this.dateTable.getFullYear();
      let qz = Math.floor(year / 10) * 10;
      let news = [];
      let index = 0;
      let cells = [];
      for (let i = qz; i <= qz+9; i++) {
        let date = new Date(i, 0, 1);
        // let time = date && this.timeStamp(date);
        let disabled = typeof this.disabledDate === 'function' && this.disabledDate(date);
        news.push({
          desc: i,
          date: date,
          disabled: disabled
        });
      }
      while (index < news.length) {
        cells.push(news.slice(index, index += 3));
      }
      return cells;
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    getDateCells(cell){
      let type = cell.type,
        date = typeof this.value == 'string' ?
          parseDate(this.value, DEFAULT_FORMATS[this.type]) : this.value;
      let check = date && this.timeStamp(new Date(date.getFullYear(), 0, 1));
      return [
        {
          ['dj-date-picker-cell_today']: cell.type === 'today',
          ['dj-date-picker-cell_disabled']: type == 'weekLabel' || type == 'prevMonth' || type == 'nextMonth' || cell.disabled,
          ['dj-date-picker-cell_check']: this.timeStamp(cell.date) === check
        }
      ];
    }
  }
};
</script>
<style lang="less" scoped>
</style>
