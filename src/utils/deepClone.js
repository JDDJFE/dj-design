function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

export default function deepClone(data) {
  // 获取传入拷贝函数的数据类型
  const type = typeOf(data);
  // 定义一个返回any类型的数据
  let reData;
  // 递归遍历一个array类型数据，
  if (type === 'array') {
    reData = [];
    for (let i = 0; i < data.length; i++) {
      reData.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    // 递归遍历一个object类型数据
    reData = {};
    for (const i in data) {
      reData[i] = deepClone(data[i]);
    }
  } else {
    // 返回基本数据类型
    return data;
  }
  // 将any类型的数据返回，作为deepClone的结果
  return reData;
}
