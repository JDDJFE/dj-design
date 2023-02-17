<template>
  <div class="dj-progress" :class="{'dj-circle-progress': type === 'circle' || type === 'dashboard'}">
    <!-- 线形进度条 -->
    <div v-if="type==='line'" class="dj-progress-line">
      <div :style="{ height: `${height}px`, borderRadius: `${height/2}px`, width: `${lineWidth}px` }" class="dj-progress-outer" :class="[size]">
        <div :style="{ width: `${percentage || 0}%`, borderRadius: `${height/2}px`, backgroundColor: color, backgroundImage: `linear-gradient(to right, ${color[0]} , ${color[1]})` }" class="dj-progress-inner" :class="[status]">
          <span v-if="textInside && showInfo" :style="{width: `${(fontSize || 14) * 36 / 14}px`, fontSize: `${fontSize || 14}px`}" :class="{'dj-progress-text-inside-left': size == 'middle' && percentage < 17 || size == 'mini' && percentage < 27 || size == 'large' && percentage < 5}" class="dj-progress-text dj-progress-text-inside">
            <slot>
              <wbr>{{ (percentage || 0) + '%' }}<wbr>
            </slot>
          </span>
          <div :style="{ height: `${height}px`,  borderRadius: `${height/2}px` }" :class="{'dj-progress-inner-lamp': active}"></div>
        </div>
      </div>
      <span v-if="!textInside && showInfo" class="dj-progress-text">
        <dj-icon class="success" v-if="showSuccessIcon" :icon="status | formatIcon" :fontSize="iconFontSize"></dj-icon>
        <dj-icon class="warning" v-if="showExceptionIcon" :icon="status | formatIcon" :fontSize="iconFontSize"></dj-icon>
        <dj-icon class="error" v-if="showWarningIcon" :icon="status | formatIcon" :fontSize="iconFontSize"></dj-icon>
        <span :style="{fontSize: `${fontSize || 14}px`}" v-if="status == 'primary' || (percentage != 100 && !showIcon) || !showIcon || (status == 'success' && percentage != 100) ">
          <slot>
            {{ (percentage || 0) + '%' }}
          </slot>
        </span>
      </span>
    </div>
    <!-- 环形/仪表盘进度条 -->
    <div v-if="isCircle || isDashboard" :style="{width: (width || 120) + height*2 + 'px', height: (width || 120) + height*2 + 'px'}" :class="{'dj-progress-circle': isCircle, 'dj-progress-dashboard': isDashboard}">
      <svg :style="{width: (width || 120) + height*2 + 'px', height: (width || 120) + height*2 + 'px'}">
        <circle class="dj-progress-circle-dashboard-bg" :class="{'dj-progress-circle-circle': isCircle, 'dj-progress-dashboard-dashboard': isDashboard}" :stroke-dasharray="strokeDasharrayBg" :stroke-dashoffset="0" :cx="cx" :cy="cx" :r="(width || 120)/2" fill="none" :stroke-width="height" stroke-linecap="round"></circle>
        <circle :class="{'dj-progress-circle-dashboard-hide': !percentage, 'dj-progress-circle-circle': isCircle, 'dj-progress-dashboard-dashboard': isDashboard, ...statusClass}" :stroke-dasharray="strokeDasharray" :stroke-dashoffset="isCircle ? circleOffSet : ''" :cx="cx" :cy="cx" :r="(width || 120)/2" fill="none" :stroke-width="height" stroke-linecap="round"></circle>
      </svg>
      <span :style="{fontSize: `${fontSize || 20}px`}" :class="{'dj-progress-circle-text': isCircle, 'dj-progress-dashboard-text': isDashboard}">
        <slot>
          {{(percentage || 0) + '%'}}
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'djProgress',
  data() {
    return {
      tempOffSet: 0,
      isShow: true
      // size: 'middle'
    };
  },
  props: {
    // 进度条长度 可选值：mini、middle（默认值）、large（后续不再支持）
    size: {
      type: String,
      default: 'middle'
    },
    // 设置百分比字体大小
    fontSize: {
      type: Number
    },
    // 百分比 可选值：0-100
    percentage: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0 && val <= 100;
      }
    },
    // 进度条的类型 可选值：line/circle/dashboard
    type: {
      type: String,
      default: 'line'
    },
    // 是否显示icon
    showIcon: {
      type: Boolean,
      default: false
    },
    // 进度条的高/厚度 单位：px
    strokeWidth: {
      type: Number
      // default: 8
    },
    // 是否显示百分比
    showInfo: {
      type: Boolean,
      default: true
    },
    // 百分比是否在进度条内部显示
    textInside: {
      type: Boolean,
      default: false
    },
    // 进度条的状态/控制颜色，可选值：success、warning、error、primary(默认)
    status: {
      type: String,
      default: 'primary'
    },
    // 指定进度条颜色，可传数组表示渐变色
    color: {
      type: [String, Array],
      default: () => {
        return '';
      }
    },
    // 设置circle、dashboard的直径
    width: {
      type: Number
    },
    format: {
      type: Function
    },
    // 设置进度条是否有滑动的动效
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lineWidth() {
      return this.width || 300;
    },
    // 进度条的高度
    height() {
      if (this.textInside && !this.strokeWidth) {
        return 18;
      }
      return this.strokeWidth || (this.size == 'mini' ? 6 : this.type == 'line' ? 8 : 6);
    },
    // icon图标的字体大小
    iconFontSize() {
      return this.size == 'mini' ? '12px' : '16px';
    },
    // type是否为 circle
    isCircle() {
      return this.type === 'circle';
    },
    // type是否为 dashboard
    isDashboard() {
      return this.type === 'dashboard';
    },
    // 动态添加状态类
    statusClass() {
      return {
        success: this.status === 'success',
        warning: this.status === 'warning',
        error: this.status === 'error',
        primary: this.status === 'primary'
      };
    },
    // 环形进度条的周长
    circleLength() {
      return (this.width || 120) * 3.14;
    },
    //  环形进度条的偏移量
    circleOffSet() {
      return (1 - this.percentage/100) * (this.width || 120) * 3.14;
    },
    // 仪表盘进度条的周长
    dashboardLength() {
      return (this.width || 120) * 2.5;
    },
    // 判断背景是环形还是仪表盘
    strokeDasharrayBg() {
      return this.type === 'circle' ? this.circleLength : this.type === 'dashboard' ? this.dashboardLength : '';
    },
    // 判断偏移量是环形还是仪表盘
    strokeDasharray() {
      return this.type === 'circle' ? (this.width || 120) * 3.14 : this.type === 'dashboard' ? `${this.percentage / 100 * (this.width || 120) * 2.5}px ,${(this.width || 120) * 3.14}px` : 0;
    },
    // circle 的位置
    cx() {
      return (this.width || 120) / 2 + this.height;
    },
    // 判断展示成功 icon 的条件
    showSuccessIcon() {
      return this.percentage == 100 && this.showIcon && this.status === 'success';
    },
    // 判断展示异常 icon 的条件
    showExceptionIcon() {
      return this.showIcon && this.status === 'warning';
    },
    // 判断展示警告 icon 的条件
    showWarningIcon() {
      return this.showIcon && this.status === 'error';
    }
  },
  filters: {
    formatIcon(status) {
      switch (status) {
        case 'success':
          return 'check-filled';
        case 'warning':
          return 'info-filled';
        case 'error':
          return 'close-filled';
        case 'primary':
          return '';
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>
