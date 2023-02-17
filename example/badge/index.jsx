export default {
  title: 'Badge 标记',
  describe: '出现在按钮、图标旁的数字或状态标记',
  templates: [
    {
      title: '基础用法',
      template: '<dj-badge color="#F56C6C" value="1"><dj-icon icon="notification"></dj-icon></dj-badge><div class="spacing-large"></div><div class="spacing-large"></div><dj-badge value="2" border>消息</dj-badge>&nbsp;<div class="spacing-large"></div><div class="spacing-large"></div><dj-badge value="2" border>消息</dj-badge><div class="spacing-large"></div><div class="spacing-large"></div><dj-badge color="#F56C6C" value="1"><dj-button type="primary">fasfdafa</dj-button></dj-badge>'
    },
    {
      title: '自定义标记位置',
      template: '<dj-badge value="2" border :positionStyle="positionStyle">消息</dj-badge><div class="spacing-large"></div><div class="spacing-large"></div><dj-badge color="#F56C6C" value="1" :positionStyle="positionStyle2"><dj-button type="primary">fasfdafa</dj-button></dj-badge><div class="spacing-large"></div><dj-badge color="#F56C6C" border  :positionStyle="positionStyle3">发现</dj-badge>',
      data: {
        data() {
          return {
            positionStyle: {
              left: '-10px',
              top: '10px'
            },
            positionStyle2: {
              right: '-10px',
              bottom: '-10px'
            },
            positionStyle3: {
              right: '-4px',
              bottom: '10px'
            }
          };
        }
      }
    },
    {
      title: '自定义标记大小,自定义字体大小',
      template: '<dj-badge value="2" border :whStyle="whStyle" :fontSize="18">消息</dj-badge><div class="spacing-large"></div><div class="spacing-large"></div><dj-badge color="#F56C6C" value="1" :whStyle="whStyle2"><dj-button type="primary">fasfdafa</dj-button></dj-badge><div class="spacing-large"></div><dj-badge color="#F56C6C" border  :whStyle="whStyle3">发现</dj-badge>',
      data: {
        data() {
          return {
            whStyle: {
              width: '25px',
              height: '25px'
            },
            whStyle2: {
              width: '25px',
              height: '10px'
            },
            whStyle3: {
              width: '15px',
              height: '15px'
            }
          };
        }
      }
    },
    {
      title: '自定义最大值',
      template: '<dj-badge color="#F56C6C" value="1" max="10" border><dj-icon icon="notification" fontSize="35px"></dj-icon></dj-badge><div class="spacing-large"></div><dj-badge value="20" max="10"><dj-icon icon="notification" fontSize="35px"></dj-icon></dj-badge><div class="spacing-large"></div><dj-badge color="#F56C6C" value="30" max="20"><dj-icon icon="notification" fontSize="35px"></dj-icon></dj-badge>'
    },
    {
      title: '自定义内容',
      template: '<dj-badge color="#F56C6C" value="new">新的</dj-icon></dj-badge>&nbsp;<div class="spacing-large"></div><dj-badge value="old">旧的</dj-badge>&nbsp;<div class="spacing-large"></div><dj-badge color="#F56C6C" value="hot">热门</dj-badge>'
    },
    {
      title: '小红点',
      template: '<dj-badge color="#F56C6C" border>发现</dj-badge><div class="spacing-large"></div><dj-badge><dj-icon icon="notification" fontSize="35px"></dj-icon></dj-badge><div class="spacing-large"></div><dj-badge>消息</dj-badge><div class="spacing-large"></div><dj-badge color="#F56C6C" border>发现</dj-badge><div class="spacing-large"></div><dj-badge><dj-button type="primary">哈哈哈</dj-button></dj-badge><div class="spacing-large"></div><dj-badge>消息</dj-badge>'
    },
    {
      title: '小圆点',
      template: `<dj-badge color="#F56C6C"></dj-badge><div class="spacing-large"></div>
      <dj-badge color="orange"></dj-badge><div class="spacing-large"></div>
      <dj-badge :whStyle="whStyle"></dj-badge>`,
      data: {
        data() {
          return {
            whStyle: {
              width: '30px',
              height: '30px'
            }
          };
        }
      }
    }
  ]
};
