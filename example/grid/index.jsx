export default {
  title: 'Grid栅格',
  describe: '通过基础的 24 分栏，迅速简便地创建布局。',
  templates: [
    {
      title: '基础栅格',
      template: `
      <dj-row>
        <dj-col :span="24"><div class="grid-content">col-24</div></dj-col>
      </dj-row>
      <dj-row>
        <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
        <dj-col :span="16"><div class="grid-content">col-16</div></dj-col>
      </dj-row>`
    },
    {
      title: '区块间隔',
      template: `<dj-row :gutter="20">
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
    </dj-row>`
    },
    {
      title: '左侧间隔格数',
      template: `<dj-row :gutter="20">
      <dj-col :span="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8" :offset="8"><div class="grid-content">col-8</div></dj-col>
      <dj-col :span="8" :offset="8"><div class="grid-content">col-8</div></dj-col>
    </dj-row>`
    },
    {
      title: '右左移动格数',
      template: `<dj-row :gutter="20">
      <dj-col :span="18" :push="6"><div class="grid-content">col-18</div></dj-col>
      <dj-col :span="6" :pull="18"><div class="grid-content">col-6</div></dj-col>
    </dj-row>`
    },
    {
      title: '栅格排序',
      template: `<dj-row>
      <dj-col :span="8" :order="2"><div class="grid-content">1 - col-8 / order-2</div></dj-col>
      <dj-col :span="16" :order="1"><div class="grid-content">2 - col-16 / order-1</div></dj-col>
    </dj-row>`
    },
    {
      title: '响应式布局',
      template: `<dj-row :gutter="10">
      <dj-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content">col</div></dj-col>
      <dj-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content">col</div></dj-col>
      <dj-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content">col</div></dj-col>
      <dj-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content">col</div></dj-col>
    </dj-row>`
    },
    {
      title: 'justify 对齐方式',
      template: `
      <dj-row type="flex" justify="center">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="flex-start">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="flex-end">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="space-between">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>
      <dj-row type="flex" justify="space-around">
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
        <dj-col :span="6"><div class="grid-content">col-6</div></dj-col>
      </dj-row>`
    },
    {
      title: 'align 对齐方式',
      template: `
        <dj-row :gutter="20" type="flex" align="flex-start">
          <dj-col :span="8"><div class="grid-content" style="height:50px">col-8</div></dj-col>
          <dj-col :span="8"><div class="grid-content" style="height:90px">col-8</div></dj-col>
          <dj-col :span="8"><div class="grid-content" style="height:60px">col-8</div></dj-col>
        </dj-row>
        <dj-row :gutter="20" type="flex" align="flex-end">
          <dj-col :span="8"><div class="grid-content" style="height:50px">col-8</div></dj-col>
          <dj-col :span="8"><div class="grid-content" style="height:90px">col-8</div></dj-col>
          <dj-col :span="8"><div class="grid-content" style="height:60px">col-8</div></dj-col>
        </dj-row>
        <dj-row :gutter="20" type="flex" align="center">
          <dj-col :span="8"><div class="grid-content" style="height:50px">col-8</div></dj-col>
          <dj-col :span="8"><div class="grid-content" style="height:90px">col-8</div></dj-col>
          <dj-col :span="8"><div class="grid-content" style="height:60px">col-8</div></dj-col>
        </dj-row>`
    }
  ]
};
