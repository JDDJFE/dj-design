export default {
  title: 'MessageBox 弹框',
  describe: '模拟系统的消息提示框而实现的一套模态对话框组件。',
  templates: [
    {
      title: '消息提示',
      template: '<dj-button @click="alertFn">基础用法</dj-button>',
      data: {
        methods: {
          alertFn() {

            // this.$confirm(
            //   '是否确认驳回?\n驳回后，您可联系运营修改合同内容并重新发起签署流程',
            //   {
            //     showclose: false,
            //     ok: () => {
            //       this.$message.success('❤️..成功啦～');
            //     }
            //   }
            // );
            // this.$alert('这是一段内容');
            // this.$alert('这是一段内容', '标题名称',{
            //   ok: ()=>{
            //     this.$message.success('❤️..成功啦～');
            //   }
            // });
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              type: 'warning',
              className: 'abc',
              ok: () => {
                this.$message.success('❤️..成功啦～');
              }
              // callback: action => {
              //   if (action) {
              //     this.$message(`已成功删除${action}!`);
              //   } else {
              //     this.$message(`已取消删除${action}!`);
              //   }
              // }
            });
          }
        }
      }
    },
    {
      title: '确认消息',
      template: `
      <dj-button @click="alertFn">点我callback</dj-button>`,
      data: {
        methods: {
          alertFn() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              type: 'warning',
              callback: action => {
                if (action) {
                  this.$message(`已成功删除${action}!`);
                } else {
                  this.$message(`已取消删除${action}!`);
                }
              }
            });
          }
        }
      }
    },
    {
      title: '响应执行',
      template: '<dj-button @click="alertFn">点我点我</dj-button>',
      data: {
        methods: {
          alertFn() {
            this.$confirm('过程需要等待哦～⌛️', '关闭前的回调', {
              oktext: '开启',
              beforeClose: (action, instance, done) => {
                if (action) {
                  instance.oktext = '执行中...';
                  instance.loading = true;
                  setTimeout(() => {
                    this.$message.error('💔..失败了啧啧');
                    done();
                  }, 3000);
                } else {
                  done();
                }
              }
            });
          }
        }
      }
    },
    {
      title: '使用 HTML 片段',
      template: '<dj-button @click="alertFn">基础用法</dj-button>',
      data: {
        methods: {
          alertFn() {
            this.$alert('<h6>我喜欢<span style="color:pink">粉色</span><h6>', '<h1 style="color:red">我是自定义</1>', {
              vnode: true,
              callback: action => {
                this.$message.warning('⭐️');
              }
            });
          }
        }
      }
    },
    {
      title: '阻塞操作',
      template: '<dj-button @click="alertFn">基础用法</dj-button>',
      data: {
        methods: {
          alertFn() {
            this.$alert('第一个弹', '爷爷', {
              callback: action => {
                this.$confirm('第三个弹', '爷爷->爸爸', {
                  callback: action => {
                    this.$confirm('第五个弹', '爷爷->爸爸->儿子', {
                      callback: action => {
                        this.$message('我是儿子👦');
                      }
                    });
                  }
                });
              }
            });
            this.$alert('第二个弹', '奶奶', {
              callback: action => {
                this.$alert('第四个弹', '奶奶->妈妈', {
                  callback: action => {
                    this.$message('我是妈妈👩');
                  }
                });
              }
            });
          }
        }
      }
    }
  ]
};
