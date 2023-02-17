<template>
    <div id="dj-leftAside">
      <ul>
        <li class="f20 dj-tit">开发指南</li>
        <li :class="{isActive:curPath==''}" @click="chooseLeft('use')">使用说明</li>
        <li :class="{isActive:curPath=='edition'}" @click="chooseLeft('edition')">更新日志</li>
      </ul>

      <ul style="padding-bottom:50px">
        <li
          v-for="(item, key, index) in menuDate"
          :key="index"
          class="dj-tit"
        >
        {{item.name}}
          <ul>
            <li
              v-for="(value, i) in item.menu"
              :key="value+i"
              :class="{isActive:curPath==item.path}"
              @click="chooseLeft(value.path)"
            >{{value.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data(){
    return {
      curPath: '',
      menuDate: [
        {
          name: '基础',
          menu: [
            {
              name: 'Icon 图标',
              path: 'icon'
            },{
              name: 'Grid 栅格',
              path: 'grid'
            },{
              name: 'Button 按钮',
              path: 'button'
            },{
              name: 'Link 文字链接',
              path: 'link'
            }
          ]
        },{
          name: '表单',
          menu: [
            {
              name: 'Input 输入框',
              path: 'input'
            },{
              name: 'Textarea 文本域',
              path: 'textarea'
            },{
              name: 'Radio 单选框',
              path: 'radio'
            },{
              name: 'Checkbox 多选框',
              path: 'checkbox'
            },{
              name: 'Form 表单',
              path: 'form'
            },{
              name: 'Select 选择器',
              path: 'select'
            },{
              name: 'Cascader 级联选择器',
              path: 'cascader'
            },{
              name: 'Upload 上传',
              path: 'upload'
            },{
              name: 'DatePicker 日期选择器',
              path: 'datePicker'
            },
            // {
            //   name: 'TimePicker 时间选择器',
            //   path: 'timePicker'
            // },
            {
              name: 'Switch 开关',
              path: 'switch'
            },{
              name: 'ColorPicker 颜色选择器',
              path: 'colorPicker'
            },{
              name: 'Editor 富文本编辑器',
              path: 'editor'
            }
          ]
        },{
          name: '数据展示',
          menu: [
            {
              name: 'Table 表格',
              path: 'table'
            },{
              name: 'tree 树形控件',
              path: 'tree'
            },{
              name: 'Tag 标签',
              path: 'tag'
            },{
              name: 'Badge 标记',
              path: 'badge'
            },{
              name: 'Json编辑器',
              path: 'json'
            },{
              name: 'Image 图片',
              path: 'image'
            },{
              name: 'Progress 进度条',
              path: 'progress'
            },{
              name: 'Collapse 折叠面板',
              path: 'collapse'
            }
          ]
        },{
          name: '通知',
          menu: [
            {
              name: 'Message 消息提示',
              path: 'message'
            },{
              name: 'MessageBox 弹框',
              path: 'messageBox'
            },{
              name: 'Modal 对话框',
              path: 'modal'
            },{
              name: 'Popover 弹出框',
              path: 'popover'
            },{
              name: 'Alert警告提示',
              path: 'alert'
            }
          ]
        },{
          name: '导航',
          menu: [
            {
              name: 'Tabs 页签',
              path: 'tabs'
            },{
              name: 'Breadcrumb 面包屑',
              path: 'breadcrumb'
            },{
              name: 'Steps 步骤条',
              path: 'steps'
            },{
              name: 'Pagination 分页',
              path: 'pagination'
            },{
              name: 'Dropdown 下拉菜单',
              path: 'dropdown'
            }
          ]
        }
      ]
    };
  },
  components: {
  },
  methods: {
    chooseLeft(n){
      this.curPath=n;
      this.$router.push('/components/'+n);
    }
  },
  mounted(){
    let path=window.location.pathname.split('/')[1];
    this.curPath=path;
  }
};
</script>
<style lang="less" scoped>
#dj-leftAside{
  /*display: none;*/
  background: #fff;
  color:#455a64;
  position: fixed;
  top: 70px;
  bottom:0;
  width:200px;
  padding-top:20px;
  border-right: 1px solid #f1f4f8;
  height: calc(100% - 70px);
  overflow-y: auto;
  z-index: 1;
  li{
    line-height: 40px;
    cursor: pointer;
    font-size: 14px;
    text-align: left;
    &:hover{
      color:#008DFF
    }
  }
  .isActive{
    color:#008DFF
  }
  .dj-tit:hover{
    color:inherit
  }
  .dj-tit{
    font-size: 20px;
    color:#6A797E;
    font-size:300;
    text-shadow: 0 0 0.5px #6A797E;
    padding:10px 0
  }
}

</style>
