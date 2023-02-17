export default {
  title: 'Table 表格',
  templates: [
    { title: '基础用法',
      template: `<dj-table :data="tableData">
        <dj-table-column field="age" :width="60">
          <template slot="header">
            <dj-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></dj-checkbox>
          </template>
          <template slot-scope="scope">
            {{checkList}}
            <dj-checkbox-group v-model="checkList" @change="handleCheckedAll" style="display:block;">
              <dj-checkbox :code="scope.row.name""></dj-checkbox>
            </dj-checkbox-group>
          </template>
        </dj-table-column>
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
        <dj-table-column label="状态">
          <template slot-scope="scope">
            <dj-badge color="orange"></dj-badge>
            <dj-badge color="gray"></dj-badge>
            <dj-badge color="#F56C6C"></dj-badge>
          </template>
        </dj-table-column>
        <dj-table-column label="操作" :width="120">
          <template slot-scope="scope">
            <dj-button @click="onEdit(scope.row)">编辑</dj-button>
            <span class="spacing mini"></span>
            <dj-button @click="onDel(scope.row)">删除</dj-button>
          </template>
        </dj-table-column>
      </dj-table>`,
      data: {
        data() {
          return {
            isIndeterminate: false,
            checkAll: [],
            checkList: [],
            tableData: [{name: '张三', age: 18}, {name: '李四', age: 21}]
          };
        },
        methods: {
          handleCheckAllChange() {

          },
          handleCheckedAll() {

          }
        }
      }
    }, {
      title: '斑马线',
      template: `<dj-table :data="tableData" striped>
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }, { name: '王五', age: 21 }, { name: '赵柳', age: 20 }]
          };
        },
        methods: {
        }
      }
    }, {
      title: '支持排序',
      template: `<dj-table :data="tableData" @sortChange="order">
        <dj-table-column label="姓名" field="name" sort/>
        <dj-table-column label="年龄" field="age" sort/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }, { name: '王五', age: 21 }, { name: '赵柳', age: 20 }]
          };
        },
        methods: {
          order(order) {
            console.log('排序参数：', order);
          }
        }
      }
    }, {
      title: '带分页',
      template: `<dj-table :data="tableData" :page="page" @pageChange="onPage">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }],
            page: {pageSize: 10, pageNo: 1, totalCount: 11, pageSizes: [5, 10, 20, 30]}
          };
        },
        methods: {
          onPage(page) {
            console.log(page);
          }
        }
      }
    }, {
      title: '带多选',
      template: `<dj-table ref="table" :data="tableData" :selection="true" selectionType="radio" :selectionDisabled="selectionDisable" @checkChange="checkChange">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>
      <br>
      <dj-button @click="getCheck">getCheck</dj-button>
      <dj-button @click="pageOne">第一页</dj-button>
      <dj-button @click="pageTow">第二页</dj-button>`,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }, { name: '王五', age: 21 }, { name: '赵三', age: 20 }]
          };
        },
        methods: {
          selectionDisable(val) {
            return val.age == 18;
          },
          checkChange(checkList) {
            console.log(checkList);
          },
          getCheck() {
            console.log(this.$refs.table.getCheckList());
          },
          pageOne() {
            this.tableData = [{ name: '张三', age: 18 }, { name: '李四', age: 21 }];
          },
          pageTow() {
            this.tableData = [{ name: '张欢', age: 19 }, { name: '李小狗', age: 24 }];
          }
        }
      }
    }, {
      title: '自定义模板',
      template: `<dj-table :data="tableData">
        <dj-table-column :label="nameLabel" field="name"/>
        <dj-table-column field="age">
          <template slot="header">{{ageLabel}}</template>
          <template slot-scope="scope">
            {{scope.row.age}}
             <dj-badge></dj-badge>
          </template>
        </dj-table-column>
        <dj-table-column field="age">
          <template slot="header"><dj-input v-model="keyword" placeholder="搜索关键字..."/></template>
          <template slot-scope="scope">
            <dj-button  @click="onDel(scope)">删除</dj-button>
          </template>
        </dj-table-column>
      </dj-table>
      <br>
      <dj-button @click="onTest">测试修改数据</dj-button>`,
      data: {
        data() {
          return {
            keyword: '',
            nameLabel: '姓名',
            ageLabel: '年龄',
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }]
          };
        },
        methods: {
          onTest() {
            this.nameLabel = '姓名1';
            this.ageLabel = '年龄2';
            this.tableData = [{ name: '张三1', age: 28 }, { name: '李四1', age: 31 }];
          },
          onDel(scope) {
            this.$remove(scope.parent, scope.row);
          }
        }
      }
    }, {
      title: '带loading',
      template: `<dj-table ref="table" :loading="loading" :data="tableData">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>
      <br>
      <dj-button @click="showLoading">loading</dj-button>
      <dj-button @click="closeLoading">close</dj-button>
      `,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }],
            loading: true
          };
        },
        mounted() {
          // this.$refs.table.showLoading(); // 必须在table元素挂载后才可调用loading，不能再created中调用loading
        },
        methods: {
          showLoading() {
            this.loading = true;
            // 也可以使用 this.$refs.table.showLoading();
          },
          closeLoading() {
            this.loading = false;
            // 也可以使用 this.$refs.table.closeLoading();
          }
        }
      }
    }, {
      title: '固定表头',
      template: `<dj-table :data="tableData" :page="page" :selection="true" :height="200">
        <dj-table-column label="姓名" field="name" :width="100"/>
        <dj-table-column label="年龄" field="age" :width="100"/>
        <dj-table-column label="身高" field="height" :width="100"/>
        <dj-table-column label="体重" field="weight" :width="120"/>
        <dj-table-column label="户籍" field="register" :width="100"/>
        <dj-table-column label="地址" field="address" :width="300"/>
        <dj-table-column label="操作" :width="100">
          <template slot-scope="scope">
            <dj-button @click="onDel(scope.row)">删除</dj-button>
          </template>
        </dj-table-column>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [
              { name: '张三', age: 18, height: '173cm', weight: '60kg', register: '湖北', address: '湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX' },
              { name: '李四', age: 19, height: '163cm', weight: '70kg', register: '北京', address: '湖北省XX市XX县XXXXXX' },
              { name: '王五', age: 17, height: '170cm', weight: '80kg', register: '上海', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' }
            ],
            page: { pageSize: 10, pageNo: 1, totalCount: 11, pageSizes: [5, 10, 20, 30] }
          };
        },
        methods: {
          onDel(item) {
            this.$remove(this.tableData, item);
          }
        }
      }
    }, {
      title: '固定列',
      template: `<dj-table :data="tableData">
        <dj-table-column label="姓名" field="name" :width="150" fixed/>
        <dj-table-column label="年龄" field="age" :width="100" fixed/>
        <dj-table-column label="身高" field="height"/>
        <dj-table-column label="体重" field="weight"/>
        <dj-table-column label="户籍" field="register"/>
        <dj-table-column label="地址" field="address"/>
        <dj-table-column label="操作" :width="100" fixed>
          <template slot-scope="scope">
            <dj-button @click="onDel(scope.row)">删除</dj-button>
          </template>
        </dj-table-column>
      </dj-table>
      <dj-button @click="refresh()">切换数据</dj-button>`,
      data: {
        data() {
          return {
            tableData: [
              { name: '张三', age: 18, height: '173cm', weight: '60kg', register: '湖北', address: '湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX' },
              { name: '李四', age: 19, height: '163cm', weight: '70kg', register: '北京', address: '湖北省XX市XX县XXXXXX' }
            ]
          };
        },
        methods: {
          onDel(item) {
            this.$remove(this.tableData, item);
          },
          refresh() {
            if (this.tableData.length == 0) {
              this.tableData = [{ name: '李四', age: 19, height: '163cm', weight: '70kg', register: '北京', address: '湖北省XX市XX县' }];
            } else if (this.tableData.length == 1) {
              this.tableData = [{ name: '张三', age: 18, height: '173cm', weight: '60kg', register: '湖北', address: '湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX' },
                { name: '李四', age: 19, height: '163cm', weight: '70kg', register: '北京', address: '湖北省XX市XX县XXXXXX' }];
            } else if (this.tableData.length == 2) {
              this.tableData = [];
            }
          }
        }
      }
    }, {
      title: '固定头和列',
      template: `<dj-table :data="tableData" :page="page" :selection="true" :height="200">
        <dj-table-column label="姓名" field="name" :width="150" fixed/>
        <dj-table-column label="年龄" field="age" :width="100" fixed/>
        <dj-table-column label="身高" field="height" :width="150"/>
        <dj-table-column label="体重" field="weight" :width="120"/>
        <dj-table-column label="户籍" field="register" :width="150"/>
        <dj-table-column label="地址" field="address" :width="500"/>
        <dj-table-column label="操作" :width="100" fixed>
          <template slot-scope="scope">
            <dj-button @click="onDel(scope.row)">删除</dj-button>
          </template>
        </dj-table-column>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [
              { name: '张三', age: 18, height: '173cm', weight: '60kg', register: '湖北', address: '湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX湖北省XX市XX县XXXXXX' },
              { name: '李四', age: 19, height: '163cm', weight: '70kg', register: '北京', address: '湖北省XX市XX县XXXXXX' },
              { name: '王五', age: 17, height: '170cm', weight: '80kg', register: '上海', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' },
              { name: '赵四', age: 17, height: '166cm', weight: '55kg', register: '广州', address: '湖北省XX市XX县XXXXXX' }
            ],
            page: { pageSize: 10, pageNo: 1, totalCount: 11, pageSizes: [5, 10, 20, 30] }
          };
        },
        methods: {
          onDel(item) {
            this.$remove(this.tableData, item);
          }
        }
      }
    }, {
      title: '带状态',
      template: '带状态'
    }, {
      title: '拖拽排序',
      template: `<dj-table v-model="tableData" :draggable="true" @dragend="onOrder">
        <dj-table-column label="序号">
          <template slot-scope="scope">{{scope.index + 1}}</template>
        </dj-table-column>
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }, { name: '王五', age: 21 }, { name: '赵七', age: 21 }]
          };
        },
        methods: {
          onOrder(sortData) {
            console.log(sortData);
          }
        }
      }
    }, {
      title: '拖拽排序-手柄',
      template: `<dj-table v-model="tableData" :draggable="true" :draghandler="true" @dragend="onOrder">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }]
          };
        },
        methods: {
          onOrder(sortData) {
            console.log(sortData);
          }
        }
      }
    },
    {
      title: '树形结构',
      template: `<dj-table v-model="tableData" :default-expand-all.sync="expand" :tree="{children: 'children'}">
        <dj-table-column label="分类名称" field="name"/>
        <dj-table-column label="分类编号" field="id"/>
      </dj-table>`,
      data: {
        data() {
          return {
            expand: false,
            tableData: [{ name: '电子产品', id: 18, children: [{ name: '电脑用品', id: 101, children: [{ name: '笔记本', id: 1010, children: [{name: '笔记本11', id: 10101}] }, { name: '主机', id: 1011 }] }, { name: '数码用品', id: 102 }] }, { name: '服装', id: 21 }]
          };
        },
        methods: {
        }
      }
    },
    {
      title: '树形结构-懒加载',
      template: `<dj-table v-model="tableData" :tree="{children: 'children', hasChildren: 'hasChildren', load: load}">
        <dj-table-column label="分类名称" field="name"/>
        <dj-table-column label="分类编号" field="id"/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ name: '电子产品', id: 18, hasChildren: true}, { name: '服装', id: 21 }]
          };
        },
        methods: {
          load(parent, callback) {
            setTimeout(() => {
              callback([{ name: '电脑用品', id: 101, children: [{ name: '笔记本', id: 1010 }, { name: '主机', id: 1011 }] }, { name: '数码用品', id: 102 }]);
            }, 2000);
          }
        }
      }
    }, {
      title: '展开行',
      template: `<dj-table v-model="tableData" :tree="{children: 'children'}" @expandChange="expandChange">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
        <template v-slot:expand="scope">
          {{scope.row}}
        </template>
        <!-- <dj-table-expand v-slot:expand="scope">test{{scope}}</dj-table-expand> -->
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: [{ id: 1, name: '张三', age: 18, createTime: '2020-01-01 00:00:00' }, { id: 2, name: '李四', age: 21, createTime: '2020-01-01 00:00:00' }]
          };
        },
        methods: {
          expandChange(showExpand, row, event) {
            console.log(showExpand, row, event);
          }
        }
      }
    }, {
      title: '动态列',
      template: `<dj-table ref="table" :data="tableData">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column v-if="isHide" label="年龄" field="age"/>
        <dj-table-column v-for="(item, key) in columns" :key="key" :label="item.label" :field="item.field">
          <template v-slot="scope">
            <div v-if="item.field == 'age' && item.status && item.status[scope.row[item.field]]">{{item.status[scope.row[item.field]]}}</div>
            <div v-else>{{scope.row[item.field]}}</div>
          </template>
        </dj-table-column>
      </dj-table>
      <dj-button @click="onAdd()">添加列</dj-button>
      <dj-button @click="onDel()">删除列</dj-button>
      <dj-button @click="onHide()">影藏列</dj-button>
      `,
      data: {
        data() {
          return {
            tableData: [{ name: '张三', age: 18 }, { name: '李四', age: 21 }],
            obj: {},
            columns: [],
            isHide: true
          };
        },
        methods: {
          onAdd() {
            // let columns = this.$copy(this.columns);
            // let column = columns[1];
            // column.status = {
            //   '18': '我是18',
            //   '19': '我是19',
            //   '21': '我是21'
            // };
            // console.log(column);
            // // this.columns[1] = column;
            // this.columns = columns;
            // this.columns.push({});
            // setTimeout(() => {
            //   this.$refs.table.init();
            // }, 1);


            let column = 'column' + (this.columns.length + 1);
            this.columns.push({ label: '列' + (this.columns.length + 1), field: column});
            this.tableData.forEach(item => {
              item[column] = column;
            });
          },
          onDel() {
            this.columns.splice(this.columns.length - 1, 1);
          },
          onHide() {
            this.isHide = !this.isHide;
          }
        }
      }
    }, {
      title: 'empty',
      template: `<dj-table :data="tableData">
        <dj-table-column label="姓名" field="name"/>
        <dj-table-column label="年龄" field="age"/>
      </dj-table>`,
      data: {
        data() {
          return {
            tableData: []
          };
        },
        methods: {
        }
      }
    }
  ]
};
