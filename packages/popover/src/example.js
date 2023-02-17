let form = [
  {
    type: 'input',
    label: '活动名称',
    field: 'activityName',
    controls: {
      type: 'number',
      unit: '单位',
      placeholder: '请输入活动名称...',
      size: 'small',
      style: {width: 100},
    },
    event: {
      change: {}
    }
  },
  {
    type: 'select',
    label: '活动类型',
    field: 'activityType',
    controls: {
      items: [
        {value: '1', label: '普通活动'},
        {value: '2', label: '满减活动'},
        {value: '3', label: '地推活动'},
        {value: '4', label: '兑换活动'},
        {value: '5', label: '定向推送'},
        {value: '6', label: '红包活动'},
        {value: '7', label: '随机券活动'}
      ],
      placeholder: '请输入活动类型...',
      size: 'small',
      style: {width: 100},
      change: () => {
      },
      blur: () => {
      }
    }
  },
  {
    type: 'form',
    label: '套form',
    body: [
      {
        type: 'input',
        label: '活动名称',
        field: 'activityName',
        controls: {
          type: 'number',
          unit: '单位',
          placeholder: '请输入活动名称...',
          size: 'small',
          style: {width: 100},
          change: () => {
          },
          blur: () => {
          }
        }
      }
    ]
  },
  {
    type: 'tab',
    label: 'tab',
    body: [
      {
        type: 'form',
        label: '套form',
        body: [
          {
            type: 'input',
            label: '活动名称',
            field: 'activityName',
            empty: true,
            zidingyijiaoyan: () => {
            },
            controls: {
              type: 'number',
              unit: '单位',
              placeholder: '请输入活动名称...',
              size: 'small',
              style: {width: 100},
              change: () => {
              },
              blur: () => {
              }
            }
          }
        ]
      }
    ]
  },
  {
    type: 'foot',
    label: '尾部',
    body: [
      {
        type: 'button', text: '取消', controls: {
          type: 'primary',
          click: () => {
          }
        }
      },
      {type: 'spacing'},
      {
        type: 'button', text: '保存', controls: {
          type: 'primary',
          click: () => {
          }
        }
      }
    ]
  }
];
let modal = [
  {
    title: 'xxx',
    style: {width: 100},
    body: '<div></div>',
    actions: [
      {
        type: 'button', text: '取消', controls: {
          type: 'primary',
          click: () => {
          }
        }
      },
      {
        type: 'button', text: '保存', controls: {
          type: 'primary',
          click: () => {
          }
        }
      },
    ]
  }
];
