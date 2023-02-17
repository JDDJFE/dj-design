import deepClone from '@/utils/deepClone';
function addLevel(arr, childrenKey, index = 0) {
  arr.forEach((item) => {
    item.level = index;
    if (item[childrenKey]) {
      addLevel(item[childrenKey], childrenKey, index + 1);
    }
  });
  return arr;
}
export default {
  addLevel,
  flatten(arr, datas) {
    const result = [];
    arr.forEach((item) => {
      result.push(item);
      if (item[datas.childrenKey]) {
        item[datas.childrenKey].forEach((child) => {
          child.pId = item[datas.valueKey];
        });
        const children = deepClone(item[datas.childrenKey]);
        result.push(...flatten(children, datas));
      }
    });
    return result;
  }
};
