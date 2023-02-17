<template>
    <div id="icon">
        <p class=" f30 mb20">select 选择器</p>
        <dj-button @click="fn">按钮</dj-button><br/>
        <dj-button @click="fn2">按钮2</dj-button><br/>
        <h2>基础用法</h2>
        <dj-select v-model="value1" @change="changeOption" bordered width="100px">
          <dj-option
            v-for="item in num"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value1}}
        <br>
        <br>
        <h2>有禁用选项</h2>
        <dj-select v-model="value1">
          <dj-option
            v-for="item in num"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value1}}
        <br>
        <br>
        <h2>禁用状态</h2>
         <dj-select v-model="value2" disabled>
            <dj-option value="11" label="按时打算"></dj-option>
            <dj-option value="22" label="2"></dj-option>
            <dj-option value="33" label="3" ></dj-option>
            <dj-option value="44" label="4"></dj-option>
            <dj-option value="55" label="5"></dj-option>
            <dj-option value="66" label="6"></dj-option>
            <dj-option value="00" label="0"></dj-option>
        </dj-select>
        <br>
        <br>
        <h2>可搜索</h2>
         <dj-select v-model="value2" searchable>
            <dj-option value="11" label="按时打算"></dj-option>
            <dj-option value="22" label="2"></dj-option>
            <dj-option value="33" label="3" ></dj-option>
            <dj-option value="44" label="4"></dj-option>
            <dj-option value="55" label="5"></dj-option>
            <dj-option value="66" label="6"></dj-option>
            <dj-option value="00" label="0"></dj-option>
        </dj-select>
        <br>
        <br>
        <h2>可清空单选</h2>
        <dj-select v-model="value4" clearable>
          <dj-option
            v-for="item in options"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value4}}
        <br>
        <br>
        <h2>基础多选</h2>
        <dj-select v-model="value4" multiple searchable clearable >
          <dj-option
            v-for="item in options"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value4}}
        <br>
        <br>
        <h2>集合多选</h2>
        <dj-select v-model="value4" searchable multiple collapse clearable>
          <dj-option
            v-for="item in options"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value4}}
        <br>
        <br>
        <h2>可选项目数量的限制</h2>
        <dj-select v-model="value4" searchable multiple collapse clearable :limit="2">
          <dj-option
            v-for="item in options"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value4}}
        <br>
        <br>
        <h2>已选隐藏</h2>
        <dj-select v-model="value4" searchable multiple collapse clearable checkhide>
          <dj-option
            v-for="item in options"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.labels"
            :value="item.value">
          </dj-option>
        </dj-select>{{value4}}
        <br>
        <br>
        <h2>自定义模版</h2>
        <dj-select v-model="value" placeholder="请选择">
          <dj-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </dj-option>
        </dj-select>{{value7}}
        <br>
        <br>
        <h2>模块分组</h2>
        <dj-select v-model="valueg" placeholder="请选择" searchable multiple>
          <dj-option label="全部" value="quanbu"></dj-option>
          <dj-option-group key="热门城市" label="热门城市">
            <dj-option label="上海" value="Shanghai"></dj-option>
            <dj-option label="北京" value="Beijing"></dj-option>
          </dj-option-group>
          <dj-option-group key="城市名" label="城市名">
            <dj-option label="成都" value="Chengdu"></dj-option>
            <dj-option label="深圳" value="Shenzhen"></dj-option>
            <dj-option label="广州" value="guangzhou"></dj-option>
            <dj-option label="四川"   value="sichuan"></dj-option>
          </dj-option-group>
        </dj-select>{{valueg}}
        <br>
        <br><br>
        <br>
        <div class="markdown-body">
            <doc></doc>
        </div>

    </div>
</template>

<script >
import doc from '../../docs/select.md';
export default {
  components: {
    doc
  },
  data(){
    return {
      valueg: ['quanbu'],
      value3: '选项1',
      value4: ['选项3','选项1'],
      value: '22',
      value1: 1,
      value2: '22',
      value7: '',
      num: [
        {
          value: 0,
          labels: 'aaa',
          disabled: true
        }, {
          value: 1,
          labels: 'bbb'
        }, {
          value: 3,
          labels: 'ppp'
        }, {
          value: 2,
          labels: 'ccc'
        }
      ],
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      options: [
        {
          value: '选项1',
          labels: '黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕'
        }, {
          value: '选项2',
          labels: '双皮奶'
        }, {
          value: '选项3',
          labels: '蚵仔煎'
        }, {
          value: '选项4',
          labels: '龙须面'
        },
        {
          value: '选项5',
          labels: '北京烤鸭'
        },
        {
          value: '选项6',
          labels: '黄金糕2'
        }
      ]
    };
  },
  created(){
  },
  methods: {
    fn() {
      this.value4 = ['选项5','选项6'];
    },
    fn2() {
      this.valueg = ['Shenzhen','Chengdu'];
      this.value3 = '2';
      this.options = this.num;
      this.value4 = [1,3];
    },
    changeOption(val, obj){
      console.log('ssss',val);
    }
  }
};
</script>
