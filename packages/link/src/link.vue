<template>
    <span>
    	<a :href="action?action:'javascript:void(0)'" :target="target" :class="['dj-link','dj-link-'+type,{'is-disabled': disabled,'underline':underline}]" :style="[{'color':color, 'border-color':color,'font-size':fontSize+'px'}]" @click="handClick">
       <span class="dj-link-icon" v-if="before || $slots.before">
        <slot name="before"><dj-icon :icon="icon"></dj-icon></slot>
      </span>
			<slot></slot>
      <span class="dj-link-icon" v-if="after || $slots.after">
        <slot name="after"><dj-icon :icon="icon"></dj-icon></slot>
      </span>
		</a>
    </span>
</template>
<script>
export default {
  name: 'djLink',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    action: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: [Number,String],
      default: 14
    },
    icon: {
      type: String,
      default: ''
    },
    before: Boolean,
    after: Boolean,
    target: {
      type: String,
      default: '_parent' // 打开类型，默认原窗口打开
    }
  },
  data(){
    return {

    };
  },
  methods: {
    handClick(){
      this.$emit('click');
    }
  }
};
</script>
