export default {
  title: 'Radio 单选框',
  describe: '在一组备选项中进行单选',
  templates: [
    {
      title: '基础用法',
      template: `
        <dj-radio size="mini" v-model="radio" :code="false">可乐</dj-radio>
        <dj-radio v-model="radio" :code="true">雪碧</dj-radio>`,
      data: {
        data() {
          return {
            radio: false
          };
        }
      }
    },
    {
      title: '禁用状态',
      template: `
        <dj-radio v-model="radio" code="1" disabled>可乐</dj-radio>
        <dj-radio v-model="radio" code="2" disabled>雪碧</dj-radio>`,
      data: {
        data() {
          return {
            radio: '1'
          };
        }
      }
    },
    {
      title: '嵌套标签',
      template: `
        <dj-radio-group v-model="radio" size="mini">
          <dj-radio code="1" :disabled="true">可乐</dj-radio>
          <dj-radio code="2">雪碧</dj-radio>
          <dj-radio code="3">美年达</dj-radio>
          <dj-radio code="4">北冰洋</dj-radio>
        </dj-radio-group>{{radio}}`,
      data: {
        data() {
          return {
            radio: 1
          };
        }
      }
    },
    {
      title: '边框单选',
      template: `
        <dj-radio border v-model="radio" code="1">可乐</dj-radio>
        <dj-radio border v-model="radio" code="2">雪碧</dj-radio>`,
      data: {
        data() {
          return {
            radio: '1'
          };
        }
      }
    },
    {
      title: '按钮单选',
      template: `
        <dj-radio-group v-model="radio" button>
          <dj-radio code="1">可乐</dj-radio>
          <dj-radio code="2">雪碧</dj-radio>
          <dj-radio code="3">美年达</dj-radio>
          <dj-radio code="4">北冰洋</dj-radio>
        </dj-radio-group>
        <div class="mb10"/>
        <dj-radio-group v-model="radio" button buttonStyle="outline">
          <dj-radio code="1">可乐</dj-radio>
          <dj-radio code="2">雪碧</dj-radio>
          <dj-radio code="3">美年达</dj-radio>
          <dj-radio code="4">北冰洋</dj-radio>
        </dj-radio-group>`,
      data: {
        data() {
          return {
            radio: '1'
          };
        }
      }
    },
    {
      title: '尺寸',
      template: `
        <dj-radio-group v-model="radio" border>
          <dj-radio code="1" size="large">可乐</dj-radio>
          <dj-radio code="2">雪碧</dj-radio>
          <dj-radio code="3" size="small">美年达</dj-radio>
          <dj-radio code="4" size="mini">北冰洋</dj-radio>
        </dj-radio-group>
        <br/><br/>
        <dj-radio-group v-model="radio" button>
          <dj-radio code="1" size="large">可乐</dj-radio>
          <dj-radio code="2">雪碧</dj-radio>
          <dj-radio code="3" size="small">美年达</dj-radio>
          <dj-radio code="4" size="mini">北冰洋</dj-radio>
        </dj-radio-group>`,
      data: {
        data() {
          return {
            radio: '1'
          };
        }
      }
    }
  ]
};
