<template>
  <tr class="dj-table-row" :class="{'success': (_parent.selection || _parent.selectionRow) && _parent.isCheck(item.row), 'selection-row': _parent.selectionRow, 'striped': _parent.striped && rIndex % 2 == 1}" @click="_parent.handEvent('rowClick', item, $event)">
    <td v-if="_parent.$scopedSlots.expand"
    :class="{'fixed-left': _parent.columnSlots.length && _parent.columnSlots[0].isFixedLeft}"
    :style="_parent.columnSlots.length && _parent.columnSlots[0].isFixedLeft && `left: 0px`">
      <i class="iconfont" :class="{'arrow-right': !item.showExpand, 'arrow-bottom': item.showExpand}" @click="showExpand(item, $event)"></i>
    </td>
    <td v-if="_parent.draggable && _parent.draghandler"
    :class="{'fixed-left': _parent.columnSlots.length && _parent.columnSlots[0].isFixedLeft}"
    :style="_parent.columnSlots.length && _parent.columnSlots[0].isFixedLeft && `left: 0px`">
      <i class="iconfont drag"></i>
    </td>
    <td v-if="_parent.selection"
    :class="{'fixed-left': _parent.columnSlots.length && _parent.columnSlots[0].isFixedLeft}"
    :style="_parent.columnSlots.length && _parent.columnSlots[0].isFixedLeft && `left: ${_parent.getFixedDefaultColumn.width - 62}px`">
      <dj-checkbox :checked="_parent.isCheck(item.row)" @change="_parent.onCheck(item.row)" :disabled="(_parent.isCheckWJX(item.row)) || (!_parent.isCheck(item.row)) && _parent.getSelectionDisabled"/>
    </td>
    <td v-for="(column, cIndex) in _parent.columnSlots" :key="cIndex"
    :class="{'fixed-left': column.isFixedLeft, 'fixed-right': column.isFixedRight, 'last': column.isFixedLast && (column.isFixedLeft && !_parent.isScrollLeft || !_parent.isScrollRight && column.isFixedRight), 'word-break': column.wordBreak}"
    :style="((column.isFixedLeft && `left: ${column.left}px;`) || (column.isFixedRight && `right: ${column.right}px;`) || '') + (column.width ? 'white-space: none;' : '')">
      <div class="cell">
        <span v-if="cIndex == 0" v-for="indent in item.level" :key="indent" class="indent"></span>
        <span  v-if="cIndex == 0 && _parent.isTree && (item.row[_parent.tree.children] && item.row[_parent.tree.children].length > 0 || item.row[_parent.tree.hasChildren] === true)" class="treeBtn">
          <i v-if="item.loading" class="disInB iconfont load" style="font-size: 16px;"></i>
<!--          <dj-button v-else @click="_parent.onTree(item, rIndex)" fontSize="12px" style="height: 20px; width: 20px; padding: 0px;" :icon="!item.showChildren ? 'add' : 'subtract'"></dj-button>-->
          <dj-icon class="disInB cursorP" v-else :icon="!item.showChildren ? 'add-border' : 'subtract-border'"
                   fontSize="16px" @click="_parent.onTree(item, rIndex)"></dj-icon>
        </span>
        <slot v-if="column.isBodySlot" v-bind="{cIndex: cIndex}"/>
        <template v-else>{{item.row[column.field]}}</template>
      </div>
    </td>
  </tr>
</template>

<script>

export default {
  name: 'djTableTr',
  props: {
    item: Object,
    rIndex: Number
  },
  data() {
    return {
    };
  },
  computed: {
    _parent() {
      if (this.$parent.$options._componentTag == 'dj-table') {
        return this.$parent;
      }
      return this.$parent.$parent;
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    showExpand(item, event) {
      item.showExpand = !item.showExpand;
      this._parent.handEvent('expandChange', item, event);
      // this.$emit('expandChange', item.row);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
