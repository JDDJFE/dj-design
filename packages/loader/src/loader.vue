<template>
    <div v-if="false"></div>
</template>
<script>
import loading from '@/mixins/loading';

export default {
  mixins: [loading],
  methods: {
    show(option = {}) {
      option.el = document.body;
      this.showLoading(option);
    },
    hide(option = {}) {
      option.el = document.body;
      this.closeLoading(option);
    },
    close(option = {}) {
      option.el = document.body;
      this.closeLoading(option);
    }
  }
};
</script>
