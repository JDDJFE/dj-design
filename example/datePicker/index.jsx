export default {
  title: 'DatePicker 日期选择器',
  describe: '选择或输入日期，支持年、月、日期等类型，支持选择范围。',
  templates: [
    {
      title: '基础用法',
      template: `
      date：<dj-date-picker type="date" v-model="data" :footerShow="false" :clearable="false" @change="changeFN" @clear="clear" ></dj-date-picker>{{data}}<br/>
      datetime：<dj-date-picker type="datetime" v-model="value" @change="changeFN"></dj-date-picker>{{value}}<br/>
      daterange：<dj-date-picker type="daterange" v-model="range0" @change="abc1"></dj-date-picker>{{range0}}<br/>
      datetimerange：<dj-date-picker type="datetimerange" v-model="range1" @change="abc1" ></dj-date-picker>{{range1}}<br/>
      <dj-date-picker type="datetimerange" v-model="range2" @change="abc1" :minDate="minDate" :maxDate="maxDate"></dj-date-picker>{{range2}}`,
      data: {
        data() {
          return {
            data: null,
            value: '',
            range0: [],
            range1: [],
            range2: ['2021-05-11 15:07:06', '2021-07-11 18:07:06'],
            minDate: new Date(2020, 2, 10, 8, 40),
            maxDate: new Date(2021, 5, 10, 8, 40)
          };
        },
        created() {
          setTimeout(() => {
            this.value = '2021-05-11 15:07:06';
          }, 1000);
        },
        methods: {
          clear(val) {
            console.log(val);
          },
          changeFN(val, str) {
            console.log(val, str);
          },
          abc1(val, str) {
            console.log(val, str);
          }
        }
      }
    },
    {
      title: '初始时刻',
      template: `
      date：<dj-date-picker type="date" v-model="data" :clearable="false" @change="changeFN" @clear="clear" defaultTime="12:32:30"></dj-date-picker>{{data}}<br/>
      datetime：<dj-date-picker type="datetime" v-model="value" @change="changeFN"  defaultTime="12:32:30"></dj-date-picker>{{value}}<br/>
      daterange：<dj-date-picker type="daterange" v-model="range0" @change="abc1" :defaultTime="['12:32:30','07:33:2']"></dj-date-picker>{{range0}}<br/>
      datetimerange：<dj-date-picker type="datetimerange" v-model="range1" @change="abc1" :defaultTime="['12:34:00','23:59:59']"></dj-date-picker>{{range1}}<br/>
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
            maxDate: new Date(2021, 5, 10, 8, 40)
          };
        },
        created() {
        },
        methods: {
          clear(val) {
            console.log(val);
          },
          changeFN(val, str) {
            console.log(val, str);
          },
          abc1(val, str) {
            console.log(val, str);
          }
        }
      }
    },
    {
      title: '年月周',
      template: `year：<dj-date-picker type="year" v-model="value1"></dj-date-picker><br/>
      month：<dj-date-picker type="month" v-model="value2"></dj-date-picker><br/>
      week：<dj-date-picker type="week" v-model="value3"></dj-date-picker>`,
      data: {
        data() {
          return {
            value1: '',
            value2: '',
            value3: ''
          };
        },
        methods: {
          changes(val, obj) {
            console.log(val, obj);
          }
        }
      }
    },
    {
      title: '日期格式 format',
      template: `<dj-date-picker type="datetime" v-model="range" format="yyyy/MM/dd HH:mm" separator="至"></dj-date-picker>
      <dj-date-picker type="week" v-model="week1" format="yyyy 第 WW 周"></dj-date-picker>`,
      data: {
        data() {
          return {
            range: '',
            week1: ''
          };
        }
      }
    },
    {
      title: '快捷选择 shortcuts',
      template: `<dj-date-picker  type="date" v-model="value1" :pickerOptions="options1" ></dj-date-picker>
      <dj-date-picker  type="datetime" v-model="value2" :pickerOptions="options1"></dj-date-picker>
      <dj-date-picker type="datetimerange" v-model="value3" :pickerOptions="options2" :defaultTime="['12: 30: 00','07: 00: 00']"></dj-date-picker>`,
      data: {
        data() {
          return {
            value1: '',
            value2: '',
            value3: '',
            options1: {
              shortcuts: [
                {
                  text: '今天',
                  value() {
                    return new Date();
                  },
                  onClick: (picker) => {
                    this.$message.success(picker);
                  }
                },
                {
                  text: '昨天',
                  value() {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    return date;
                  },
                  onClick: (picker) => {
                    this.$message.success(picker);
                  }
                },
                {
                  text: '一周',
                  value() {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    return date;
                  },
                  onClick: (picker) => {
                    this.$message.success(picker);
                  }
                }
              ]
            },
            options2: {
              shortcuts: [{
                text: '最近一周',
                value() {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  return [start, end];
                },
                onClick(picker) {
                }
              }, {
                text: '最近一个月',
                value() {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  return [start, end];
                },
                onClick(picker) {
                }
              }, {
                text: '最近三个月',
                value() {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  return [start, end];
                },
                onClick(picker) {
                }
              }]
            }
          };
        }
      }
    },
    {
      title: '禁用 disabledDate',
      template: `
      <dj-date-picker type="date" v-model="value1" :pickerOptions="options"></dj-date-picker>`,
      data: {
        data() {
          return {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            options: {
              disabledDate(time) {
                let curDate = new Date().getTime();
                let three = 90 * 24 * 3600 * 1000;
                let threeMonths = curDate - three;
                return time.getTime() > Date.now() || time.getTime() < threeMonths;
              }
            }
          };
        },
        methods: {
          changes(val, obj) {
            console.log(val, obj);
          }
        }
      }
    },
    {
      title: '设置日期 className',
      template: `
      <dj-date-picker type="date" v-model="value" :pickerOptions="options"></dj-date-picker>`,
      data: {
        data() {
          return {
            value: '',
            options: {
              cellClass(date) {
                let w = ['2021-02-01', '2021-03-02'];
                let y = date.getFullYear().toString();
                let m = (date.getMonth() + 1).toString();
                let d = date.getDate().toString();
                let day = `${y}-${m.length === 1 ? '0' + m : m}-${d.length === 1 ? '0' + d : d}`;
                if (w.includes(day)) {
                  return 'day';
                }
              }
            }
          };
        },
        methods: {
        }
      }
    },
    {
      title: '尺寸 size',
      template: `
      <dj-date-picker type="date" v-model="value" size="large"></dj-date-picker>
      <dj-date-picker type="date" v-model="value"></dj-date-picker>
      <dj-date-picker type="date" v-model="value" size="small"></dj-date-picker>
      <dj-date-picker type="date" v-model="value" size="mini"></dj-date-picker>`,
      data: {
        data() {
          return {
            value: ''
          };
        }
      }
    },
    {
      title: '选择当天的范围',
      template: `<dj-date-picker @toChange="toChange"  :defaultTime="['12: 30: 00','07: 00: 00']" @fromChange="fromChange" type="datetimerange" v-model="range" separator="至" :pickerOptions="pickerOptions1"></dj-date-picker>`,
      data: {
        data() {
          return {
            range: '',
            pickerOptions1: {}
          };
        },
        methods: {
          toChange() {
            this.pickerOptions1 = {};
          },
          fromChange(val) {
            this.pickerOptions1 = {
              disabledDate(time) {
                let curDate = new Date(val).getTime();
                let three = 8 * 24 * 3600 * 1000;
                let threeMonths = curDate - three;
                return time.getTime() > curDate || time.getTime() < threeMonths;
              }
            };
          }
        }
      }
    }
  ]
};
