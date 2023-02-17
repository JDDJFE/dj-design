export default {
  title: 'Pagination 分页',
  describe: '当数据量过多时，使用分页分解数据。',
  templates: [
    {
      title: '基础用法',
      template: `<dj-pagination
        :total="total"
        :pageSize="10"
        :currentPage.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>`,
      data: {
        data() {
          return {
            currentPage: 1,
            total: 30
          };
        },
        methods: {
          handleSizeChange(val) {},
          handleCurrentChange(val, size) {}
        }
      }
    },
    {
      title: '边框分页',
      template: `<dj-pagination
        border
        :total="300"
        :pageSize="10"
        :currentPage="1"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>`,
      data: {
        data() {
          return {
            currentPage: 1,
            total: 30
          };
        },
        methods: {
          handleSizeChange(val) {},
          handleCurrentChange(val, size) {}
        }
      }
    },
    {
      title: '附加功能',
      describe: '输入框有大、小两种尺寸，默认大尺寸。',
      template: `<dj-pagination
        border
        :total="40300"
        :pageSize="10"
        :pageSizes="[10,20,30,5]"
        :currentPage="1"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>`,
      data: {
        data() {
          return {
            currentPage: 1,
            total: 30
          };
        },
        methods: {
          handleSizeChange(val) {
            console.log('11size', val);
          },
          handleCurrentChange(val, size) {
            console.log('2222', val, size);
          }
        }
      }
    },
    {
      title: '尺寸',
      template: `<dj-pagination
        border
        :total="300"
        :pageSize="10"
        :currentPage="1"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br />
      <dj-pagination
        border
        :total="300"
        :pageSize="10"
        :currentPage="1"
        size="small"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br />
      <dj-pagination
        :total="total"
        :pageSize="10"
        :currentPage.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>
      <br />
      <dj-pagination
        :total="total"
        :pageSize="10"
        size="small"
        :currentPage.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></dj-pagination>`,
      data: {
        data() {
          return {
            currentPage: 1,
            total: 30
          };
        },
        methods: {
          handleSizeChange(val) {},
          handleCurrentChange(val, size) {}
        }
      }
    }
  ]
};
