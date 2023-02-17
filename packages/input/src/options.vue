<template>
  <div class="dj-options">
    <div class="menu-panel">
      <div v-if="search" class="item-search">
        <dj-input v-model="keyword" :placeholder="placeholder" style="width: 100%" icon="search2"/>
      </div>
      <ul v-if="getItems && getItems.length">
        <li v-for="(item, index) in getItems" :key="index" @click="onSelect(item)">
          <slot name="option" v-bind="item">
            {{ item[valueKey] }}
          </slot>
        </li>
      </ul>
      <div v-else class="empty-panel">{{nodata}}</div>
      <div class="arrow"></div>
    </div>
  </div>
</template>

<script>
// import '@/directive';
export default {
  name: 'djOptions',
  props: {
    value: [String, Number, Array],
    valueKey: {
      type: String,
      default: 'value'
    },
    funquery: Function,
    search: Boolean,
    multiple: Boolean,
    nodata: {
      type: String,
      default: '未匹配到数据'
    },
    placeholder: {
      type: String,
      deafult: 'search...'
    }
  },
  data() {
    return {
      keyword: '',
      items: [],
      timeout: null,
      oldValue: ''
    };
  },
  computed: {
    getItems() {
      if (!this.keyword) {
        return this.items;
      }
      return this.items.filter(item => item[this.valueKey].search(this.keyword) > -1);
    }
  },
  mounted() {
    this.onQuery();
  },
  watch: {
    // value: function(o, n) {
    //   this.onQuery();
    // }
  },
  methods: {
    onQuery() {
      if (this.value && this.value == this.oldValue) {
        return;
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.funquery && this.funquery(this.value, (list) => {
          this.oldValue = this.value;
          this.items = list;
        });
      }, 300);
    },
    onSelect(item) {
      this.$emit('input', item[this.valueKey]);
      this.$emit('select', item[this.valueKey], item);
    }
  }
};
</script>

