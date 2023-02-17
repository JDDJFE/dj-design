// 操作台
<template>
  <div class="dj-date-picker-foot">
    <span>
      <dj-button type="text" size="mini" @click="nowChange"  v-if="type && type === 'datetime'">此刻</dj-button>
    </span>
    <dj-button style="width: 100%" type="text" size="mini" @click="nowChange" v-if="type && type === 'date'">今天</dj-button>
    <span v-if="type !== 'date'">
      <dj-button type="text" size="mini" v-if="pickerType != 'time'" @click="clearChange" :disabled="isClear">清空</dj-button>
      <dj-button size="mini" @click="sureChange" type="primary">确定</dj-button>
    </span>
  </div>
</template>

<script>
// import mixin from '../base/mixin';
export default {
  name: '',
  // mixins: [mixin],
  components: {},
  props: {
    value: {
      type: [Date, String, Array]
    },
    pickerType: {
      type: String
    },
    type: {
      type: String
    }
  },
  data() {
    return {

    };
  },
  computed: {
    isClear() {
      if (this.value.length == 1) {
        return !this.value[0];
      }
      return !(this.value[0] && this.value[1]);
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    sureChange(){
      if (Array.isArray(this.value)) {
        if (this.type.includes('range') && this.value[0].getTime() > this.value[1].getTime()) {
          return;
        }
      }
      this.$emit('on-determine');
    },
    nowChange() {
      this.$emit('on-now', new Date());
    },
    clearChange() {
      this.$emit('on-clear');
    }
  }
};
</script>
<style lang="less" scoped>

</style>
