# 安装
在 npm 发布包内的 djweb-ui/dist 目录下提供了 `djweb-ui.common.js` `djweb-ui.css`等
####    1） 安装依赖：
```shell
$ npm i djweb-ui -S
```
####    2） 引入资源：
```shell
import DjwebUI from 'djweb-ui'
Vue.use(DjwebUI)
```
####    3） 引入样式：
```shell
import 'djweb-ui/dist/djweb-ui.css'
```

# npm发布
访问：https://www.npmjs.com
####    1）资源打包
```shell
$ npm run build-npm
```
####    2）生成版本
```shell
$ npm version <update_type>  进行修改，<update_type> 三个参数

                      patch：补丁修改    [1.0.1版本]

                      minor：版本迭代    [1.1.0版本]

                      major：大版本迭代   [2.0.0版本]
```
####    3）发布 
```shell
$ npm publish
```


#  安装私有git包
使用打的 `tag`
```shell
$ npm i git+https://coding.jd.com/webapp/jddj-webUI.git#0.0.0
```
或者直接写 `#branch` 表示需要安装的分支号
```shell
$ npm i git+https://coding.jd.com/webapp/jddj-webUI.git#master
```
此时，`package.json`文件中，会出现对应的项目依赖，后面的版本号会替换成git地址，尽量以 `tag` 为标签进行安装，这样确保代码是正确的