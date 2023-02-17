export default {
  data() {
    return {
    };
  },
  methods: {
    onTree(item, index) {
      if (!item) {
        return false;
      }
      if (item.showChildren) {
        let removeChild = this.tableData.filter(item1 => item1.parent == item);
        removeChild.filter(item1 => item1.showChildren).forEach(item1 => {
          this.onTree(item1);
        });
        this.$remove(this.tableData, removeChild);
        item.showChildren = false;
        // fix: 支持默认展开所有子级
        this.$emit('update:expandTreeAll', false);
      } else {
        item.showChildren = true;
        if (item.row[this.tree.children] && item.row[this.tree.children].length) {
          item.row[this.tree.children].forEach((children, i) => {
            this.tableData.splice(index + i + 1, 0, { row: children, parent: item, level: item.level + 1, showChildren: false, loading: false });
          });
        } else {
          item.loading = true;
          this.tree.load && this.tree.load(item.row, (childrens) => {
            item.loading = false;
            item.row[this.tree.children] = childrens;
            childrens.forEach((children, i) => {
              this.tableData.splice(index + i + 1, 0, { row: children, parent: item, level: item.level + 1, showChildren: false, loading: false });
            });
          });
        }
      }
    },
    refreshTree() {
      let _this = this;
      let oldData = this.$copy(this.tableData);
      let newData = oldData.filter(item => item && item.level == 0);
      let oldCount = newData.length, count = 0;
      let dataEach = (data, level) => {
        const filterRes = data.filter(oItem => {
          let temp = oldData.find(item => JSON.stringify(item.row) == JSON.stringify(level == 0 ? oItem.row : oItem));
          return temp ? temp.showChildren : false;
        });
        // console.log(filterRes, 'filterRes');
        filterRes.forEach((oItem, index) => {
          oItem.showChildren = true;
          let treeExpand = (item, index) => {
            (level == 0 ? item.row : item)[_this.tree.children]?.forEach((child, i) => {
              let temp = oldData.find(item => JSON.stringify(item.row) == JSON.stringify(child));
              let parent = level == 0 ? item : newData.find(pitem => JSON.stringify(pitem.row) == JSON.stringify(item));
              let parentIndex = newData.findIndex(pitem => JSON.stringify(pitem.row) == JSON.stringify(parent.row));
              newData.splice(parentIndex + i + 1, 0, { row: child, parent: parent, level: level + 1, showChildren: temp ? temp.showChildren : false, loading: false });
            });
          };
          treeExpand(oItem, index, newData);
          let nchildren = level == 0 ? oItem.row[_this.tree.children] || [] : oItem[_this.tree.children] || [];
          count += nchildren.length;
          dataEach(nchildren, level + 1);
        });
      };
      dataEach(newData, 0);
      if (oldData.length != oldCount + count) {
        _this.tableData = newData;
      }
    }
  }
};
