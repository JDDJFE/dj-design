export default {
  title: 'true 树形控件',
  templates: [
    {
      title: '基础用法',
      template: `<dj-tree v-model="treeData" :draggable="true" :checkMaxCount="1" @dragend="onSort" @expandChange="onExpand" @checkChange="onChecked">
        <template slot-scope="scope"><span :style="scope.node.disable ? 'color: #C7C9CC;' : ''">{{scope.node.label}}</span></template>
        <template slot="right" slot-scope="scope">
          <dj-popover content="上下拖动进行排序" trigger="hover">
            <dj-button icon="sort2" type="text" fontSize="20px" style="display: inline-flex;"></dj-button>
          </dj-popover>
          <dj-dropdown @change="(ex) => { handleCommand(ex, scope.node) }">
            <dj-button icon="more" type="text" fontSize="30px" style="display: inline-flex;"></dj-button>
            <dj-dropdown-menu>
              <dj-dropdown-item value="1" label="编辑"></dj-dropdown-item>
              <dj-dropdown-item value="2" label="创建二级分类"></dj-dropdown-item>
              <dj-dropdown-item value="3" label="禁用"></dj-dropdown-item>
              <dj-dropdown-item value="4" label="启用"></dj-dropdown-item>
              <dj-dropdown-item value="5" label="删除"></dj-dropdown-item>
            </dj-dropdown-menu>
          </dj-dropdown>
        </template>
      </dj-tree>`,
      data: {
        data() {
          return {
            treeData: [
              {
                id: 1,
                label: '节点1',
                children: [
                  { id: 101, label: '子节点1', disable: false },
                  { id: 102, label: '子节点2', disable: true },
                  {
                    id: 103,
                    label: '子节点3',
                    disable: true,
                    children: [
                      { id: 10301, label: '子节点3-1' },
                      { id: 10302, label: '子节点3-2' },
                      { id: 10303, label: '子节点3-3', disable: true }
                    ]
                  }
                ]
              }
            ]
          };
        },
        methods: {
          onSort(list, level) {
            console.log('sort---', list, level);
          },
          onExpand(expand, node, level) {
            console.log('expand---', expand, node, level);
          },
          onChecked(checked, node, level) {
            console.log('checked---', checked, node, level);
          },
          handleCommand() {

          }
        }
      }
    },
    {
      title: '禁用状态',
      template: `<dj-tree v-model="treeData" :draggable="true" :checkMaxCount="1">
        <template slot="right" slot-scope="scope">
          <dj-popover content="上下拖动进行排序" trigger="hover">
            <dj-button icon="sort2" type="text" fontSize="20px" style="display: inline-flex;"></dj-button>
          </dj-popover>
          <dj-dropdown @change="handleCommand">
            <dj-button icon="more" type="text" fontSize="30px" style="display: inline-flex;"></dj-button>
            <dj-dropdown-menu>
              <dj-dropdown-item value="1" label="编辑"></dj-dropdown-item>
              <dj-dropdown-item value="2" label="创建二级分类"></dj-dropdown-item>
              <dj-dropdown-item value="3" label="禁用"></dj-dropdown-item>
              <dj-dropdown-item value="4" label="启用"></dj-dropdown-item>
              <dj-dropdown-item value="5" label="删除"></dj-dropdown-item>
            </dj-dropdown-menu>
          </dj-dropdown>
        </template>
      </dj-tree>`,
      data: {
        data() {
          return {
            treeData: [
              {
                id: 1,
                label: '节点1',
                children: [
                  { id: 101, label: '子节点1', disabled: false },
                  { id: 102, label: '子节点2', disabled: true },
                  {
                    id: 103,
                    label: '子节点3',
                    disabled: true,
                    children: [
                      { id: 10301, label: '子节点3-1' },
                      { id: 10302, label: '子节点3-2' },
                      { id: 10303, label: '子节点3-3', disabled: true }
                    ]
                  }
                ]
              }
            ]
          };
        },
        methods: {
          handleCommand() {

          }
        }
      }
    },

    {
      title: '不允许拖拽节点',
      template: `<dj-tree v-model="treeData" :draggable="true" :checkMaxCount="1" @dragend="onSort" @expandChange="onExpand" @checkChange="onChecked" :dragDisable="[101,10303]">
        <template slot-scope="scope"><span :style="scope.node.disable ? 'color: #C7C9CC;' : ''">{{scope.node.label}}</span></template>
        <template slot="right" slot-scope="scope">
          <dj-popover content="上下拖动进行排序" trigger="hover">
            <dj-button icon="sort2" type="text" fontSize="20px" style="display: inline-flex;"></dj-button>
          </dj-popover>
          <dj-dropdown @change="(ex) => { handleCommand(ex, scope.node) }">
            <dj-button icon="more" type="text" fontSize="30px" style="display: inline-flex;"></dj-button>
            <dj-dropdown-menu>
              <dj-dropdown-item value="1" label="编辑"></dj-dropdown-item>
              <dj-dropdown-item value="2" label="创建二级分类"></dj-dropdown-item>
              <dj-dropdown-item value="3" label="禁用"></dj-dropdown-item>
              <dj-dropdown-item value="4" label="启用"></dj-dropdown-item>
              <dj-dropdown-item value="5" label="删除"></dj-dropdown-item>
            </dj-dropdown-menu>
          </dj-dropdown>
        </template>
      </dj-tree>`,
      data: {
        data() {
          return {
            treeData: [
              {
                id: 1,
                label: '时令果蔬（34）',
                children: [
                  { id: 101, label: '蔬菜（15）' },
                  { id: 102, label: '水果（5）' },
                  {
                    id: 103,
                    label: '子节点3',
                    children: [
                      { id: 10301, label: '子节点3-1' },
                      { id: 10302, label: '子节点3-2' },
                      { id: 10303, label: '子节点3-3' }
                    ]
                  }
                ]
              }
            ]
          };
        },
        methods: {
          onSort(list, level) {
            console.log('sort---', list, level);
          },
          onExpand(expand, node, level) {
            console.log('expand---', expand, node, level);
          },
          onChecked(checked, node, level) {
            console.log('checked---', checked, node, level);
          },
          handleCommand() {

          }
        }
      }
    }
  ]
};
