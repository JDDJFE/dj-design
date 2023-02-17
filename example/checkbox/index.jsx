export default {
  title: 'Checkbox 多选框',
  describe: '一组备选项中进行多选',
  templates: [
    {
      title: '基础用法',
      template: '<dj-checkbox v-model="checked">桃子</dj-checkbox>{{checked}}',
      data: {
        data() {
          return {
            checked: 'true'
          };
        }
      }
    },
    {
      title: '禁用状态',
      template: `
        <dj-checkbox v-model="checked" disabled>桃子</dj-checkbox>
        <dj-checkbox disabled>橘子</dj-checkbox>`,
      data: {
        data() {
          return {
            checked: true
          };
        }
      }
    },

    {
      title: '多选框组',
      template: `
        <dj-checkbox-group v-model="checkList">
          <dj-checkbox code="1">桃子哟</dj-checkbox>
          <dj-checkbox code="橘子">橘子哟</dj-checkbox>
          <dj-checkbox code="哈密瓜">哈密瓜哟</dj-checkbox>
          <dj-checkbox code="葡萄">葡萄</dj-checkbox>
          <dj-checkbox code="樱桃" disabled>樱桃</dj-checkbox>
        </dj-checkbox-group>{{checkList}}`,
      data: {
        data() {
          return {
            checkList: [1, '橘子']
          };
        }
      }
    },
    {
      title: 'indeterminate 状态',
      template: `
        <dj-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</dj-checkbox>
        <dj-checkbox-group v-model="checkList" @change="handleCheckedAll">
          <dj-checkbox code="桃子">桃子</dj-checkbox>
          <dj-checkbox code="橘子">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜">哈密瓜</dj-checkbox>
          <dj-checkbox code="葡萄">葡萄</dj-checkbox>
          <dj-checkbox code="樱桃">樱桃</dj-checkbox>
        </dj-checkbox-group>`,
      data: {
        data() {
          return {
            cityOptions: ['桃子', '橘子', '哈密瓜', '葡萄', '樱桃'],
            checkAll: false,
            isIndeterminate: false,
            checkList: ['桃子', '橘子']
          };
        },
        created() {
          this.isIndeterminate = !!this.checkList.length;
        },
        methods: {
          handleCheckedAll(value) {
            console.log(value);
            let cityOptions = this.cityOptions.length,
              checkedCount = value.length;
            this.checkAll = checkedCount === cityOptions;
            this.isIndeterminate = checkedCount > 0 && checkedCount < cityOptions;
          },
          handleCheckAllChange(val) {
            this.checkList = val ? this.cityOptions : [];
            this.isIndeterminate = false;
          }
        }
      }
    },
    {
      title: '可选限制',
      template: `
        <dj-checkbox-group v-model="checkList" :maxlimit="2">
          <dj-checkbox code="桃子">桃子</dj-checkbox>
          <dj-checkbox code="橘子">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜">哈密瓜</dj-checkbox>
          <dj-checkbox code="葡萄">葡萄</dj-checkbox>
          <dj-checkbox code="樱桃">樱桃</dj-checkbox>
        </dj-checkbox-group>`,
      data: {
        data() {
          return {
            checkList: ['桃子']
          };
        }
      }
    },
    {
      title: '带有边框',
      template: `
        <dj-checkbox v-model="checked" border>桃子</dj-checkbox>
        <dj-checkbox v-model="checked" border disabled>橘子</dj-checkbox>
        <dj-checkbox border>哈密瓜</dj-checkbox>`,
      data: {
        data() {
          return {
            checked: true
          };
        }
      }
    },
    {
      title: '按钮多选框',
      template: `
        <dj-checkbox-group v-model="checkList" button @change="handleCheckedChange">
          <dj-checkbox code="桃子" disabled>桃子哟</dj-checkbox>
          <dj-checkbox code="橘子">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜">哈密瓜</dj-checkbox>
          <dj-checkbox code="葡萄" disabled>葡萄</dj-checkbox>
          <dj-checkbox code="樱桃" disabled>樱桃</dj-checkbox>
        </dj-checkbox-group>
        <div class="mb10"></div>
        <dj-checkbox-group v-model="checkList" button buttonStyle="outline" @change="handleCheckedChange">
          <dj-checkbox code="桃子" disabled>桃子哟</dj-checkbox>
          <dj-checkbox code="橘子">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜">哈密瓜</dj-checkbox>
          <dj-checkbox code="葡萄" disabled>葡萄</dj-checkbox>
          <dj-checkbox code="樱桃" disabled>樱桃</dj-checkbox>
        </dj-checkbox-group>
      `,
      data: {
        data() {
          return {
            checkList: ['桃子', '橘子']
          };
        },
        methods: {
          handleCheckedChange(val, name) {
            console.log(val, name);
          }
        }
      }
    },
    {
      title: '尺寸',
      template: `
        <dj-checkbox-group v-model="checkList" border>
          <dj-checkbox code="桃子" size="large">桃子</dj-checkbox>
          <dj-checkbox code="葡萄">葡萄</dj-checkbox>
          <dj-checkbox code="橘子" size="small">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜" size="mini">哈密瓜</dj-checkbox>
        </dj-checkbox-group>
        <br/><br/>
        <dj-checkbox-group v-model="checkList" button>
          <dj-checkbox code="桃子" size="large">桃子</dj-checkbox>
          <dj-checkbox code="葡萄">葡萄</dj-checkbox>
          <dj-checkbox code="橘子" size="small">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜" size="mini">哈密瓜</dj-checkbox>
        </dj-checkbox-group>
        <br/><br/>
        <dj-checkbox-group v-model="checkList" button>
          <dj-checkbox code="桃子" size="large">桃子</dj-checkbox>
          <dj-checkbox code="葡萄">葡萄</dj-checkbox>
          <dj-checkbox code="橘子" size="small">橘子</dj-checkbox>
          <dj-checkbox code="哈密瓜" size="mini">哈密瓜</dj-checkbox>
        </dj-checkbox-group>`,
      data: {
        data() {
          return {
            checkList: ['桃子']
          };
        }
      }
    },
    {
      title: '拓展属性',
      template: '<dj-checkbox :checked="checked">桃子</dj-checkbox>',
      data: {
        data() {
          return {
            checked: true
          };
        }
      }
    }
  ]
};
