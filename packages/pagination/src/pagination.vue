<template>
    <div class="dj-pagination" :class="[border && 'dj-paginationB', size == 'small' && 'dj-pagination-small']">
        <span :style="{padding:  '10px'}">共 {{total}}  条</span>
        <ul class="dj-pagination-box" >
          <li class="dj-pagination-left" @click="reduceN"><dj-icon icon="arrow-left"></dj-icon></li>
          <li class="dj-pagination-num"
          :class="{'is-active':curNum==item}"
          :style="[(isQian&&index==1)||(isHou&&index==list.length-2) ? {border: 'none'} : {}]"
            @click="choosePagination(item,index)"
            v-for="(item,index) in list"
            :key="index"
            v-if="item!='...'||(isQian&&index==1)||(isHou&&index==list.length-2)"
            >{{item}}</li>
          <li class="dj-pagination-left" @click="plusN"><dj-icon icon="arrow-right"></dj-icon></li>
        </ul>
        <span class="dj-pagination-ye">
          <span v-if="!border">前往 </span>
          <span :class="border && 'dj-page-inner'">
            <input
              type="text"
              class="dj-pagination-ye-input"
              v-model="SPaginationValue"
              @blur="blurSPagination"
              @keydown.enter.prevent="blurSPagination"
              @input="SPaginationValue=verInput(SPaginationValue)">
            <i v-if="border" class="iconfont search2"/>
            <span v-if="!border"> 页</span>
          </span>
          <dj-select v-model="howmany" class="lt dj-pagination-page-size" @change="chooseItem" v-if="pageSizes && pageSizes.length" :style="`width: ${size == 'small' ? '90px' : '100px'}`" :height="`${size == 'small' ? '22px' : '30px'}`">
            <dj-option :value="item" :label="item+' 条/页'" v-for="(item,index) in pageSizes" :key="index"></dj-option>
          </dj-select>
        </span>
    </div>
</template>
<script>
export default {
  name: 'djPagination',
  data(){
    return {
      list: [],
      num: 1,
      curNum: '',
      howmany: '',
      isgt7: false,
      isQian: false,
      isHou: true,
      SPaginationValue: 1
    };
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: [String,Number],
      default: 10
    },
    total: {
      type: [String,Number],
      default: 0
    },
    currentPage: {
      type: [String,Number],
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {}
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  created(){
    this.getTotal(this.pageSize);
    this.choosePagination(this.currentPage, -1);
  },
  methods: {
    chooseItem(val){
      this.getTotal(Number(val));
      this.choosePagination(1, -2);
      this.$emit('size-change',val);
    },
    blurSPagination(){
      if (this.SPaginationValue!=''){
        let sp = Number(this.SPaginationValue);
        if (sp> this.num){
          this.choosePagination(this.num);
        } else if (sp < 1){
          this.choosePagination(1);
        } else {
          this.choosePagination(sp);
        }
      }
    },
    verInput(str){
      if (str&&str!=''){
        let num= str.replace(/[^0-9]/ig,'');
        if (str.length>1){
          return num.replace(/\b(0+)/gi,'');
        }
        return num;
      }
      return '';
    },
    reduceN(){
      let n=this.curNum;
      n--;
      if (n>0){
        this.choosePagination(n);
      }
    },
    plusN(){
      let n=this.curNum;
      n++;
      if (n<=this.num){
        this.choosePagination(n);
      }
    },
    choosePagination(n, bo){
      if (n === '...') return false;
      this.isHou=true;
      this.isQian=true;
      let arr = [n-5, n-4, n-3, n-2, n-1, n, n+1, n+2, n+3, n+4, n+5],
        index = 1,
        lent = arr.length;
        // 优化
      if (this.num>7) {
        if (n>=5&&this.isgt7){
          if (n<=this.num-1){
            index = 4;
            if (n==this.num-3){
              this.isHou=false;
            } else if (n==this.num-2){
              index = 5;
              this.isHou=false;
            } else if (n==this.num-1){
              index = 6;
              this.isHou=false;
            }
          } else {
            index = 7;
            this.isHou=false;
          }
        } else if (n<5&&this.isgt7){
          this.isQian=false;
          index = n;
        }
        this.list = [1, '...', ...arr.slice(lent-(5+(index-1)), lent-(index-1)), '...', this.num];
      } else {
        this.list=[];
        for (let i=0; i<this.num;i++ ){
          this.list.push(i+1);
        }
      }
      if (bo == -2 || bo != -1 && this.curNum!==n) {
        this.$emit('current-change',n, this.howmany);
      }
      this.$emit('update:currentPage', n);
      if (n!='...') this.curNum=n;
    },
    getTotal(pageSize){
      this.howmany=pageSize;
      this.num=Math.ceil(this.total/pageSize);
      this.isgt7 = this.num>7;
    }
  },
  watch: {
    currentPage(val){
      this.choosePagination(this.currentPage);
    },
    total(){
      this.getTotal(this.pageSize);
      this.choosePagination(this.currentPage, -1);
    }
  }
};
</script>
