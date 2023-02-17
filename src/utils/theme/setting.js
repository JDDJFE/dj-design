let themeList = require('./theme.json');
let lessNodesAppended;

function injectTheme(list) {
  themeList = [...themeList, ...list];
  return this;
}

const updateTheme = (theme) => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return;
  } */
  const matchedItem = themeList.find((a) => a.key === theme);
  function buildIt() {
    // 正确的判定less是否已经加载less.modifyVars可用
    if (!window.less || !window.less.modifyVars) {
      return;
    }
    // less.modifyVars可用
    if (matchedItem?.modifyVars) {
      window.less
        .modifyVars(matchedItem?.modifyVars)
        .then(() => {})
        .catch(() => {
          // hideMessage();
        });
    }
  }
  if (!matchedItem) {
    let lessNode = document.getElementById('color');
    let styleNode = document.querySelector('style[id="less:color"]');
    if (lessNode) {
      document.body.removeChild(lessNode);
    }
    if (styleNode) {
      styleNode.remove();
    }
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessStyleNode.setAttribute('id', 'color');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://cdn.jsdelivr.net/npm/less@4';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

export { updateTheme, themeList, injectTheme };
