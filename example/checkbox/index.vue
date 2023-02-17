<template>
  <div>
    <h2>基础用法</h2>
    <dj-checkbox v-model="checked2">wang2</dj-checkbox>
    <br/>
    <br/>
    <br/>
    <h2>禁用状态</h2>
    <dj-checkbox v-model="checked2" disabled>wang2</dj-checkbox>
    <dj-checkbox disabled>wang2</dj-checkbox>
    <br/>
    <br/>
    <br/>
    <h2>indeterminate 状态</h2>
    <dj-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</dj-checkbox>
    <dj-checkbox-group v-model="checkList" @change="handleCheckedAll">
      <dj-checkbox label="桃子">平谷</dj-checkbox>
      <dj-checkbox label="橘子"></dj-checkbox>
      <dj-checkbox label="哈密瓜"></dj-checkbox>
      <dj-checkbox label="葡萄"></dj-checkbox>
      <dj-checkbox label="樱桃"></dj-checkbox>
    </dj-checkbox-group>
    <br/>
    <br/>
    <br/>
    <h2>多选框组</h2>
    <dj-checkbox-group v-model="checkList" button @change="handleCheckedChange">
      <dj-checkbox label="桃子">平谷</dj-checkbox>
      <dj-checkbox label="橘子" :labelShow="false"> 11</dj-checkbox>
      <dj-checkbox label="哈密瓜"></dj-checkbox>
      <dj-checkbox label="禁用-葡萄" disabled></dj-checkbox>
      <dj-checkbox label="选中-樱桃" disabled></dj-checkbox>
    </dj-checkbox-group><br/>
    <br/>
    <br/>
    <h2>可选项目数量的限制</h2>
    <dj-checkbox-group
      v-model="checkList"
      @change="handleCheckedChange"
      :limit="2">
      <dj-checkbox label="桃子">平谷</dj-checkbox>
      <dj-checkbox label="橘子"></dj-checkbox>
      <dj-checkbox label="哈密瓜"></dj-checkbox>
      <dj-checkbox label="禁用-葡萄"></dj-checkbox>
      <dj-checkbox label="选中-樱桃"></dj-checkbox>
    </dj-checkbox-group>
    <br/>
    <br/>
    <br/>
    <h2>:checked属性</h2>
    <dj-checkbox :checked="checked3" @change="handleCheckedChange">wang3</dj-checkbox>
    <br/>
    <br/>
    <br/>
    <h2>带有边框</h2>
    <dj-checkbox v-model="checked2" border>wang2</dj-checkbox>
    <dj-checkbox v-model="checked2" border disabled>wang2</dj-checkbox>
    <dj-checkbox border>wang2</dj-checkbox>
    <br/>
    <br/>
    <div class="markdown-body">
      <doc></doc>
    </div>
  </div>
</template>

<script>

import doc from '../../docs/checkbox.md';
const cityOptions = ['桃子', '橘子', '哈密瓜', '葡萄', '樱桃'];
export default {
  data() {
    return {
      checkList: ['桃子', '橘子'],
      checked1: true,
      checked2: true,
      checked3: false,
      checkAll: false,
      wholedata: cityOptions,
      isIndeterminate: false
    };
  },
  components: {
    doc
  },
  created() {
    this.isIndeterminate = !!this.checkList.length;
  },
  methods: {
    handleCheckedAll(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === cityOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < cityOptions.length;
    },
    handleCheckedChange(val) {
      console.log(val);
    },
    handleCheckAllChange(val) {
      this.checkList = val ? cityOptions : [];
      this.isIndeterminate = false;
    }
  },
  watch: {
  }
};
</script>

<style>

</style>
