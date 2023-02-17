<template>
  <div>
    <dj-button @click="show()">弹窗666</dj-button>
      <dj-modal ref="modal" :visible.sync="showModal" :ok="ok" :cancel="cancel">
        <dj-tag class="mr10" @click='clickfn'>11</dj-tag>
        <dj-modal ref="modal" :visible.sync="showModal1">
          23234234
        </dj-modal>
      </dj-modal>
    <div class="markdown-body">
        <doc></doc>
    </div>
  </div>
</template>

<script>
import doc from '../../docs/timePicker.md';
export default {
  data() {
    return {
      showModal: false,
      showModal1: false
    };
  },
  components: {
    doc
  },
  watch: {
    lala(val){
      console.log(val);
    }
  },
  mounted() {
  },
  methods: {
    clickfn() {
      this.showModal1 = true;
      // this.showModal = false;
      // this.$nextTick(() => {
      //   this.$router.push('/timePicker');
      // });
      console.log(this.showModal, 'this.showModal');
    },
    show() {
      this.showModal = true;
      // this.$refs.modal.show();
    },
    ok(done) {
      done(true);
      this.$message.success('保存成功');
      // this.$router.push('/timePicker');
      console.log(this.$router, 'router');
    },
    cancel(done) {
      this.$alert(1);
      return false;
    }
  }
};
</script>
