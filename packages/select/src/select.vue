<template>
  <div class="dj-select-group" :style="{width:width}" :class="size ? `dj-select--${size}` : ''" @focus="handleFocus">
    <div
      class="dj-select-box"
      @mouseenter="inputHovering = true"
      @mouseleave="inputHovering = false"
      :class="[
        {
        'is-focus':isFocus,
        'is-disabled':isDisabled,
        'no-border': noBordered,
        }
        ]"
      >
      <div class="dj-select-original-box">
        <div class="dj-select-original-tagin" v-if="isMultipleTag">
          <dj-tag
            :size="size || 'medium'"
            :closable="true"
            v-for="(item, i) in (collapse ? [checkArr[0]] : checkArr)"
            :key="i"
            :disabled="isDisabled"
            @click="handleTagFocus"
            @close="deletTagChange(item)"
          >{{item.label}}</dj-tag>
          <dj-tag
            :size="size || 'medium'"
            :disabled="isDisabled"
            v-if="checkArr.length > 1 && collapse"
          >+{{checkArr.length -1}}</dj-tag>
        </div>
        <input type="hidden" :value="value" :name="name"/>
        <input
          :style="{height: height}"
          class="dj-select-original"
          type="text"
          v-model="model"
          readonly
          :disabled="isDisabled"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="managePlaceholder"
          :class="{'is-disabled-options':isDisabled,'is-multiple-options': isMultipleTag}">
      </div>
      <div class="dj-select-iconfont">
        <i class="arrow-bottom iconfont" v-if="!showClose"></i>
        <i class="iconfont close-solid" @click.stop="clearableHandler" v-if="showClose"></i>
      </div>
    </div>
    <dj-popover
      className="dj-down-popover"
      trigger="click"
      v-if="triggerElm"
      ref="popoverItem"
      :disabled="disabled"
      :reference="triggerElm"
      :visible.sync="isFocus"
      append-to-body
      :width="pWitch || $el.clientWidth"
      placement="bottom"
      :zIndex="zIndex"
    >
      <div class="dj-select-down-inner"  slot="content" v-if="$children[0]">
        <div v-if="searchable" class="item-search">
          <dj-input
            v-model="modelS"
            placeholder="可搜索"
            style="width: 100%"
            :size="size"
            @focus="handleFocus($event, true)"
            @input="managePlaceholder"
            icon="search2"/>
        </div>
        <ul class="dj-select-down-ul" v-show="$children[0].$children.length >= (searchable ? 2 : 1) && filterCount">
          <ul class="dj-select-group__wrapall" v-if="multipleAll">
            <li
            class="dj-select-down-all"
            :class="{
              'is-select':isSelelct
            }"
            @click="allselectHandle">全选</li>
          </ul>
          <slot></slot>
        </ul>
        <div class="empty-panel" v-if="$children[0].$children.length < (searchable ? 2 : 1) || !filterCount" >{{ $children[0].$children.length < (searchable ? 2 : 1) ? '无数据' : nodata }}</div>
      </div>
    </dj-popover>
  </div>
</template>
<script>
export default {
  name: 'djSelect',
  provide() {
    return {
      'select': this
    };
  },
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    noBordered: {
      type: Boolean,
      default: false
    },
    remoteMethod: {
      type: Function
    },
    filterable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    nodata: {
      type: String,
      default: '未匹配到数据'
    },
    checkhide: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    multipleAll: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number,String,Array,Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    limit: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 79
    }
  },
  data(){
    return {
      isFocus: false,
      model: '',
      modelS: '',
      selected: '',
      optionsCount: 0,
      filterCount: 0,
      inputHovering: false,
      checkArr: [],
      visible: false,
      triggerElm: null,
      childsSort: [],
      childSortLen: [],
      numState: 0,
      pWitch: 220 // 气泡宽度
    };
  },
  computed: {
    isMultiple() {
      return this.multiple || this.multipleAll;
    },
    isMultipleTag() {
      return this.checkArr.length && this.isMultiple;
    },
    isDisabled(){
      return this.disabled;
    },
    showClose() {
      return this.inputHovering && this.checkArr.length && this.clearable && !this.isDisabled;
    },
    isSelelct() {
      return this.checkArr.length == this.childSortLen.length && this.isMultiple;
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.triggerElm = this.$el.querySelector('.dj-select-box');
    });
    this.$on('handleOptionClick', this.handleOptionSelect);
  },
  methods: {
    handleTagFocus() {
      this.isFocus = true;
    },
    allselectHandle() {
      if (this.isSelelct) {
        this.$emit('input', []);
        return;
      }
      let cc = this.childsSortFilter('allselectHandle').map(el => {
        return el.value;
      });
      this.$emit('input',cc);
    },
    childsSortFilter(name) {
      // console.log(name);
      if (!this.$children[0]) return [];
      let childs = this.$children[0].$children;
      let g = [];
      childs.forEach(el => {
        g = el.$children.length ? [...g,...el.$children] : [...g, ...[el]];
      });
      this.childSortLen = this.childSort(g);
      return this.childSortLen;
    },
    childSort(val){
      let s = [];
      val.forEach(el => {
        // 过滤tag/input标签
        if (el.$vnode.componentOptions.tag != 'dj-tag' && el.$el?.className?.indexOf('dj-input')) {
          let st = this.valueS && this.valueS.findIndex( (n)=> n==el.value );
          st != '-1' ? s.splice(st+1,0,el) : s.push(el);
        }
      });
      return s;
    },
    clearableHandler() {
      this.isFocus= false;
      this.handleOptionSelect([]);
      this.$emit('clear');
    },
    handleFocus(val, bo) {
      this.modelS = '';
      this.filterCount = true;
      this.childSortLen.forEach(item=>{
        item.$emit('queryChange', null);
      });
      !bo && this.$emit('focus', val);
    },
    handleBlur(){
      this.$emit('blur', this);
    },
    deletTagChange(val) {
      this.handleOptionSelect(this.checkArr, val);
      this.$emit('close', val, this.selected);
      if (!this.selected.length) this.isFocus= false;
    },
    managePlaceholder(val){
      let cs = this.childSortLen;
      this.filterCount = cs.length;
      cs.forEach(item=>{
        item.$emit('queryChange', this.modelS);
      });
    },
    handleOptionSelect(option, othis, source) {
      if (this.isMultiple) {
        if (othis && this.selected.includes(othis.value)) {
          this.checkArr = option.filter((ele) => {
            return ele.value != othis.value;
          });
        } else {
          this.checkArr = option;
        }
      } else {
        this.checkArr = othis ? [othis] : option;
      }
      let { value, label } = this.checkArr.reduce((r, e, i) => {
        if (e.label !== void 0 && e.value !== void 0) {
          r.value.push(e.value);
          r.label.push(e.label);
        }
        return r;
      }, {
        value: [],
        label: []
      });
      this.selected =value;
      this.model=label;
      let valb = this.isMultiple ? value || [] : value[0];
      if (othis !== null && valb !== this.value) {
        this.$emit('input',valb);
        this.$emit('change',valb, this.isMultiple ? this.checkArr : this.checkArr[0] );
      }
      this.childsSortFilter('handleOptionSelect').forEach(item=>{
        item.$emit('removeClass',value);
        if (value.includes(item.value)){
          item.$emit('chooseOption',value);
        }
      });

      this.$nextTick(() => {
        this.pWitch = this.$el.clientWidth;
      });
    },
    slotUpdateHook() {
      this.numState = this.$children[0].$children.length;
    }
  },
  watch: {
    numState(n,o) {
      this.childsSort = [];
    },
    isFocus(val){
      this.$emit(val ? 'focus-change' : 'blur-change',this);
    },
    childsSort(n,o){
      this.checkArr = [];
      this.childsSortFilter('childsSort').forEach(item=>{
        if (this.valueS?.includes(item.value)){
          this.checkArr.push(item.$options.propsData);
        }
      });
      this.handleOptionSelect(this.checkArr, null, 'watch');
    },
    childSortLen(n, o) {
      if (n != o) {
        this.$refs.popoverItem?.computePosition();
      }
    },
    modelS(n, o) {
      if (n != o) {
        this.$refs.popoverItem?.computePosition();
      }
    },
    value: {
      handler: function(newVal,oldVal) {
        setTimeout(() => {
          this.checkArr = [];
          this.valueS = Array.isArray(newVal) ? newVal : [newVal];
          this.$nextTick(() => {
            this.childsSort = [];
            // this.childsSort = this.childsSortFilter('value');
          });
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
