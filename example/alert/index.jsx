export default {
  title: 'Alert 警告提示',
  describe: '警告提示，展现需要关注的信息。',
  templates: [
    {
      title: '基础用法（可slot插槽)',
      describe: 'info,success,warning,error四种类型',
      template: `<dj-alert message="默认信息" type="primary">
        </dj-alert><div class="spacing"></div>
        <dj-alert message="基本信息" type="info">
        </dj-alert>
        <div class="spacing"></div>
         <dj-alert message="基本信息">
        </dj-alert>
        <div class="spacing"></div>
       <dj-alert message="成功信息" type="success">
        </dj-alert><div class="spacing"></div>
        <dj-alert message="警告信息" type="warning"></dj-alert>
        <div class="spacing"></div>
        <dj-alert message="错误信息" type="error"></dj-alert>
        <div class="spacing"></div>
        <dj-alert type="error"><template slot="message">错误信息插槽定义</template></dj-alert>
        `
    },
    {
      title: '主题',
      template: `<dj-alert message="默认信息" effect="dark">
      </dj-alert><div class="spacing"></div>
      <dj-alert message="成功信息" type="success" effect="dark">
      </dj-alert><div class="spacing"></div>
      <dj-alert message="警告信息" type="warning" effect="dark"></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="错误信息" type="error" effect="dark"></dj-alert>`
    },
    {
      title: '带边框',
      template: `
      <dj-alert type="error" border><template slot="message">错误信息插槽定义</template></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="基本" border></dj-alert><div class="spacing"></div>
      <dj-alert message="默认信息" type="primary" border></dj-alert><div class="spacing"></div>
      <dj-alert message="成功信息" type="success" border></dj-alert><div class="spacing"></div>
      <dj-alert message="警告信息" type="warning" border></dj-alert><div class="spacing"></div>
        <dj-alert message="错误信息" type="error" border></dj-alert>
        <div class="spacing"></div>`
    },
    {
      title: '自定义颜色',
      template: `<dj-alert message="默认信息" effect="dark" :colors="['#7979ff']"></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="成功信息" type="success" effect="dark" :colors="['#2db7f5']"></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="警告信息" :colors="['#2db7f5']" border></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="错误信息" type="error" :colors="['pink']"></dj-alert><div class="spacing"></div>
      <dj-alert :colors="['red','orange']" border ><template slot="message">信息插槽定义</template></dj-alert>
       <div class="spacing"></div>
       <dj-alert :colors="['red','orange','purple']" border><template slot="message">信息插槽定义</template></dj-alert>
      `
    },
    {
      title: '带有辅助性文字介绍（可slot插槽）',
      template: `<dj-alert message="带有辅助性文字介绍" effect="dark" :colors="['#7979ff','red']" description="村里有个姑娘叫小芳，长得美丽又大方"></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="警告信息" type="error" :colors="['orange']">
        <template>插槽自定义警告信息</template>
      </dj-alert>`
    },
    {
      title: '自定义关闭按钮',
      template: `<dj-alert message="带有辅助性文字介绍" effect="dark" :colors="['#7979ff']" description="村里有个姑娘叫小芳，长得美丽又大方" closable></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="成功信息" type="success" effect="dark" description="关闭时设置了回调函数" :colors="['#2db7f5']" closeText="关闭" closable @onClose="close"></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="警告信息" :colors="['#2db7f5']" description="关闭后设置了回调函数" closeText="知道了" closable @afterClose="afterClose2"></dj-alert>
      <div v-if="visible">关闭后我就出现了</div>
      `,
      data: {
        data(){
          return {
            visible: false
          };
        },
        methods: {
          close(){
            alert('关闭');
          },
          afterClose2(){
            this.visible=true;
            console.log('aabbccdd');
          }
        }
      }
    },
    {
      title: '带有icon的警示框',
      template: `<dj-alert message="带有辅助性文字介绍" effect="dark" :colors="['#7979ff']" description="村里有个姑娘叫小芳，长得美丽又大方" showIcon></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="成功信息" type="success" effect="dark" :colors="['#2db7f5']" showIcon></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="警告信息" :colors="['#2db7f5']" showIcon></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="错误信息" type="error" :colors="['pink']" showIcon>
        <div>Error Error Error ErrorError Error</div>
      </dj-alert>`
    },
    {
      title: '文字居中',
      template: `<dj-alert message="默认信息" center>
      </dj-alert><div class="spacing">
      </div><dj-alert message="成功信息" type="success" center>
      </dj-alert><div class="spacing"></div>
      <dj-alert message="警告信息" type="warning" effect="dark" center></dj-alert>
      <div class="spacing"></div>
      <dj-alert message="错误信息" type="error" effect="dark" center></dj-alert>`
    }
  ]
};
