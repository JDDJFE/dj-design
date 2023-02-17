<template>
  <div :class="['dj-date-picker-sidebar']">
    <div :class="['dj-date-picker-shortcut']" v-for="(shortcut, index) in options.shortcuts" :key="index"
    @click="handleShortcutClick(shortcut, $event)">{{ shortcut.text }}</div>
  </div>
</template>

<script>
import mixin from '../base/mixin';
export default {
  mixins: [mixin],
  components: {},
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {

    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleShortcutClick(shortcut, ev) {
      if (shortcut.value) this.handleClick({date: shortcut.value()}, ev);
      if (shortcut.onClick) shortcut.onClick(shortcut.value());
    }
  }
};
</script>
