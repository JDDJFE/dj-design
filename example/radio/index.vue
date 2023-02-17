<template>
  <div>
    <h2>基础用法</h2>{{radio}}
    <dj-radio v-model="radio" code="1" @change="handleCheckedAll">可乐</dj-radio>
    <dj-radio v-model="radio" code="2" @change="handleCheckedAll">雪碧</dj-radio>
    <br/>
    <br/>
    <br/>
    <h2>禁用状态</h2>
    <dj-radio v-model="radio" code="1" disabled>备选项</dj-radio>
    <dj-radio v-model="radio" code="2" disabled>备选项</dj-radio>
    <br/>
    <br/>
    <h2>边框单选</h2>
    <dj-radio border  v-model="radio" code="1">备选项</dj-radio>
    <dj-radio border v-model="radio" code="2">备选项</dj-radio>
    <br/>
    <br/>
    <h2>按钮单选</h2>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" button>
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <br/>
    <br/>
    <h2>大小</h2>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" button size="large">
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" button>
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" button size="small">
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" button size="mini">
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <br/>
    <br/>
    <h2>大小</h2>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" border size="large">
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" border>
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" border size="small">
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <dj-radio-group v-model="radio" @change="handleCheckedAll" border size="mini">
      <dj-radio code="1">可乐</dj-radio>
      <dj-radio code="2">雪碧</dj-radio>
      <dj-radio code="3">美年达</dj-radio>
      <dj-radio code="4">北冰洋</dj-radio>
    </dj-radio-group>
    <br/>
    <br/>
    <dj-radio-group v-model="radio2" @change="handleCheckedAll">{{radio2}}
      <dj-radio :code="3">备选项3</dj-radio>
      <dj-radio :code="6">备选项6</dj-radio>
      <dj-radio :code="9">备选项9</dj-radio>
    </dj-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
      radio2: 3
    };
  },
  methods: {
    handleCheckedAll(val, name){
      console.log(val, name);
    }
  }
};
</script>

<style>

</style>
