import axios from 'axios';
import Qs from 'qs';
import Message from '../../message/index';
import { hasContent, appContent } from './hasContent';

const $axios = axios.create({
  // 设置超时时间
  timeout: 5 * 60 * 1000
});
// console.log(hasContent,'hasContent')
// 请求拦截器
$axios.interceptors.request.use(
  config => {
    let request = {};
    // debugger;
    request.appName = appContent;
    request.functionId = config.url;
    if (!hasContent && config.url.indexOf('/cloud/') != 0) {
      if (config.method == 'upload'){
        config.url = '/stream/upload';
        config.method = 'post';
      } else {
        config.url = '/client';
      }
    }
    if (config.method === 'get') {
      if (config.params) {
        request.body = JSON.stringify(config.params);
      }
      request = hasContent || config.url.indexOf('/cloud/') == 0? config.params : request;
      config.params = request;
    } else if (config.method === 'post') {
      if (config.data) {
        request.body = JSON.stringify(config.data);
      }
      request = hasContent || config.url.indexOf('/cloud/') == 0 ? config.data : request;
      config.data = Object.prototype.toString.call(config.data) === '[object FormData]' ? config.data : request;
      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
        config.data = Qs.stringify(request);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器
$axios.interceptors.response.use(
  response => {
    let httpStatusCode = response.status;
    if (httpStatusCode >= 200 && httpStatusCode < 300 || httpStatusCode === 304) {
      let result = response.data;
      if (result.code == 0 || result.code == 200) {
        return result;
      }
      // 判断是否未登录 在判断是否有登录地址 判断登录域名是否是jddj.com
      // 运营平台
      const msg = result.msg + (result.detail ? '：' + result.detail : '');
      if (result.code == 302 && result.data && result.data.indexOf('jddj.com') > -1) {
        // Message.error(msg || '提示：登录异常！');
        let redirect = result.data.split('?')[0];
        window.location = `${redirect}?redirectUrl=${window.location.href}`;
        // 商家中心
      } else if (result.status == 401 && result.redirect && result.redirect.indexOf('jddj.com') > -1) {
        window.location = `${result.redirect}?appCode=lsp-store&backUrl=${window.location.href}`;
      } else if (result.code == 401 && result.redirect && result.redirect.indexOf('//dauth.') > -1) {
        if (result.redirect.indexOf('?redirectUrl=') > -1) {
          window.location = result.redirect;
        } else {
          window.location = `${result.redirect}?redirectUrl=${window.location.href}`;
        }
      } else {
        Message.error(msg || '提示：网络异常！');
        return Promise.reject(result);
      }

    } else {
      Message.error('提示：网络异常！');
    }
  },
  error => {
    return Promise.reject(error);
  }
);

// get，post请求方法
export default {
  post(url, data, isJson) {
    let contentType = isJson ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8';
    return $axios({
      method: 'post',
      url: url,
      data: data,
      headers: {
        'Content-Type': contentType
      }
    });
  },
  get(url, params) {
    return $axios({
      method: 'get',
      url: url,
      params: params
    });
  },
  upload(url, formData, file, method) {
    let data = formData;
    if (Object.prototype.toString.call(formData) !== '[object FormData]') {
      data = new FormData();
      data.append('appName', appContent);
      data.append('functionId', url);
      if (Object.prototype.toString.call(formData) === '[object File]') {
        let file = formData;
        formData = new FormData();
        formData.append('file', file);
        data.append('file', file);
      } else if (Object.prototype.toString.call(formData) === '[object Object]') {
        data.append('body', formData ? JSON.stringify(formData) : '{}');
        if (file) {
          data.append('file', file);
        }
      }
    }
    return $axios({
      method: method || 'upload',
      url: hasContent || url.indexOf('/cloud/') == 0 ? url : '/stream/upload',
      data: hasContent || url.indexOf('/cloud/') == 0 ? formData : data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  download(url, params = {}) {
    let appName = appContent;
    let functionId = url;
    let data = params ? JSON.stringify(params) : JSON.stringify({});
    window.location.href = `/stream/download?appName=${appName}&functionId=${functionId}&body=${data}`;
  }
};
