<template>
  <div>
    <p class=" f30 mb20">Tabs 标签页</p>
    <p class="mb10">分隔内容上有关联但属于不同类别的数据集合。</p><br/>
    <dj-tab v-model="activeTab2" @tab-change="tabChange">
      <dj-tab-pane label="用户管理" name="1" icon='home'></dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2"></dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3"></dj-tab-pane>
    </dj-tab>
    <br/>
    <dj-tab v-model="activeTab3" type="card" @tab-change="tabChange">
      <dj-tab-pane label="用户管理" name="1" icon='home'>用户管理</dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2">配置管理</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3">角色管理</dj-tab-pane>
    </dj-tab>
    <br/>
    <dj-tab v-model="activeTab1" type="fillet" @tab-change="tabChange">
      <dj-tab-pane label="用户管理" name="1">用户管理</dj-tab-pane>
      <dj-tab-pane label="配置管理" name="4">配置管理</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3">角色管理</dj-tab-pane>
    </dj-tab>
    <br/>
    <dj-tab v-model="activeTab3" type="square" @tab-change="tabChange">
      <dj-tab-pane label="用户管理" name="1" icon='home'>用户管理</dj-tab-pane>
      <dj-tab-pane label="配置管理" name="2">配置管理</dj-tab-pane>
      <dj-tab-pane label="角色管理" name="3">角色管理</dj-tab-pane>
    </dj-tab>
    <br/>
    <br/>
    <div class="markdown-body">
        <doc></doc>
    </div>
  </div>
</template>

<script>
import doc from '../../docs/tabs.md';
export default {
  data() {
    return {
      activeTab1: '4',
      activeTab2: '3',
      activeTab3: '1'
    };
  },
  components: {
    doc
  },
  created() {
  },
  methods: {
    tabChange(v, c) {
      console.log(v, c);
    }
  }
};
</script>
