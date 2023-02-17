<template>
  <div>
    <p class=" f30 mb20">Popover气泡卡片</p>
    <p class="mb10"></p><br/>
    <h4 class="mb10">基础用法</h4>
    <div class="mb30">
      <dj-popover title="标题" content="这是一段内容" trigger="hover">
        <dj-button slot="reference" style="margin-right: 10px">hover 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题" content="这是一段内容" trigger="click">
        <dj-button slot="reference" style="margin-right: 10px">click 激活</dj-button>
      </dj-popover>
      <dj-popover title="标题" content="这是一段内容" trigger="focus">
        <dj-button slot="reference" style="margin-right: 10px">focus 激活</dj-button>
      </dj-popover>
    </div>
    <h4 class="mb10">位置</h4>
    <div class="demo mb30">
      <div :style="{marginLeft: 105 + 'px', whiteSpace: 'nowrap' }">
        <dj-popover placement="topLeft" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-left: 8px;">topLeft</dj-button>
        </dj-popover>
        <dj-popover placement="top" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-left: 8px;">top</dj-button>
        </dj-popover>
        <dj-popover placement="topRight" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-left: 8px;">topRight</dj-button>
        </dj-popover>
      </div>
      <div :style="{width: 105 + 'px', float: 'left'}">
        <dj-popover placement="leftTop" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-top: 8px;">leftTop</dj-button>
        </dj-popover>
        <dj-popover placement="left" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-top: 8px;">left</dj-button>
        </dj-popover>
        <dj-popover placement="leftBottom" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-top: 8px;">leftBottom</dj-button>
        </dj-popover>
      </div>
      <div :style="{ width: 105 + 'px', marginLeft: 105 * 4 + 24 +'px'}">
        <dj-popover placement="rightTop" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-top: 8px;">rightTop</dj-button>
        </dj-popover>
        <dj-popover placement="right" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-top: 8px;">right</dj-button>
        </dj-popover>
        <dj-popover placement="rightBottom" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-top: 8px;">rightBottom</dj-button>
        </dj-popover>
      </div>
      <div :style="{ marginLeft: 105 + 'px', clear: 'both', whiteSpace: 'nowrap' }">
        <dj-popover placement="bottomLeft" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-left: 8px;">bottomLeft</dj-button>
        </dj-popover>
        <dj-popover placement="bottom" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-left: 8px;">bottom</dj-button>
        </dj-popover>
        <dj-popover placement="bottomRight" :title="title" :content="content" trigger="click" width="200">
          <dj-button slot="reference" style="width: 105px; margin-left: 8px;">bottomRight</dj-button>
        </dj-popover>
      </div>
    </div>
    <div class="mb30"></div>
    <h4 class="mb10">嵌套信息</h4>
    <dj-popover width="auto" placement="right">
      <dj-tag class="mr10" type="success">success</dj-tag>
      <dj-tag class="mr10" type="processing">processing</dj-tag>
      <dj-tag class="mr10" type="error">error</dj-tag>
      <dj-tag class="mr10" type="warning">warning</dj-tag>
      <dj-tag type="default">default</dj-tag>
      <dj-button slot="reference">click 激活</dj-button>
    </dj-popover>
    <div class="mb30"></div>
    <h4 class="mb10">嵌套操作</h4>
    <dj-popover :visible.sync="visible">
      <p style="padding: 4px 0 12px;">确定删除该任务吗？</p>
      <div style="text-align: right; margin: 0">
        <dj-button size="mini" @click="close" style="height: 24px;padding: 0 7px;font-size: 12px;margin-right: 8px;">
          取消
        </dj-button>
        <dj-button type="primary" size="mini" @click="close" style="height: 24px;padding: 0 7px;font-size: 12px;">
          确定
        </dj-button>
      </div>
      <dj-button slot="reference">click 激活</dj-button>
    </dj-popover>
    <div class="mb30"></div>
    <h4 class="mb10">hover状态下的延迟显示与隐藏</h4>
    <dj-popover
      :openDelay="500"
      :closeDelay="500"
      title="标题"
      content="这是一段内容"
      width="150" trigger="hover" placement="top">
      <dj-button slot="reference">hover 激活</dj-button>
    </dj-popover>
    <div class="mb30"></div>
    <h4 class="mb10">禁用状态</h4>
    <dj-popover
      disabled
      title="标题"
      content="这是一段内容"
      width="150" trigger="click" placement="topRight">
      <dj-button slot="reference">click 禁用状态</dj-button>
    </dj-popover>
    <div class="markdown-body">
      <doc></doc>
    </div>
  </div>
</template>
<script>
import doc from '../../docs/popover.md';

export default {
  data() {
    return {
      title: '标题',
      content: '这是一段内容,这是一段内容,这是一段内容。',
      visible: false
    };
  },
  components: {
    doc
  },
  methods: {
    close(e) {
      e.stopPropagation();
      this.visible = false;
    }
  }
};
</script>

<style>
</style>
