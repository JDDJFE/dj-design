export default {
  title: 'Collapse 折叠面板',
  describe: '折叠面板',
  templates: [
    {
      title: '基础功能',
      template: `
        <dj-collapse v-model="value" @change="onChange">
          <dj-collapse-item title="商家：菜大全超市，福建省/泰州市/高港区" code="1">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：果先锋水果捞，上海市/青浦区备份" code="2">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：买鲜菜，广东省/韶关市/曲江区备份" code="3">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：安心菜场，湖北省/黄冈市/罗田县备份" code="4">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
        </dj-collapse>
      `,
      data: {
        data() {
          return {
            value: ['1', '3']
          };
        },
        methods: {
          onChange(code, isShow) {
            console.log(code, isShow);
          }
        }
      }
    },
    {
      title: '自定义面板标题',
      template: `
        <dj-collapse v-model="value">
          <dj-collapse-item code="1">
            <template #title>
              这是自定义的标题
            </template>
            面板
          </dj-collapse-item>
          <dj-collapse-item title="面板2" code="2">
            面板
          </dj-collapse-item>
          <dj-collapse-item title="面板3" code="3">
            面板
          </dj-collapse-item>
          <dj-collapse-item title="面板4" code="4">
            面板
          </dj-collapse-item>
          <dj-collapse-item title="面板5" code="5">
            面板
          </dj-collapse-item>
        </dj-collapse>
      `,
      data: {
        data() {
          return {
            value: ['1', '3']
          };
        },
        methods: {}
      }
    },
    {
      title: '手风琴模式',
      template: `
        <dj-collapse v-model="value" accordion>
          <dj-collapse-item title="商家：菜大全超市，福建省/泰州市/高港区" code="1">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：果先锋水果捞，上海市/青浦区备份" code="2">
            <dj-collapse v-model="value2">
              <dj-collapse-item title="面板1" code="1">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板2" code="2">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板3" code="3">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板4" code="4">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板5" code="5">
                面板
              </dj-collapse-item>
            </dj-collapse>
          </dj-collapse-item>
          <dj-collapse-item title="商家：买鲜菜，广东省/韶关市/曲江区备份" code="3">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：安心菜场，湖北省/黄冈市/罗田县备份" code="4">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
        </dj-collapse>
      `,
      data: {
        data() {
          return {
            value: '2',
            value2: ['2']
          };
        },
        methods: {}
      }
    },
    {
      title: '面板嵌套',
      template: `
        <dj-collapse v-model="value">
          <dj-collapse-item title="商家：菜大全超市，福建省/泰州市/高港区" code="1">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：果先锋水果捞，上海市/青浦区备份" code="2">
            <dj-collapse v-model="value2">
              <dj-collapse-item title="面板1" code="1">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板2" code="2">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板3" code="3">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板4" code="4">
                面板
              </dj-collapse-item>
              <dj-collapse-item title="面板5" code="5">
                面板
              </dj-collapse-item>
            </dj-collapse>
          </dj-collapse-item>
          <dj-collapse-item title="商家：买鲜菜，广东省/韶关市/曲江区备份" code="3">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
          <dj-collapse-item title="商家：安心菜场，湖北省/黄冈市/罗田县备份" code="4">
            <div>
              <div>联系人： 王阿三</div>
              <div>地址：广东省韶关市曲江备份</div>
            </div>
          </dj-collapse-item>
        </dj-collapse>
      `,
      data: {
        data() {
          return {
            value: ['2'],
            value2: []
          };
        },
        methods: {}
      }
    }
  ]
};
