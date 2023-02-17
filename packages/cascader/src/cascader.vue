<template>
  <div class="dj-cascader" :style="{ width }">
    <dj-popover
      :visible.sync="visible"
      placement="bottomLeft"
      trigger="click"
      :disabled="disabled"
      appendToBody
      className="dj-cascader-popover"
      ref="popoverItem"
      style="width: 100%"
    >
      <template #content>
        <div v-if="isSearch" class="dj-cascader-inner">
          <div class="dj-cascader-col" v-if="searchRenderList.length">
            <div class="dj-cascader-col-wrap">
              <div v-for="(o, i) in searchRenderList" :key="i" class="dj-cascader-item">
                <div
                  @click.stop="handleCheckSearch(o, radio)"
                  class="dj-cascader-item-item"
                  :class="{
                    active: text == o[labelKey],
                    search: isSearch
                  }"
                >
                  <div class="dj-cascader-item-item-content">
                    <slot v-bind="{ data: o }">
                      <span :title="o[labelKey]">{{ o[labelKey] }}</span>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else :style="{ width }" class="dj-cascader-empty-panel">无匹配数据</div>
        </div>
        <div v-else class="dj-cascader-inner">
          <div v-for="(rList, index) in renderList" :key="index" class="dj-cascader-col">
            <div class="dj-cascader-col-wrap">
              <div v-for="(o, i) in rList" :key="i" class="dj-cascader-item">
                <div
                  @click.stop="handleCheck(o, index, !!(o[childrenKey] && o[childrenKey].length), false, radio)"
                  class="dj-cascader-item-item"
                  :class="{
                    active: (checkList[o.level - 1] || {})[valueKey] == o[valueKey]
                  }"
                >
                  <div class="dj-cascader-item-item-content">
                    <dj-radio
                      v-if="radio"
                      v-model="radioValue"
                      :class="{
                        active:
                          (checkList[o.level - 1] || {})[valueKey] == o[valueKey] &&
                          (config.lazy ? o.leaf === false : o[childrenKey] && o[childrenKey].length),
                        checked: value.includes(o[valueKey])
                      }"
                      :code="o[valueKey]"
                      @change="handleCheck(o, index, !!(o[childrenKey] && o[childrenKey].length))"
                      :title="o[labelKey]"
                    >
                      <slot v-bind="{ data: o }">
                        {{ o[labelKey] }}
                      </slot>
                    </dj-radio>
                    <div v-else>
                      <slot v-bind="{ data: o }">
                        <span :title="o[labelKey]">{{ o[labelKey] }}</span>
                      </slot>
                    </div>
                  </div>
                  <dj-icon
                    v-if="(o[childrenKey] && o[childrenKey].length) || (o.leaf === false && !o.loading)"
                    :class="{
                      active: radio
                        ? value.includes(o[valueKey])
                        : checkList.find((item) => item[valueKey] === o[valueKey])
                    }"
                    icon="arrow-right"
                    fontSize="20px"
                  ></dj-icon>
                  <dj-icon v-if="o.loading && o.leaf === false" icon="load" fontSize="20px"></dj-icon>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="!renderList.length || !(renderList[0] || []).length"
            :style="{ width }"
            class="dj-cascader-empty-panel"
          >
            无匹配数据
          </div>
        </div>
      </template>
      <Main
        ref="main"
        :clearable="clearable"
        :placeholder="placeholder"
        v-model="text"
        :visible.sync="visible"
        :loading="loading"
        :searchable="searchable"
        @onSearch="handleSearch"
        :delayTime="config.delayTime"
        :disabled="disabled"
      ></Main>
    </dj-popover>
  </div>
</template>

<script>
import Main from './main.vue';
import deepClone from '@/utils/deepClone';
export default {
  name: 'dj-cascader',
  components: { Main },
  props: {
    value: {
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({
        labelKey: 'label',
        valueKey: 'value',
        childrenKey: 'children'
      })
    },
    // 可搜索
    searchable: {
      type: Boolean,
      default: false
    },
    // 搜索框宽度
    width: {
      type: String,
      default: '400px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    radio: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      text: '',
      visible: false,
      checkList: [],
      renderList: [],
      checkListCopy: [],
      mOptions: [],
      flattenList: [],
      isSearch: false,
      loading: false,
      isClear: false,
      radioValue: '',
      oldValue: [],
      activeFlag: 1,
      isInnerChange: false
    };
  },
  computed: {
    valueKey() {
      return this.config.valueKey || 'value';
    },
    labelKey() {
      return this.config.labelKey || 'label';
    },
    childrenKey() {
      return this.config.childrenKey || 'children';
    }
  },
  watch: {
    options: {
      handler() {
        this.initDatas();
        this.vModelValue();
      },
      deep: true
    },
    visible: {
      handler(v) {
        if (!v) {
          this.$refs.main.isActive = false;
        }
      }
    },
    text: {
      handler(v) {
        if (v === '') {
          this.checkList = [];
          this.renderList.splice(1);
        }
        this.isSearch = false;
        const modelValue = this.checkList.map((item) => item[this.valueKey]);
        this.radioValue = modelValue[modelValue.length - 1];

        if (JSON.stringify(modelValue) !== JSON.stringify(this.value)) {
          this.$emit('input', modelValue);
          this.isInnerChange = true;
        }
        this.$emit('change', modelValue);
      },
      deep: true
    },
    renderList: {
      handler(v) {
        if (this.searchable && this.config.lazy) {
          this.searchList = this.combinationSearch(deepClone(v));
        }
        this.$refs.popoverItem?.computePosition();
      },
      deep: true
    },
    value: {
      handler(v, oV) {
        this.oldValue = oV;
        if (!v || !v?.length) {
          this.text = '';
          return;
        }
        this.text = this.text.split(this.separator).splice(0, v.length).join(this.separator);
        if (!this.isInnerChange) {
          this.vModel();
        }
        this.isInnerChange = true;
      },
      deep: true
    },
    checkList: {
      handler(v) {
        this.text = v.reduce((prev, item, index) => {
          // eslint-disable-next-line no-return-assign
          return prev += (index === 0 ? '' : this.separator) + item[this.labelKey];
        }, '');
      }
    }
  },
  created() {},
  mounted() {
    if (this.config.lazy) {
      this.config.lazyLoad({ level: 0 }, (nodes) => {
        this.renderList = [this.addLevel(nodes, this.childrenKey)];
      });
    } else {
      this.initDatas();
    }
    this.vModel();
  },
  methods: {
    initDatas() {
      this.mOptions = this.addLevel(deepClone(this.options), this.config.childrenKey || 'children');
      this.flattenList = this.flatten(deepClone(this.mOptions), {
        options: this.options,
        valueKey: this.valueKey,
        labelKey: this.labelKey,
        childrenKey: this.childrenKey
      });
      this.renderList[0] = this.mOptions;
      this.searchList = this.combination(deepClone(this.mOptions));
    },
    addLevel(arr, childrenKey, index = 0) {
      arr.forEach((item) => {
        item.origin = deepClone(item);
        item.level = index + 1;
        if (item[childrenKey]) {
          this.addLevel(item[childrenKey], childrenKey, index + 1);
        }
      });
      return arr;
    },
    flatten(arr, datas) {
      const result = [];
      arr.forEach((item) => {
        result.push(item);
        if (item[datas.childrenKey]) {
          item[datas.childrenKey].forEach((child) => {
            child.pId = item[datas.valueKey];
          });
          const children = deepClone(item[datas.childrenKey]);
          result.push(...this.flatten(children, datas));
        }
      });
      return result;
    },
    combination(arr) {
      const result = [];

      /**
       * @desc 格式化函数
       * @param {Array} arr 数组
       * @param {Array} parent 父级数组
       * @return {Array} 格式化后的数组
       */
      const labelKey = this.labelKey;
      const valueKey = this.valueKey;
      const childrenKey = this.childrenKey;
      const separator = this.separator;
      function format(arr, parent) {
        arr.forEach((item) => {
          const { level } = item;
          if (level == 1) {
            parent = {
              [labelKey]: item[labelKey],
              [valueKey]: [item[valueKey]]
            };
          } else {
            const parentBackup = deepClone(parent);
            parent = {
              [labelKey]:
                parentBackup[labelKey]
                  .split(separator)
                  .splice(0, level - 1)
                  .join(separator) +
                separator +
                item[labelKey],
              [valueKey]: [...parentBackup[valueKey].splice(0, level - 1), item[valueKey]]
            };
          }
          if (item[childrenKey] && item[childrenKey].length) {
            format(item[childrenKey], parent);
          } else {
            result.push(parent);
          }
        });
      }

      format(arr);

      return result;
    },
    combinationSearch(arr) {
      const result = [];

      const labelKey = this.labelKey;
      const valueKey = this.valueKey;
      const separator = this.separator;
      function format(arr) {
        arr.forEach((itemArr, index) => {
          itemArr.forEach((item) => {
            if (index === 0) {
              result.push({
                ...item,
                [valueKey]: [item[valueKey]]
              });
            } else {
              const parent = result.find((p) => p[valueKey].includes(item.pId));
              if (!parent) return;
              result.push({
                ...item,
                [valueKey]: [...parent[valueKey], item[valueKey]],
                [labelKey]: parent[labelKey] + separator + item[labelKey]
              });
            }
          });
        });
      }

      format(arr);

      return result;
    },
    handleCheck(item, index, hasChildren, isLazySearch, isRadio) {
      if (
        JSON.stringify(item) === JSON.stringify(this.checkList[item.level - 1]) &&
        item.level == this.checkList.length
      ) {
        if (!this.radio || isRadio) {
          return;
        }
      }
      const checkList = deepClone(this.checkList);
      this.checkList[item.level - 1] = item;
      this.checkList = this.checkList.filter((_, i) => i <= index);

      let checkStrictly = this.config.checkStrictly;
      if (this.config.lazy && this.searchable) {
        checkStrictly = true;
      }

      // 如果开启了选中任意项，则执行该逻辑
      if (
        checkStrictly && !isRadio ||
        item.leaf ||
        !hasChildren && item.leaf !== false ||
        this.radio && !isRadio
      ) {
        if (this.radio && isRadio && (item.leaf || !hasChildren && item.leaf !== false)) {
          //
        } else {
          this.text = this.checkList.reduce((prev, item, index) => {
            // eslint-disable-next-line no-return-assign
            return prev += (index === 0 ? '' : this.separator) + item[this.labelKey];
          }, '');
        }
      }

      // 如果重复选择了前面选中过的项，则渲染列表仅展示下一级子集
      if (checkList.find((i) => i[this.valueKey] === item[this.valueKey] && i.level === item.level)) {
        this.renderList.splice(index + 2);
        if (!this.config.lazy || !this.searchable) {
          // return;
        }
      }
      // 如果下一级渲染的列表是当前选中的项的子项，则不需要重新渲染
      if (item[this.valueKey] === (this.renderList[index + 1] || [])[0]?.pId) {
        return;
      }
      if (this.config.lazy) {
        if (!item.leaf) {
          item.loading = true;
          this.loading = true;
          // 清空子集渲染列表
          this.renderList.splice(index + 1);
          this.config.lazyLoad(item, (nodes) => {
            this.renderList[index + 1] = this.addLevel(nodes, this.childrenKey, item.level).map((i) => {
              i.pId = item[this.valueKey];
              return i;
            });
            this.renderList = this.renderList.filter((item, i) => i <= index + 1);
            if (!this.renderList[this.renderList.length - 1].length) {
              this.renderList.pop();
            }
            item.loading = false;
            this.loading = false;
          });
        } else {
          // 选中最后一级关闭气泡
          !isLazySearch && (this.visible = false);
        }
      } else {
        this.renderList[index + 1] = this.flattenList.filter(
          (i) => i.level === index + 2 && item[this.valueKey] === i.pId
        );
        this.renderList = this.renderList.filter((item, i) => i <= index + 1);
        if (!this.renderList[this.renderList.length - 1].length) {
          this.renderList.pop();
        }

        if (!hasChildren && !this.radio) {
          // 选中最后一级关闭气泡
          this.visible = false;
        }
      }
      this.$emit('change', item);
    },
    handleSearch(keyword) {
      this.isSearch = false;
      if (keyword === this.text) {
        return;
      }
      if (!keyword) {
        this.searchRenderList = [];
        return;
      }
      this.isSearch = true;
      // 根据label进行模糊匹配，返回list
      this.searchRenderList = this.searchList.filter((i) => i[this.labelKey]?.includes(keyword));
    },
    handleCheckSearch(item, isRadio) {
      if (item[this.labelKey] === this.text) {
        this.visible = false;
        return;
      }
      // 给搜索框展示的文本赋值
      this.text = item[this.labelKey];

      const { labelKey, valueKey } = this;
      const _this = this;
      function searchFormatCheckList(flattenList) {
        // 格式化checkList
        _this.checkList = item[valueKey].map((i) => {
          const detail = flattenList.find((j) => j[valueKey] === i);
          return {
            [valueKey]: i,
            [labelKey]: detail?.[labelKey],
            level: detail.level
          };
        });

        // 加载渲染列表
        _this.checkList.reduce((prev, item, index) => {
          if (index === 0) {
            _this.renderList[0] = _this.mOptions;
          } else {
            _this.renderList[index] = flattenList.filter((i) => i.level === index + 1 && prev[valueKey] === i.pId);
          }
          return item;
        });
      }

      if (this.config.lazy && this.searchable) {
        const flatList = this.renderList.flat(2);
        searchFormatCheckList(flatList);
        setTimeout(() => {
          const valueLength = item[this.valueKey].length;
          const labelList = item[this.labelKey].split(this.separator);
          const data = {
            ...item,
            [this.valueKey]: item[this.valueKey][valueLength - 1],
            [this.labelKey]: labelList[labelList.length - 1]
          };
          this.handleCheck(data, item.level - 1, false, true, isRadio);
        });
      } else {
        searchFormatCheckList(this.flattenList);
      }
    },
    // 回显双向绑定
    vModelValue() {
      const checkList = [];
      const renderList = [];
      this.value.forEach((item, index) => {
        if (index === 0) {
          renderList[index] = this.flattenList.filter((f) => f.level === 1);
        } else {
          renderList[index] = this.flattenList.filter((f) => f.pId === this.value[index - 1]);
        }
        const checkItem = this.flattenList.find((f) => f[this.valueKey] === item);
        checkItem && (checkList[index] = checkItem);
      });
      if (JSON.stringify(checkList) === JSON.stringify(this.checkList)) return;
      this.renderList = renderList;
      this.checkList = checkList;
      this.text = this.checkList
        .filter((item) => item)
        .reduce((prev, item, index) => `${prev}${index ? this.separator : ''}${item[this.labelKey]}`, '');
      this.radioValue = this.value[this.value.length - 1];
    },
    // 动态回显双向绑定
    activeVmodelValue() {
      this.activeFlag = 1;
      (this.value || []).forEach((item, index) => {
        if (item !== this.oldValue[index]) {
          this.config.lazyLoad({ level: index + 1 }, (nodes) => {
            this.activeFlag = this.activeFlag + 1;
            const checkList = [];
            if (this.activeFlag > this.value.length) {
              return;
            }
            this.renderList[index + 1] = this.addLevel(nodes, this.childrenKey, index + 1).map((i) => {
              i.pId = item[this.valueKey];
              return i;
            });
            if (this.activeFlag === this.value.length) {
              this.value.forEach((item, index) => {
                checkList[index] = this.renderList[index].find((i) => i[this.valueKey] === item);
              });
              if (JSON.stringify(checkList) === JSON.stringify(this.checkList)) return;
              this.checkList = checkList;
              this.text = this.checkList
                .filter((item) => item)
                .reduce((prev, item, index) => `${prev}${index ? this.separator : ''}${item[this.labelKey]}`, '');
              this.radioValue = this.value[this.value.length - 1];
              if (this.renderList[index].find((node) => node[this.valueKey] === item)?.leaf) {
                return;
              }
            }
            // if (!this.renderList[index + 1]) {
            //   this.renderList[index + 1] = this.addLevel(nodes, this.childrenKey, index + 1).map((i) => {
            //     i.pId = item[this.valueKey];
            //     return i;
            //   });
            // }
            // this.renderList = this.renderList.filter(
            //   (item, i) => i <= index + 1
            // );
            if (!this.renderList[this.renderList.length - 1].length) {
              this.renderList.pop();
            }
          });
        }
      });
    },
    vModel() {
      if (!this.config.lazy && this.value?.length) {
        this.vModelValue();
      } else if (this.config.lazy) {
        this.activeVmodelValue();
      }
    }
  }
};
</script>
