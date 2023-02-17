export default {
  title: 'Tag 标签',
  templates: [
    {
      title: '基本用法',
      template: `<dj-tag class="mr10"><a href="./">首页</a></dj-tag>
      <dj-tag class="mr10">默认标签</dj-tag>
      <dj-tag class="mr10" type="success">success</dj-tag>
      <dj-tag class="mr10" type="processing">processing</dj-tag>
      <dj-tag class="mr10" type="error">error</dj-tag>
      <dj-tag class="mr10" type="warning">warning</dj-tag>
      <dj-tag class="mr10" type="default">default</dj-tag>`
    },
    {
      title: '不同主题的标签',
      template: `
        <dj-tag v-for="item in items" class="mr10 mb10" :type="item.type" :key="item.label" effect="dark">
          {{item.label}}
        </dj-tag>
        <br/>
        <dj-tag v-for="item in items" class="mr10" :type="item.type" :key="item.label+'plain'" effect="plain">
          {{item.label}}
        </dj-tag>`,
      data: {
        data() {
          return {
            items: [
              {type: 'success', label: 'success'},
              {type: 'processing', label: 'processing'},
              {type: 'error', label: 'error'},
              {type: 'warning', label: 'warning'},
              {type: 'default', label: 'default'}
            ]
          };
        }
      }
    },
    {
      title: '自定义颜色',
      template: `<dj-tag class="mr10" color="#7979ff" effect="dark">#7979ff</dj-tag>
      <dj-tag class="mr10" color="#2db7f5" effect="dark">#2db7f5</dj-tag>
      <dj-tag class="mr10" color="#87d068" effect="dark">#87d068</dj-tag>
      <dj-tag class="mr10" color="#7979ff" effect="plain">#7979ff</dj-tag>
      <dj-tag class="mr10" color="#2db7f5" effect="plain">#2db7f5</dj-tag>
      <dj-tag class="mr10" color="#87d068" effect="plain">#87d068</dj-tag>
      <dj-tag class="mr10" color="#7979ff">#7979ff</dj-tag>
      <dj-tag class="mr10" color="#2db7f5">#2db7f5</dj-tag>
      <dj-tag class="mr10" color="#87d068">#87d068</dj-tag>`
    },
    {
      title: '不同尺寸 & 圆角',
      template: `<dj-tag class="mr10">默认标签</dj-tag>
      <dj-tag class="mr10" size="medium" :closable="true">中等标签</dj-tag>
      <dj-tag class="mr10" size="small" :closable="true">小型标签</dj-tag>
      <dj-tag class="mr10" size="mini" :closable="true">超小标签</dj-tag>
      <dj-tag class="mr10" circular>默认标签</dj-tag>
      <dj-tag class="mr10" size="medium" :closable="true" circular>中等标签</dj-tag>
      <dj-tag class="mr10" size="small" :closable="true" circular>小型标签</dj-tag>
      <dj-tag class="mr10" size="mini" :closable="true" circular>超小标签</dj-tag>`
    },
    {
      title: '图标标签',
      template: `<div class="mb10">
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="dark" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="dark" size="medium" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="dark" size="small" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="dark" size="mini" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="plain" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="plain" size="medium" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="plain" size="small" :closable="true">图标一</dj-tag>
      <dj-tag class="mr10" color="#7979ff" icon="user1" effect="plain" size="mini" :closable="true">图标一</dj-tag>
    </div>
    <dj-tag class="mr10" icon="user1" :closable="true" size="" effect="dark" type="success">success</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="" effect="dark" type="processing">processing</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="medium" effect="dark" type="error">error</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="small" effect="dark" type="warning">warning</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="mini" effect="dark" type="default">default</dj-tag>
    <div class="mb10"/>
    <dj-tag class="mr10" icon="user1" :closable="true" size="" effect="" type="success">success</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="" effect="" type="processing">processing</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="medium" effect="" type="error">error</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="small" effect="" type="warning">warning</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="mini" effect="" type="default">default</dj-tag>
    <div class="mb10"/>
    <dj-tag class="mr10" icon="user1" :closable="true" size="" effect="plain" type="success">success</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="" effect="plain" type="processing">processing</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="medium" effect="plain" type="error">error</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="small" effect="plain" type="warning">warning</dj-tag>
    <dj-tag class="mr10" icon="user1" :closable="true" size="mini" effect="plain" type="default">default</dj-tag>`
    },
    {
      title: '动态添加和删除',
      template: `
        <dj-tag v-for="item in tagList" class="mr10" :key="item" :closable="true" @close="handleClose(item)">
          {{item}}
        </dj-tag>
        <dj-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @enter="handleInputConfirm"
          @blur="handleInputConfirm"
          style="height: 32px; vertical-align: top; width: 120px;"
        >
        </dj-input>
        <dj-button v-else class="button-new-tag" size="small" @click="showInput"
                   style="height: 32px; vertical-align: top; width: 120px;">+ New Tag
        </dj-button>`,
      data: {
        data() {
          return {
            tagList: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
          };
        },
        methods: {
          handleClose(tag) {
            this.tagList.splice(this.tagList.indexOf(tag), 1);
            console.log('删除后：', this.tagList);
          },
          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },
          handleInputConfirm() {
            // console.log('handleInputConfirm');
            let inputValue = this.inputValue;
            if (inputValue && this.tagList.indexOf(inputValue) === -1) {
              this.tagList.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
            console.log('添加后：', this.tagList);
          }
        }
      }
    },
    {
      title: '可选择标签',
      template: `
        <dj-tag v-for="item in tagList" class="mr10" :key="item" effect="dark"
                :checkable="true" :checked="chooseList.indexOf(item) > -1"
                @change="(checked)=>handleChange(item,checked)"
        >
          {{item}}
        </dj-tag>
        <dj-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @enter="handleInputConfirm"
          @blur="handleInputConfirm"
          style="height: 32px; vertical-align: top; width: 120px;"
        >
        </dj-input>
        <dj-button v-else class="button-new-tag" size="small" @click="showInput"
                   style="height: 32px; vertical-align: top; width: 120px;">+ New Tag
        </dj-button>`,
      data: {
        data() {
          return {
            tagList: ['标签一', '标签二', '标签三'],
            chooseList: [],
            inputVisible: false,
            inputValue: ''
          };
        },
        methods: {
          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },
          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue && this.tagList.indexOf(inputValue) === -1) {
              this.tagList.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
          },
          handleChange(tag, checked) {
            // let nextSelectedTags = checked ? [...this.chooseList, tag] : this.chooseList.filter(t => t !== tag);
            let nextSelectedTags = checked ? this.chooseList.concat(tag) : this.chooseList.filter(t => t !== tag);
            console.log('You are interested in: ', nextSelectedTags);
            this.chooseList = nextSelectedTags;
          }
        }
      }
    },
    {
      title: '动态添加和删除 & 可选择标签',
      template: `
        <dj-button class="button-new-tag" size="small" @click="manageTagsFun"
                   style="height: 32px; vertical-align: top; width: 150px;">
          {{manageTagsStatus ? '关闭管理标签' : '管理标签'}}
        </dj-button>
        <br/>
        <br/>
        <dj-tag v-for="item in tagList" class="mr10" :key="item" effect="dark"
                :checkable="!manageTagsStatus" :checked="chooseList.indexOf(item) > -1" :closable="manageTagsStatus"
                @change="(checked)=>handleChange(item,checked)"
                @close="handleClose(item)"
                @click="handleClick(item)"
        >
          {{item}}
        </dj-tag>
        <dj-input
          class="input-new-tag"
          v-if="inputVisible&&!manageTagsStatus"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @enter="handleInputConfirm"
          @blur="handleInputConfirm"
          style="height: 32px; vertical-align: top; width: 120px;"
        >
        </dj-input>
        <dj-button v-if="!manageTagsStatus&&!inputVisible" class="button-new-tag" size="small" @click="showInput"
                   style="height: 32px; vertical-align: top; width: 120px;">+ New Tag
        </dj-button>`,
      data: {
        data() {
          return {
            tagList: ['标签一', '标签二', '标签三'],
            chooseList: [],
            inputVisible: false,
            inputValue: '',
            manageTagsStatus: false
          };
        },
        methods: {
          handleClose(tag) {
            if (this.tagList.indexOf(tag) > -1) {
              this.tagList.splice(this.tagList.indexOf(tag), 1);
            }
            if (this.chooseList.indexOf(tag) > -1) {
              this.chooseList.splice(this.chooseList.indexOf(tag), 1);
            }
          },
          manageTagsFun() {
            this.manageTagsStatus = !this.manageTagsStatus;
          },
          showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          },
          handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue && this.tagList.indexOf(inputValue) === -1) {
              this.tagList.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
          },
          handleChange(tag, checked) {
            // let nextSelectedTags = checked ? [...this.chooseList, tag] : this.chooseList.filter(t => t !== tag);
            let nextSelectedTags = checked ? this.chooseList.concat(tag) : this.chooseList.filter(t => t !== tag);
            console.log('You are interested in: ', nextSelectedTags);
            this.chooseList = nextSelectedTags;
          },
          handleClick(tag) {
            console.log('你点击了: ', tag);
          }
        }
      }
    }
  ]
};
