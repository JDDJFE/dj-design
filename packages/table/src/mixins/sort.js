export default {
  data() {
    return {
      currentSortField: '',
      order: ''
    };
  },
  methods: {
    onSort(field) {
      if (this.sortChange) {
        if (this.sortField && this.sortField != field) {
          this.order = '';
        }
      } else if (this.$parent.sortField != field) {
        this.order = '';
      }

      this.currentSortField = field;
      if (!this.order) {
        this.order = 'asc';
      } else if (this.order == 'asc') {
        this.order = 'desc';
      } else {
        this.order = '';
      }
      if (this.sortChange) {
        this.sortChange({ field: this.currentSortField, order: this.order });
      } else {
        this.$parent.sortChange({ field: this.currentSortField, order: this.order });
      }
    }
  }
};
