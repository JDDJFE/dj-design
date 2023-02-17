export default {
  title: 'Popover气泡卡片',
  templates: [
    {
      title: '基础用法',
      template: `<dj-popover title="标题" content="这是一段内容" trigger="hover">
        <dj-button style="margin-right: 10px">hover 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题" content="这是一段内容" trigger="click">
        <dj-button style="margin-right: 10px">click 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题" content="这是一段内容" trigger="focus">
        <dj-button style="margin-right: 10px">focus 激活</dj-button>
      </dj-popover>`
    },
    {
      title: '插入到body',
      template: `<dj-popover title="标题" content="这是一段内容 hover" trigger="hover" appendToBody>
        <dj-button style="margin-right: 10px">hover 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题" content="这是一段内容 click" trigger="click" appendToBody className="aaaa">
        <dj-button style="margin-right: 10px">click 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题" content="这是一段内容 focus" trigger="focus" appendToBody>
        <dj-button style="margin-right: 10px">focus 激活</dj-button>
      </dj-popover>`
    },
    {
      title: '位置',
      template: `
        <div>
          <div :style="{marginLeft: 105 + 'px', whiteSpace: 'nowrap' }">
            <dj-popover placement="topLeft" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-left: 8px;">topLeft</dj-button>
            </dj-popover>
            <dj-popover placement="top" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-left: 8px;">top</dj-button>
            </dj-popover>
            <dj-popover placement="topRight" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-left: 8px;">topRight</dj-button>
            </dj-popover>
          </div>
          <div :style="{width: 105 + 'px', float: 'left'}">
            <dj-popover placement="leftTop" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-top: 8px;">leftTop</dj-button>
            </dj-popover>
            <dj-popover placement="left" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-top: 8px;">left</dj-button>
            </dj-popover>
            <dj-popover placement="leftBottom" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-top: 8px;">leftBottom</dj-button>
            </dj-popover>
          </div>
          <div :style="{width: 105 + 'px', marginLeft: 105 * 4 + 32 +'px'}">
            <dj-popover placement="rightTop" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-top: 8px;">rightTop</dj-button>
            </dj-popover>
            <dj-popover placement="right" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-top: 8px;">right</dj-button>
            </dj-popover>
            <dj-popover placement="rightBottom" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-top: 8px;">rightBottom</dj-button>
            </dj-popover>
          </div>
          <div :style="{marginLeft: 105 + 'px', clear: 'both', whiteSpace: 'nowrap' }">
            <dj-popover placement="bottomLeft" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-left: 8px;">bottomLeft</dj-button>
            </dj-popover>
            <dj-popover placement="bottom" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-left: 8px;">bottom</dj-button>
            </dj-popover>
            <dj-popover placement="bottomRight" :title="title" :content="content" trigger="click" width="200">
              <dj-button style="width: 105px; margin-left: 8px;">bottomRight</dj-button>
            </dj-popover>
          </div>
        </div>`,
      data: {
        data() {
          return {
            title: '标题',
            content: '这是一段内容,这是一段内容,这是一段内容。'
          };
        }
      }
    },
    {
      title: '嵌套信息',
      template: `
        <dj-popover width="auto" placement="top" trigger="click" appendToBody>
          <div slot="content" style="font-size: 0;">
            <dj-tag class="mr10" type="success">success</dj-tag>
            <dj-tag class="mr10" type="processing">processing</dj-tag>
            <dj-tag class="mr10" type="error">error</dj-tag>
            <dj-tag class="mr10" type="warning">warning</dj-tag>
            <dj-tag type="default">default</dj-tag>
          </div>
          <dj-button>click 激活</dj-button>
        </dj-popover>
     `
    },
    /* {
      title: '嵌套信息',
      template: `
<div style="width: 700px;height: 300px;overflow: auto">
<div style="height: 1500px;width: 3000px">
<div style="height: 500px"></div>
      <dj-popover title="标题 标题标题标题标题标题标题标题标题标题标题标题标题" content="这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容
" trigger="click" placement="left" appendToBody>
        <dj-button style="margin-right: 10px">click 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题 " content="这是一段内容这是一段内容" trigger="click" placement="left" appendToBody>
        <dj-button  style="margin-right: 10px">click 激活</dj-button>
      </dj-popover>
      <div style="float: right;margin-right: 1500px">
       <dj-popover width="auto" placement="top" trigger="click" appendToBody>
<!--       <div>-->
        <div slot="content" style="font-size: 0;background: pink">
          <dj-tag class="mr10" type="success">success</dj-tag>
          <dj-tag class="mr10" type="processing">processing</dj-tag>
          <dj-tag class="mr10" type="error">error</dj-tag>
          <dj-tag class="mr10" type="warning">warning</dj-tag>
          <dj-tag type="default">default</dj-tag>
        </div>
<!--      </div>-->
      <dj-button>click 激活</dj-button>
    </dj-popover>
</div>
</div>
</div>
     `
    },*/
    {
      title: '嵌套操作',
      template: `
        <dj-popover :visible.sync="visible" trigger="click">
          <div slot="content">
            <p style="padding: 4px 0 12px;">确定删除该任务吗？</p>
            <div style="text-align: right; margin: 0">
              <dj-button size="mini" @click="close"
                         style="height: 24px;padding: 0 7px;font-size: 12px;margin-right: 8px;">
                取消
              </dj-button>
              <dj-button type="primary" size="mini" @click="close" style="height: 24px;padding: 0 7px;font-size: 12px;">
                确定
              </dj-button>
            </div>
          </div>
          <dj-button>click 激活</dj-button>
        </dj-popover>
      `,
      data: {
        data() {
          return {
            visible: false
          };
        },
        methods: {
          close(e) {
            e.stopPropagation();
            this.visible = false;
          }
        }
      }
    },
    {
      title: 'hover状态下的延迟显示与隐藏',
      template: `<dj-popover
      :openDelay="500"
      :closeDelay="500"
      title="标题"
      content="这是一段内容"
      width="150" trigger="hover" placement="top">
      <dj-button>hover 激活</dj-button>
    </dj-popover>`
    },
    {
      title: '禁用状态',
      template: `<dj-popover
      disabled
      title="标题"
      content="这是一段内容"
      width="150" trigger="click" placement="topRight">
      <dj-button>click 禁用状态</dj-button>
    </dj-popover>`
    }
  ]
};
