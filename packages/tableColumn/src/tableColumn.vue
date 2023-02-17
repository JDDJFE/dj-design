<template>
  <th :class="{'word-break': wordBreak, 'dj-table-column-has-sort': sort}" @click="sort && onSort(field)">
    <slot name="header">{{label}}</slot>
    <!-- <slot v-bind="scope"></slot> -->
    <div v-if="sort" class="dj-table-column-sort">
      <dj-icon icon="turning-top" :class="{'dj-active': $parent.sortField == field && order == 'asc'}" fontSize="14px"/><br/>
      <dj-icon icon="turning-bottom" :class="{'dj-active': $parent.sortField == field && order == 'desc'}" fontSize="14px"/>
    </div>
  </th>
</template>

<script>
// import { on } from '@/utils/dom';
import sort from '../../table/src/mixins/sort';

export default {
  name: 'djTableColumn',
  mixins: [sort],
  components: {},
  props: {
    label: String,
    field: String,
    width: Number,
    fixed: Boolean,
    wordBreak: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
    // label: {
    //   handler: function(n, o) {
    //     console.log('table-column', this.$parent.init());
    //   },
    //   deep: true
    // }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>
