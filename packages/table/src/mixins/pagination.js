export default {
  data() {
    return {
      pagination: {
        pageNo: this.page && this.page.pageNo || 1,
        pageSize: this.page && this.page.pageSize || 10
      }
    };
  },
  methods: {
    setPageNo(val, size) {
      this.pagination.pageNo = val;
      this.pagination.pageSize = size;
      this.pageChange();
    },
    getPage() {
      return {...this.pagination};
    },
    pageChange() {
      this.$emit('pageChange', this.getPage());
    }
  }
};
