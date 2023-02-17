export default {
  title: 'DatePicker 测试',
  templates: [
    {
      title: '基础用法',
      template: `
      date：<dj-date-picker type="date" v-model="data" :clearable="false" @change="changeFN" @clear="clear" defaultTime="12:00:00"></dj-date-picker>{{data}}<br/>
      datetime：<dj-date-picker type="datetime" v-model="value" @change="changeFN" defaultTime="12:00:00"></dj-date-picker>{{value}}<br/>
      daterange：<dj-date-picker type="daterange" v-model="range0" @change="abc1" :defaultTime="['12:00:00','07:00:00']"></dj-date-picker>{{range0}}<br/>
      datetimerange：<dj-date-picker type="datetimerange" v-model="range1" @change="abc1" ></dj-date-picker>{{range1}}<br/>
      <dj-date-picker type="datetimerange" v-model="range2" @change="abc1" :minDate="minDate" :maxDate="maxDate" :defaultTime="['12:00:00','08:00:00']"></dj-date-picker>{{range2}}`,
      data: {
        data() {
          return {
            data: null,
            value: '',
            range0: [],
            range1: [],
            range2: ['2021-05-11 15:07:06', '2021-07-11 18:07:06'],
            minDate: new Date(2020, 2, 10, 8, 40),
            maxDate: new Date(2021, 5, 10, 8, 40),
            options: {
              disabledDate(time) {
                let curDate = new Date().getTime();
                let three = 90 * 24 * 3600 * 1000;
                let threeMonths = curDate - three;
                return time.getTime() > Date.now() || time.getTime() < threeMonths;
              },
              shortcuts: [
                {
                  text: 'Today',
                  value() {
                    return new Date();
                  },
                  onClick: (picker) => {
                    console.log(picker);
                    this.$message.info('Click today');
                  }
                },
                {
                  text: 'Yesterday',
                  value() {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    return date;
                  },
                  onClick: (picker) => {
                    this.$message.info('Click yesterday');
                  }
                },
                {
                  text: 'One week',
                  value() {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    return date;
                  },
                  onClick: (picker) => {
                    this.$message.info('Click a week ago');
                  }
                }
              ]
            }
          };
        },
        created() {
          setTimeout(() => {
            this.value = '2021-05-11 15:07:06';
          }, 1000);
        },
        methods: {
          clear(val) {
            console.log('无视-', val);
          },
          changeFN(val, str) {
            console.log('无视-', val, str);
          },
          abc1(val, str) {
            console.log('无视-', val, str);
          }
        }
      }
    }
  ]
};
