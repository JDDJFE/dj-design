<template>
  <div
    @click="onClick"
    @blur="onBlur"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    class="dj-cascader-main"
    :class="{ active: isActive || visible, disabled: disabled }"
  >
    <div class="dj-cascader-main-content">
      <input
        @click.stop="inputClick"
        v-if="searchable"
        v-model="searchValue"
        @blur="onBlur"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        class="dj-cascader-main-placeholder"
        aria-expanded="false"
        @input="onChange"
        :class="{disabled: disabled}"
        :title="searchValue"
      />
      <input
        v-else
        :value="value"
        @blur="onBlur"
        type="text"
        readonly="readonly"
        autocomplete="off"
        :placeholder="placeholder"
        class="dj-cascader-main-placeholder"
        aria-expanded="false"
        :class="{disabled: disabled}"
        :title="value"
      />
      <!-- <div class="dj-cascader-main-placeholder">
        {{ placeholder }}
      </div> -->
    </div>
    <div
      v-if="isClear && (value || searchValue)"
      @click.stop="onClear"
      class="dj-cascader-main-iconfont"
    >
      <dj-icon
        icon="close-solid"
        fontSize="16px"
        style="line-height: 20px"
      ></dj-icon>
      <!-- <i
          class="iconfont close-solid"
          @click.stop="handlerClearable"
          v-show="isClearable"
        ></i> -->
    </div>
    <div
      v-else
      class="dj-cascader-main-iconfont"
      :class="{ active: isActive || visible }"
    >
      <dj-icon icon="arrow-bottom" fontSize="20px"></dj-icon>
    </div>
  </div>
</template>

<script>
import debounce from '@/utils/debounce';

export default {
  name: '',
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '400px'
    },
    delayTime: {
      type: Number,
      default: 500
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false,
      isClear: false,
      searchValue: ''
    };
  },
  computed: {},
  watch: {
    searchable() {
      onChange();
    },
    value(v) {
      this.searchValue = v;
    },
    visible() {
      this.searchValue = this.value;
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onBlur() {
      this.isActive = false;
    },
    onMouseEnter() {
      if (this.clearable) {
        this.isClear = true;
      }
    },
    onMouseLeave() {
      if (this.clearable) {
        this.isClear = false;
      }
    },
    onClear() {
      this.isActive = false;
      this.searchValue = '';
      this.$emit('input', '');
    },
    onChange() {
      debounce(() => {
        this.$emit('onSearch', this.searchValue);
      }, this.delayTime)();
    },
    onClick() {
      if (this.disabled) return;
      if (this.visible) {
        this.isActive = false;
      } else {
        this.isActive = !this.isActive;
      }
    },
    inputClick() {
      this.$emit('update:visible', true);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
