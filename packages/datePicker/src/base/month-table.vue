// 月份
<template>
  <table class="dj-date-picker-month" cellspacing="0"
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
  <!-- <div class="dj-date-picker-cell">
    <span
      :class="getDateCells(cell)"
      v-for="(cell, i) in cells"
      :key="String(cell.date) + i"
      @click="handleClick(cell, $event)"
    >
        <em>{{cell.desc}}</em>
    </span>
  </div> -->
</template>

<script>
import mixin from '../base/mixin';
import { parseDate, DEFAULT_FORMATS } from '../util';
export default {
  mixins: [mixin],
  components: {},
  props: {},
  data() {
    return {

    };
  },
  computed: {
    cells() {
      let year = this.dateTable.getFullYear();
      let news = [];
      let index = 0;
      let cells = [];
      for (let i = 0; i < 12; i++) {
        let y = new Date(year, i, 1);
        let disabled = typeof this.disabledDate === 'function' && this.disabledDate(y);
        news.push({
          desc: i+1+' 月',
          date: y,
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
      let check = date && this.timeStamp(new Date(date.getFullYear(), date.getMonth(), 1));
      return [
        {
          ['dj-date-picker-cell_today']: cell.type === 'today',
          // 非当月、设置了禁用日期
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
