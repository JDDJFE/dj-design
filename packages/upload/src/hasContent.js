// let host = window.location.host;
// let hasContent = host != 'store.jddj.com' && host != 'prestore.jddj.com' && host != 'j-store.jddj.com' && host != 'pre-store.jddj.com' && host != 'testgw-o2o.jddj.com';// &&  host != 'yunying.jddj.com' && host != 'pre-yunying.jddj.com'
// export default hasContent;


let host = window.location.host;
function getQaWhiteList() {
  const qaWhiteList = [];
  for (let i = 0; i < 12; i++) {
    qaWhiteList.push(`qa${i + 1}-yunying.jddj.com`);
  }
  return qaWhiteList;
}
const qa = getQaWhiteList();
const yy = ['pre-yy.jddj.com', 'yunying.jddj.com', 'new-yunying.jddj.com', 'pre-yunying.jddj.com', 'yy.jddj.com', 'new-preyunying.jddj.com', 'test-yunying.jddj.com','qa-yunying.jddj.com', 'qa-yunying.jddj.com', ...qa];
const store = ['store.jddj.com', 'prestore.jddj.com', 'j-store.jddj.com', 'pre-store.jddj.com', 'testgw-o2o.jddj.com', 'test-store.jddj.com', 'qa-store.jddj.com'];
let appContent = '';
let hasContent = false;

if (yy.includes(host)) {
  appContent = 'yypc';
} else if (store.includes(host)) {
  appContent = 'scpc';
} else {
  hasContent = true;
}

export {
  hasContent,
  appContent
};
