var settings = {
  regExp: {
    bracket: /\[(.*)\]/i,
    escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    flags: /^\/(.*)\/(.*)?/,
    phone: /^1[3456789]\d{9}$/,
    email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    integer: /^\-?\d+$/,
    number: /^\-?\d*(\.\d+)?$/,
    float: /^\d*(\.)\d+/,
    url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
  },
  typeName: {
    string: 'string类型',
    integer: 'integer类型',
    boolean: 'boolean类型',
    array: 'array类型',
    object: 'object类型',
    float: '浮点数',
    date: 'date类型',
    phone: '手机号',
    email: '邮箱',
    url: 'url'
  },
  templates: {
    empty: '${name}为必填字段',
    type: '${name}必须为',
    min: '${name}必须大于等于${min}',
    minstring: '${name}长度必须大于等于${min}',
    max: '${name}必须小于等于${max}',
    maxstring: '${name}长度必须小于等于${max}',
    range: '${name}必须在${min}-${max}之间',
    rangestring: '${name}长度必须在${min}-${max}之间',
    equal: '${name}必须等于${equal}',
    equalstring: '${name}长度必须等于${equal}'
  },
  rules: { // 返回 true 校验通过
    // 判断必填项是否为空
    empty: function(value) {
      return !(settings.utils.isEmpty(value) || Array.isArray(value) && value.length === 0);
    },

    // 判断类型 目前支持 string、integer、boolean、array、object、float、date、phone、email、url
    type: function(value, params = {is: void 0}) {
      if (value === void 0 || params.is === void 0) {
        return true;
      }
      if (params.is === 'integer') {
        return settings.regExp.integer.test(value);
      } else if (params.is === 'string') {
        return typeof value === 'string';
      } else if (params.is === 'boolean') {
        return typeof value === 'boolean';
      } else if (params.is === 'array') {
        return Array.isArray(value);
      } else if (params.is === 'object') {
        return Object.prototype.toString.call(value) === '[object Object]';
      } else if (params.is === 'float') {
        return settings.regExp.float.test(value);
      } else if (params.is === 'date') {
        return Object.prototype.toString.call(value) === '[object Date]';
      } else if (params.is === 'phone') {
        return settings.regExp.phone.test(value);
      } else if (params.is === 'email') {
        return settings.regExp.email.test(value);
      } else if (params.is === 'url') {
        return settings.regExp.url.test(value);
      }
      return settings.utils.isEmpty(value) || typeof value === params.is;
    },

    // 根据类型判断 int 判断最小值 ，string 、array 判断最小长度
    min: function(value, params = { min: void 0 }) {
      value = settings.utils.transform(value, params.transform);
      params.min = settings.utils.transform(params.min, params.transform);
      if (typeof value === 'string' || Array.isArray(value)) {
        return value.length >= params.min;
      }
      return settings.utils.isEmpty(value) || settings.utils.isEmpty(params.min) || value >= params.min;
    },

    // 根据类型判断 int 判断最大值 ，string 、array 判断最大长度
    max: function(value, params = { max: void 0 }) {
      value = settings.utils.transform(value, params.transform);
      params.max = settings.utils.transform(params.max, params.transform);
      if (typeof value === 'string' || Array.isArray(value)) {
        return value.length <= params.max;
      }
      return settings.utils.isEmpty(value) || settings.utils.isEmpty(params.max) || value <= params.max;
    },

    // 根据类型判断 int 判断值范围 ，string 、array 判断长度范围
    range: function(value, params = { min: void 0 , max: void 0 }) {
      return settings.utils.isEmpty(value) || settings.rules.min(value, params) && settings.rules.max(value, params);
    },

    // 根据类型判断 int 判断值相等 ，string 、array 判断长度相等
    equal: function(value, params = { equal: void 0 }) {
      value = settings.utils.transform(value, params.transform);
      params.equal = settings.utils.transform(params.equal, params.transform);
      if (typeof value === 'string' || Array.isArray(value)) {
        return settings.utils.isEmpty(value) || value.length == params.equal;
      }
      return settings.utils.isEmpty(value) || settings.utils.isEmpty(params.equal) || value === params.equal;
    },

    // 根据正则表达式校验
    regExp: function(value, params = { regExp: void 0 }) {
      // console.log(typeof value,'typeof');
      if (typeof value === 'number') {
        value += '';
      }
      if (params.regExp instanceof RegExp) {
        // console.log(settings.utils.isEmpty(value), 'settings.utils.isEmpty(value)');
        // console.log(value?.match(params.regExp), 'value?.match(params.regExp)');
        return settings.utils.isEmpty(value) || value?.match(params.regExp);
      }
      var
        regExpParts = params.regExp.match(settings.regExp.flags),
        flags
        ;
      // regular expression specified as /baz/gi (flags)
      if (regExpParts) {
        params.regExp = regExpParts.length >= 2 ?
          regExpParts[1] :
          params.regExp
        ;
        flags = regExpParts.length >= 3 ?
          regExpParts[2] :
          ''
        ;
      }
      return settings.utils.isEmpty(value) || value?.match(new RegExp(params.regExp, flags));
    },

    // 自定义函数校验
    validator: function(value, params = { validator: void 0 }) {
      return params.validator === void 0 || params.validator(value, this);
    },

    // 转换类型后校验 如日期 string 转 date后在校验大小等等
    transform: function(value, params = { to: void 0, rule: void 0 }) {
      if (value === void 0 || params.to === void 0 || params.rule === void 0) {
        return true;
      }
      if (params.to == 'string') {
        value = typeof value === 'object' ? JSON.stringify(value) : value + '';
      } else if (params.to == 'date') {
        value = new Date(typeof value === 'string' ? value.replace(/-/g, '/') : value);
      } else if (params.to == 'number' || type == 'integer') {
        value = typeof value === 'string' ? value * 1 : value;
      }
      return settings.utils.isEmpty(value) || settings.rules[params.rule.type](value, params.rule);
    }
  },
  utils: {
    transform: function(value, type) {
      if (value === void 0 || value === null || value === '') {
        return value;
      }
      if (type == 'string') {
        return typeof value === 'object' ? JSON.stringify(value) : value + '';
      } else if (type == 'date') {
        return new Date(typeof value === 'string' ? value.replace(/-/g, '/') : value);
      } else if (type == 'number' || type == 'integer') {
        return typeof value === 'string' ? value * 1 : value;
      }
      return value;
    },
    isEmpty: function(value) {
      return value === '' || value === null || value === void 0;
    }
  }
};

export default settings;
