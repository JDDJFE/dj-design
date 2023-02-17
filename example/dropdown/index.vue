<template>
  <div>
    <h2>基础用法</h2>
    <dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index"  :value="item.value" :label="item.label"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <h2>禁用状态</h2>
    <dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index" :disabled="item.disabled"  :value="item.value" :label="item.label"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <h2>添加icon</h2>
    <dj-dropdown>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index" :icon="item.icon" :value="item.value" :label="item.label"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <h2>字段换行</h2>
    <dj-dropdown wordBreak>
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index" :value="item.value" :label="item.label">我要换行了</dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <h2>触发方式click</h2>
    <dj-dropdown trigger="click">
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index" :value="item.value" :label="item.label"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <h2>事件回调</h2>
    <dj-dropdown @change="handleCommand">
      <dj-button type="text">下拉菜单<i class="iconfont arrow-bottom"></i></dj-button>
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index" :value="item.value" :label="item.label"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <h2>触发对象</h2>
    <dj-dropdown splitButton="更多菜单" splitType="success" @splitChange="splitClick">
      <dj-dropdown-menu v-model="value">
        <dj-dropdown-item v-for="(item, index) in dropdowns" :key="index" :value="item.value" :label="item.label"></dj-dropdown-item>
      </dj-dropdown-menu>
    </dj-dropdown>
    <br/>
    <br/>
    <br/>
    <div class="markdown-body">
      <doc></doc>
    </div>
  </div>
</template>

<script>
import doc from '../../docs/dropdown.md';
export default {
  data() {
    return {
      value: 1,
      checkList: [1, 2],
      dropdowns: [
        {
          value: 1,
          label: '黄金糕',
          icon: 'user1',
          disabled: true
        },
        {
          value: 2,
          label: '狮子头',
          icon: 'home'
        },
        {
          value: 3,
          label: '双皮奶',
          icon: 'enclosure'
        },
        {
          value: 4,
          label: '蚵仔煎',
          icon: 'screen'
        }
      ]
    };
  },
  components: {
    doc
  },
  created(){
  },
  methods: {
    handleCommand(val, el){
      alert(`value:${val},elemnt:${JSON.stringify(el)}`);
    },
    handleCheckedCitiesChange(val) {
      // console.log(val);
    },
    splitClick() {
      alert('我是button');
    }
  }
};
</script>

<style>

</style>
