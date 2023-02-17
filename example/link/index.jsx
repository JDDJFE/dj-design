export default {
  title: 'Link 文字链接',
  describe: '文字超链接',
  templates: [
    {
      title: '基础用法',
      template: '<dj-link action="https://www.baidu.com/" target="_blank">基础用法</dj-link>'
    },
    {
      title: '指定类型',
      template: '<dj-link type="primary">主要链接</dj-link>&ensp;<dj-link type="success">成功链接</dj-link>&ensp;<dj-link type="warning">警告链接</dj-link>&ensp;<dj-link type="danger">危险链接</dj-link>&ensp;<dj-link type="info" color="orange">信息链接</dj-link>'
    },
    {
      title: '禁用状态',
      template: '<dj-link type="primary" disabled>主要链接</dj-link>&ensp;<dj-link type="success" disabled>成功链接</dj-link>'
    },
    {
      title: '下划线',
      template: '<dj-link type="primary" underline>主要链接</dj-link>&ensp;<dj-link type="success" underline>成功链接</dj-link>'
    },
    {
      title: '自定义颜色',
      template: '<dj-link type="primary" color="red">主要链接</dj-link>&ensp;<dj-link type="success" color="pink">成功链接</dj-link>&ensp;<dj-link type="primary" color="#67c23a">主要链接</dj-link>'
    },
    {
      title: '自定义大小',
      template: '<dj-link color="green" font-size="30">大</dj-link>&ensp;<dj-link color="pink" :font-size="20">小</dj-link>&ensp;<dj-link type="primary" color="#67c23a">主要链接</dj-link>'
    },
    {
      title: '带icon图标(图标自定义大小、颜色、位置）',
      template: '<dj-link color="#23c234" @click="edit" underline icon="signout" before>图标在左</dj-link>&ensp;<dj-link color="#53e" @click="edit" underline icon="signout" after>图标在右</dj-link>',
      data: {
        methods: {
          edit(){
            alert('click');
          }
        }
      }
    },
    {
      title: '带icon图标(图标自定义大小、颜色、位置）-插槽方式',
      template: '<dj-link color="#23c234" @click="edit" underline>图标在左<template slot="before"> <dj-icon icon="signout"></dj-icon></template></dj-link>&ensp;<dj-link color="#53e" @click="edit" underline>图标在右<template slot="after"> <dj-icon icon="signout"></dj-icon></template></dj-link>',
      data: {
        methods: {
          edit(){
            alert('click');
          }
        }
      }
    },
    {
      title: '链接窗口打开方式（默认原窗口打开)',
      template: '<dj-link color="#23c234" action="http://www.baidu.com">原窗口打开</dj-link>&ensp;<dj-link color="#53e" action="http://www.baidu.com" target="_blank">新窗口打开</dj-link>',
      data: {
        methods: {
          edit(){
            alert('click');
          }
        }
      }
    }
  ]
};
