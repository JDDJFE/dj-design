<template>
    <div>
      <dj-button @click="alertFn">alert</dj-button>
      <dj-button @click="beforeClose">beforeClose</dj-button>
      <dj-button @click="confirmFn">confirm</dj-button>
    </div>
</template>

<script >
export default {
  data(){
    return {
      haha: ''
    };
  },
  created(){
  },
  methods: {
    alertFn1() {
      this.$alert(`<h6>这是一条默认的信息！${new Date() % 100}${this.haha}</6>`, '<h1 style="color:red">自定义</1>', {
        okButtonText: '确定11',
        vnode: true,
        closable: true,
        callback: action => {
          this.$alert(`33深层${new Date() % 100}`, '3333', {
            okButtonText: '确定',
            callback: action => {
              this.$message('深层3333');
            }
          });
        }
      });
    },
    alertFn() {
      this.$alert(`这是一条默认的信息！${new Date() % 100}${this.haha}`, '1111', {
        type: 'help',
        callback: action => {
          this.$alert(`33深层${new Date() % 100}`, '3333', {
            okButtonText: '确定',
            callback: action => {
              this.$message('深层3333');
            }
          });
        }
      });
      this.$alert(`这是一条默认的信息！${new Date() % 100}${this.haha}`, '2222', {
        callback: action => {
          this.$alert(`44深层${new Date() % 100}`, '4444', {
            okButtonText: '确定',
            callback: action => {
              this.$message('深层4444');
            }
          });
        }
      });
    },
    beforeClose() {
      this.$confirm(`这是一条beforeClose的信息！${new Date() % 100}`, 'beforeClose', {
        okButtonText: '确定000',
        beforeClose: (action, instance, done) => {
          if (action) {
            instance.okButtonText = '执行中...';
            instance.buttonLoad = true;
            setTimeout(() => {
              this.haha = '哎呦我去';
              this.$message.error('失败了');
              done();
            }, 3000);
          } else {
            done();
          }
        }
      });
    },
    confirmFn() {
      this.$confirm('3-111111', '3-111111', {
        okButtonText: '确定1',
        cancelButtonText: '取消2',
        type: 'warning'
      }).then(action => {
        this.$alert(`3-22222${new Date() % 100}`, '3-22222', {
          okButtonText: '确定',
          callback: action => {
            this.$message('深层');
          }
        });
      }).catch(action => {
        this.$message(`已取消删除${action}!`);
      });
    }
  }
};
</script>
