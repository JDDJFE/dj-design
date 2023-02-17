export default {
  title: 'Message 消息提示',
  describe: '用于主动操作后的反馈提示。',
  templates: [
    {
      title: '基础用法',
      template: '<dj-button @click="open"> 默认</dj-button>',
      data: {
        methods: {
          open() {
            this.$message('当前名单组正在被【["test_protect_6","test_protect_7","test_protect_11","test_protect_2","test_protect_8"]】应用!');
          }
        }
      }
    },
    {
      title: '不同状态',
      template: `<dj-button @click="open"> 默认</dj-button>
      <dj-button type="success" @click="open1">成功</dj-button>
      <dj-button type="warning" @click="open3">警告</dj-button>
      <dj-button type="danger" @click="open4">危险</dj-button>`,
      data: {
        methods: {
          open() {
            this.$message(`这是一条默认的信是一条默认的信是一条默认的信是一条默认的信是一条默认的信是一条默认的信是一条默认的信是一条默认的信息！${Math.floor(Math.random() * (1 - 100) + 100)}`);
          },
          open1() {
            this.$message.success(`这是一是一条默认的信是一条默认的信是一条默认的信是一条默认的信条成功的信息！${Math.floor(Math.random() * (1 - 100) + 100)}`);
          },
          open3() {
            this.$message.warning('这是一条警告信息!');
          },
          open4() {
            this.$message.error('这是一条危险的信息!');
          }
        }
      }
    },
    {
      title: '不可关闭',
      template: '<dj-button @click="open"> 默认</dj-button>',
      data: {
        methods: {
          open() {
            this.$message({
              message: '这是一条信息不可关闭!',
              type: 'success',
              close: false
            });
          }
        }
      }
    },
    {
      title: '使用 HTML 片段',
      template: '<dj-button @click="open"> 默认</dj-button>',
      data: {
        methods: {
          open() {
            this.$message({
              message: '<h2 style="color:pink">使用 HTML 片段</h2>',
              vnode: true
            });
          }
        }
      }
    }
  ]
};
