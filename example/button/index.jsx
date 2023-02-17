export default {
  title: 'Button 按钮',
  describe: '常用的操作按钮',
  templates: [
    {
      title: '基础按钮',
      template: `<dj-button>默认按钮</dj-button>
      <dj-button type="primary" >主要按钮</dj-button>
      <dj-button type="success" >成功按钮</dj-button>
      <dj-button type="info" >信息按钮</dj-button>
      <dj-button type="warning" >警告按钮</dj-button>
      <dj-button type="danger" >危险按钮</dj-button>`
    },
    {
      title: '圆角按钮',
      template: `<dj-button round>默认按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="primary" round>主要按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="success" round>成功按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="info" round>信息按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="warning" round>警告按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="danger" round>危险按钮</dj-button>`
    },
    {
      title: '朴素按钮',
      template: `<dj-button plain >默认按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="primary" plain >主要按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="success" plain >成功按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="info" plain>信息按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="warning" plain>警告按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="danger" plain>危险按钮</dj-button>`
    },
    {
      title: '填充按钮',
      template: `<dj-button fill >默认按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="primary" fill >主要按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="success" fill >成功按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="info" fill>信息按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="warning" fill>警告按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="danger" fill>危险按钮</dj-button>`
    },
    {
      title: '禁用按钮',
      template: `<dj-button disabled>默认按钮</dj-button>
      <dj-button type="primary" disabled>主要按钮</dj-button>
      <dj-button type="success" disabled>成功按钮</dj-button>
      <dj-button type="info" disabled>信息按钮</dj-button>
      <dj-button type="warning" disabled>警告按钮</dj-button>
      <dj-button type="danger" disabled>危险按钮</dj-button>`
    },
    {
      title: '图标按钮',
      template: `<dj-button icon="signout">默认icon</dj-button>
      <dj-button type="success" icon="back-step" round></dj-button>
      <dj-button type="info" icon="copy1" round></dj-button>
      <dj-button type="warning" icon="check" circle plain></dj-button>
      <dj-button type="danger" icon="close" square></dj-button>`
    },
    {
      title: '加载按钮',
      template: `
      <dj-button type="primary" :loading="true">加载按钮</dj-button>
      <dj-button type="warning" :loading="true" icon="check" circle plain></dj-button>`
    },
    {
      title: '文字按钮',
      template: `<dj-button type="text">文字按钮</dj-button>
      <div class="disInB ml10"></div>
      <dj-button type="text" disabled>文字禁用</dj-button>`
    },
    {
      title: '警告按钮',
      template: '<dj-button error>警告按钮</dj-button>'
    },
    {
      title: '自定义样式',
      template: `<dj-button :colors="['#fff','#7979FF','#7979FF']" :hovers="['#fff','#333','#333']">基础按钮</dj-button>
      <dj-button :colors="['#fff','#7979FF','#7979FF']" round>圆角按钮</dj-button>
      <dj-button :colors="['#7979FF','#fff','#7979FF']" plain>朴素按钮</dj-button>
      <dj-button type="text" :colors="['#7979FF']">文字按钮</dj-button>
      <dj-button :colors="['#fff','#7979FF','#7979FF']" disabled>禁用按钮</dj-button>
      <dj-button :colors="['#7979FF','#fff','#7979FF']" icon="search2" circle plain></dj-button>
      <dj-button :colors="['#fff','#7979FF','#7979FF']" icon="abstract-check" square></dj-button>`
    },
    {
      title: '按钮组',
      template: `<dj-button-group>
        <dj-button>启用</dj-button>
        <dj-button>禁用</dj-button>
        <dj-button>删除</dj-button>
      </dj-button-group>`
    },
    {
      title: '尺寸',
      template: `<dj-button size="large">大型按钮</dj-button>
      <dj-button>默认中型</dj-button>
      <dj-button size="small">小型按钮</dj-button>
      <dj-button size="mini">迷你按钮</dj-button>`
    }
  ]
};
