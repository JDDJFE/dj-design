export default {
  title: 'Breadcrumb 面包屑',
  templates: [
    {
      title: '基础用法',
      template: `<dj-breadcrumb separator="/">
  <dj-breadcrumb-item :to="{ path: '/' }">
      <i class="iconfont home"></i>首页
  </dj-breadcrumb-item>
  <dj-breadcrumb-item><a href="/" target="_blank">活动管理</a></dj-breadcrumb-item>
  <dj-breadcrumb-item>活动列表</dj-breadcrumb-item>
  <dj-breadcrumb-item>活动详情</dj-breadcrumb-item>
</dj-breadcrumb>`
    },
    {
      title: '图标分隔符',
      template: `<dj-breadcrumb separatorClass="arrow-right-big">
  <dj-breadcrumb-item :to="{ path: '/' }">首页</dj-breadcrumb-item>
  <dj-breadcrumb-item>活动管理</dj-breadcrumb-item>
  <dj-breadcrumb-item>活动列表</dj-breadcrumb-item>
  <dj-breadcrumb-item>活动详情</dj-breadcrumb-item>
</dj-breadcrumb>`
    },
    {
      title: '自定义分隔符',
      template: `<dj-breadcrumb separator="">
  <dj-breadcrumb-item :to="{ path: '/' }" :replace="true">首页</dj-breadcrumb-item>
      <i class="iconfont arrow-right-big dj-breadcrumb-separator"></i>
  <dj-breadcrumb-item>活动管理</dj-breadcrumb-item>
  <span class="dj-breadcrumb-separator">|</span>
  <dj-breadcrumb-item>活动列表</dj-breadcrumb-item>
  <span class="dj-breadcrumb-separator">|</span>
  <dj-breadcrumb-item>活动详情</dj-breadcrumb-item>
</dj-breadcrumb>`
    }
  ]
};
