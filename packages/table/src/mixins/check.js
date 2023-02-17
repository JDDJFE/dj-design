export default {
  data() {
    return {
      isCheckAll: false,
      isIndeterminate: false,
      checkList: []
    };
  },
  watch: {
    value: {
      handler: function() {
        this.setIsCheckAll();
      }
    },
    data: {
      handler: function() {
        this.setIsCheckAll();
      }
    },
    checkList: {
      handler: function() {
        this.setIsCheckAll();
      }
    }
  },
  methods: {
    checkAll() {
      // this.checkList = [];
      let data = this.value || this.data;
      if (this.isCheckAll) {
        // this.checkList = [...data];
        data.forEach(item => {
          if (!this.isCheck(item)) {
            this.checkList.push(item);
          }
        });
      } else {
        data.forEach(item => {
          if (this.isCheck(item)) {
            this.$remove(this.checkList, item);
          }
        });
      }
      this.checkChange();
    },
    onCheck(item) {
      if (this.isCheck(item)) {
        this.$remove(this.checkList, item);
      } else {
        if (this.selectionCount == 1) {
          this.checkList = [];
        }
        this.checkList.push(item);
      }
      this.checkChange();
    },
    setIsCheckAll() {
      let data = this.value || this.data;
      this.isIndeterminate = false;
      let check = false;
      for (let i = 0; i < data.length; i++) {
        if (!this.isCheck(data[i])) {
          this.isCheckAll = false;
          check = true;
          if (this.isIndeterminate) {
            return false;
          }
        } else {
          this.isIndeterminate = true;
        }
      }
      if (check) {
        return false;
      }
      this.isIndeterminate = false;
      this.isCheckAll = true;
      return true;
    },
    isCheck(item) {
      return this.checkList.find(checkItem => checkItem == item || JSON.stringify(checkItem) == JSON.stringify(item)) && true || false;
    },
    isCheckWJX(item) {
      return this.selectionDisabled && this.selectionDisabled(item);
    },
    setCheckList(checkList) {
      this.checkList = checkList;
    },
    getCheckList() {
      return [...this.checkList];
    },
    checkChange() {
      this.$emit('checkChange', this.getCheckList());
    },
    clearCheckList() {
      this.isCheckAll = false;
      this.checkList = [];
    }
  }
};
