<template>
  <draggable v-model="treeData" :group="groupName(level)" :disabled="!draggable" animation="300" :move="onMove" @start="onStart" @end="onEnd" class="dj-tree">
    <div v-for="node in treeData" :key="node.id" class="dj-tree-node" @click.stop="!node.disabled && onExpand(node)">
      <div class="dj-tree-node-item" :style="`padding-left: ${level * 15 + (node.children && node.children.length ? 0 : 19)}px;`" :class="{'dj-tree-node-item-checked': isCheckOrChildren(node), 'dj-tree-node-item-disabled': node.disabled, 'dj-tree-node-item-level1': level == 0}">
        <dj-icon v-if="node.children && node.children.length" :icon="isExpand(node) ? 'turning-bottom' : 'turning-right'"/>
        <div class="dj-tree-node-item-text"><slot v-bind="{node, level}">{{node.label}}</slot></div>
        <div class="dj-tree-node-item-right" @click.stop><slot name="right" v-bind="{node, level}"></slot></div>
      </div>
      <dj-tree v-if="node.children && node.children.length && isExpand(node)" v-model="node.children"
      :draggable="draggable" :draglevel="draglevel" :expandeds="treeExpandeds" :checkeds.sync="treeCheckeds"
      :checkMaxCount="checkMaxCount" :level="level + 1" @checkChange="(checked, node, level) => $emit('checkChange', checked, node, level)" @expandChange="(checked, node, level) => $emit('expandChange', checked, node, level)" @dragend="(nodes, level) => $emit('dragend', nodes, level)" :dragDisable="dragDisable">
        <template slot-scope="scope">
          <slot v-bind="scope">{{scope.node.label}}</slot>
        </template>
        <template slot="right" slot-scope="scope">
          <slot name="right" v-bind="scope"></slot>
        </template>
      </dj-tree>
    </div>
</draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'djTree',
  components: {
    draggable
  },
  props: {
    value: Array,
    draggable: { // 是否允许拖拽排序
      type: Boolean,
      default: false
    },
    draglevel: { // 是否允许跨级拖拽排序
      type: Boolean
    },
    expandeds: { // 指定需要展开的节点
      type: Array,
      default: () => []
    },
    checkeds: { // 制定选择项
      type: Array,
      default: () => []
    },
    dragDisable: { // 禁止拖动项（内容：不允许被拖动项的id）
      type: Array,
      default: () => []
    },
    checkMaxCount: { // 最多选择项
      type: Number
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: '小家电',
          children: []
        }
      ],
      treeExpandeds: [],
      treeCheckeds: []
    };
  },
  computed: {
  },
  watch: {
    value: { // 监听tree数据变化
      handler: function(o, n) {
        if (this.treeData !== this.value) {
          this.treeData = this.value;
        }
      },
      immediate: true,
      deep: true
    },
    treeData: { // 同步排序后tree数据
      handler: function(o, n) {
        this.$emit('input', this.treeData);
      },
      deep: true
    },
    expandeds: { // 监听展开项
      handler: function(o, n) {
        if (this.expandeds != this.treeExpandeds) {
          this.treeExpandeds = this.expandeds;
        }
      },
      immediate: true,
      deep: true
    },
    // treeExpandeds: { // 同步展开项
    //   handler: function(o, n) {
    //     this.$emit('update:expandeds', this.treeExpandeds);
    //   },
    //   deep: true
    // },
    checkeds: { // 监听选择项
      handler: function(o, n) {
        if (this.checkeds != this.treeCheckeds) {
          this.treeCheckeds = this.checkeds;
        }
      },
      immediate: true,
      deep: true
    },
    treeCheckeds: { // 同步选择项
      handler: function(o, n) {
        this.$emit('update:checkeds', this.treeCheckeds);
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    groupName(pid) { // 用于拖拽排序分组，同组可排序
      if (this.draglevel) {
        return 'dj-tree';
      }
      return `dj-tree-${pid}`;
    },
    onExpand(node) { // 展开子节点
      if (!node.children || !node.children.length) {
        this.onChecked(node);
        return;
      } else if (this.isExpand(node)) {
        this.$remove(this.treeExpandeds, this.treeExpandeds.find(n => n.id == node.id));
      } else {
        this.treeExpandeds.push(node);
      }
      this.$emit('expandChange', this.isExpand(node), node, this.level);
    },
    isExpand(node) { // 判断节点是否展开
      if (this.treeExpandeds.find(n => n.id == node.id)) {
        return true;
      }
      return false;
    },
    onChecked(node) { // 选择节点
      let error = '';
      if (this.isCheck(node)) {
        this.$remove(this.treeCheckeds, this.treeCheckeds.find(c => c.id == node.id));
      } else if (this.checkMaxCount == 1) {
        this.treeCheckeds = [node];
      } else if (!this.checkMaxCount || this.checkMaxCount > this.treeCheckeds.length) {
        this.treeCheckeds.push(node);
      } else {
        error = `最多选择${this.checkMaxCount}项`;
      }
      if (error) {
        this.$message.error(`最多选择${this.checkMaxCount}项`);
      } else {
        this.$emit('checkChange', this.isCheck(node), node, this.level);
      }
    },
    isCheck(node) { // 判断节点是否选中
      if (this.treeCheckeds.find(c => c.id == node.id)) {
        return true;
      }
      return false;
    },
    isCheckOrChildren(node) { // 判断节点或递归子节点是否选中
      if (this.isCheck(node)) {
        return true;
      }
      if (!this.isExpand(node) && node.children && node.children.find(children => this.isCheckOrChildren(children) === true)) {
        return true;
      }
      return false;
    },
    onStart(e) { // 开始拖拽排序
    },
    onMove(e, originalEvent) { // 排序中
      if (this.dragDisable.indexOf(e?.relatedContext?.element?.id) > -1 || this.dragDisable.indexOf(e?.draggedContext?.element?.id) > -1) return false;
      return true;
    },
    onEnd(e) { // 排序完成
      this.$emit('dragend', this.treeData, this.level);
    }
  }
};
</script>
