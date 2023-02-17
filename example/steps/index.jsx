export default {
  title: 'Steps步骤条',
  templates: [
    {
      title: '基本用法',
      template: `
        <dj-steps :active="active" @change="stepChange">
          <dj-step title="Finished" description="This is a description."/>
          <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description."/>
          <dj-step title="Waiting" description="This is a description."/>
        </dj-steps>
        <dj-button v-if="active<2" type="primary" style="margin-top: 12px;margin-right: 10px;" @click="next('active')">
          下一步
        </dj-button>
        <dj-button v-if="active===2" style="margin-top: 12px;margin-right: 10px;" @click="complete()">完成</dj-button>
        <dj-button v-if="active>0" style="margin-top: 12px;" @click="prev('active')">上一步</dj-button>`,
      data: {
        data() {
          return {
            active: 0
          };
        },
        methods: {
          stepChange(newVal, oldVal) {
            console.log(newVal, oldVal);
          },
          next(key) {
            this[key]++;
          },
          prev(key) {
            this[key]--;
          },
          complete() {
            alert('已完成');
          }
        }
      }
    },
    {
      title: '迷你版的步骤条',
      template: `<dj-steps :active="1" size="small">
    <dj-step title="Finished" description="This is a description."/>
    <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description." status="error"/>
    <dj-step title="Waiting" description="This is a description."/>
  </dj-steps>`
    },
    {
      title: '竖直方向的步骤条',
      template: `<dj-steps :active="1" direction="vertical">
        <dj-step title="Finished" description="This is a description."/>
        <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description."/>
        <dj-step title="Waiting" description="This is a description."/>
      </dj-steps>`
    },
    {
      title: '竖直方向的小型步骤条',
      template: `<dj-steps :active="1" size="small" direction="vertical">
        <dj-step title="Finished" description="This is a description."/>
        <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description."/>
        <dj-step title="Waiting" description="This is a description."/>
      </dj-steps>`
    },
    {
      title: '带图标的步骤条',
      template: `
        <dj-steps :active="active2">
          <dj-step title="Finished" description="This is a description." icon="home"/>
          <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description." icon="user1"/>
          <dj-step title="Waiting" description="This is a description." icon="order"></dj-step>
        </dj-steps>
        <dj-button v-if="active2<2" type="primary" style="margin-top: 12px;margin-right: 10px;"
                   @click="next('active2')">
          下一步
        </dj-button>
        <dj-button v-if="active2===2" style="margin-top: 12px;margin-right: 10px;" @click="complete()">完成</dj-button>
        <dj-button v-if="active2>0" style="margin-top: 12px;" @click="prev('active2')">上一步</dj-button>`,
      data: {
        data() {
          return {
            active2: 0
          };
        },
        methods: {
          next(key) {
            this[key]++;
          },
          prev(key) {
            this[key]--;
          },
          complete() {
            alert('已完成');
          }
        }
      }
    },
    {
      title: '点状步骤条',
      template: `<dj-steps :active="1" :simple="true">
        <dj-step title="Finished" description="This is a description."/>
        <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description."/>
        <dj-step title="Waiting" description="This is a description." icon="icon-kefu"></dj-step>
      </dj-steps>`
    },
    {
      title: '竖直方向的点状步骤条',
      template: `<dj-steps :active="1" :simple="true" direction="vertical">
        <dj-step title="Finished" description="This is a description."/>
        <dj-step title="In Progress" subTitle="Left 00:00:08" description="This is a description."/>
        <dj-step title="Waiting" description="This is a description." icon="icon-kefu"></dj-step>
      </dj-steps>`
    }
  ]
};
