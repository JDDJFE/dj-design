var path = require('path');
// var merge = require('merge');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  runtimeCompiler: true,
  publicPath: '/old/',
  // lintOnSave: false,// 不让eslint生效
  outputDir: process.env.IS_DOCS ? 'jddj-docs/static/old' : 'dist', // dist 最老版
  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
      .end();
    const jsxRule = config.module.rule('jsx');
    jsxRule.uses.clear();
    jsxRule
      .test(/\.jsx/)
      // .exclude
      // .add(resolve('example'))
      .use('raw-loader')
      .loader('raw-loader');

    // config.plugin('copy').use(require('copy-webpack-plugin'), [
    //   {
    //     patterns: [
    //       {
    //         from: path.resolve(__dirname, './src/assets/css'),
    //         to: path.resolve(__dirname, './dist/style')
    //       }
    //     ]
    //   }
    // ]);
  },
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(__dirname, './src/assets/css'),
          to: path.resolve(__dirname, './dist/style')
        },
        {
          from: path.resolve(__dirname, './src/assets/djweb-ui.less'),
          to: path.resolve(__dirname, './dist')
        }
      ])
    ]
  }
  //   config.module
  //     .rule('md')
  //     .test(/\.md$/)
  //     .use('markdown-loader')
  //     .loader('markdown-loader')
  //     .loader('html-loader');
  // }
};
