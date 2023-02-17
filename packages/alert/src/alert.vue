
<template>
  <div class="dj-alert" v-if="visible"
    :class="[
      type && `dj-alert-${type}`,
      effect && `dj-alert-${effect}`,
      color && `dj-alert-has-color`,
      center ? 'is-center' : '',
      border ? `is-border`:'',
      (description || $slots.default) ? 'dj-alert-has-description' : ''
      ]"
      
      :style="[
        { border: border ? `1px solid ${borderColor || color}` : `` },
        { color: color && effect === 'dark' ? `#fff` : `${color}` },
        { background: effect === 'dark' ? `${bgColor || color}` : `` }
      ]"
  >
   
    <div class="dj-alert_content">
        <div class="dj-alert_common">
            <dj-icon class="dj-alert_icon" :class="[isTitleIcon]" :icon="iconType" v-if="showIcon"></dj-icon>
            <span class="dj-alert_message" :class="(description || $slots.default) ? ['dj-alert_title', 'is-bold'] : ''"  v-if="message || $slots.message">
                <slot name="message">{{ message }}</slot>
            </span>
            <span v-if="closable" class="dj-alert_closebtn" :class="[{'is-customed': closeText !== ''}, {'is-title-btn': isTitleIcon == 'is-title'}]" @click="onClose()">
                <dj-icon icon="close" v-if="!closeText" fontSize="12px"></dj-icon>
                <span v-if="closeText">{{closeText}}</span>
            </span>
        </div>
        <p class="dj-alert_description" :class="(!!showIcon) ? 'has_icon' : ''" v-if="$slots.default && !description"><slot></slot></p>
        <p class="dj-alert_description" :class="(!!showIcon) ? 'has_icon' : ''" v-if="description && !$slots.default">{{ description }}</p>
        <div v-if="color && effect==='light'" :class="['dj-alert-color-bg',bgColor?'dj-alert-bgcolor':'']"  :style="[{background:bgColor?`${bgColor}`:`${color}`}]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'djAlert',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    message: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    closeText: {
      type: String,
      default: ''
    },
    effect: {
      type: String,
      default: 'light',
      validator: function(value) {
        return ['light', 'dark'].indexOf(value) !== -1;
      }
    },
    colors: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    iconType() {
      return this.type == 'success' ? 'check-filled' : this.type == 'error' ? 'close-filled' : 'info-filled';
    },
    isTitleIcon() {
      return this.description || this.$slots.default ? 'is-title' : '';
    },
    color() {
      return this.colors[0];
    },
    bgColor() {
      return this.colors[1];
    },
    borderColor() {
      return this.colors[2];
    }
  },
  watch: {
    visible: {
      handler() {
        if (!this.visible) {
          let that=this;
          setTimeout(function() {
            that.afterClose();
          }, 100);
        }
      },
      deep: true
    }
  },
  methods: {
    onClose() {
      this.visible = false;
      this.$emit('onClose');
    },
    afterClose() {
      this.$emit('afterClose');
    }
  }
};
</script>
