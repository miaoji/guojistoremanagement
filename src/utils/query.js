import axios from 'axios';
import { notification } from 'antd';
import lodash from 'lodash';
import { getToken } from './authority';
import store from '../index';
// import router from '@/router';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '参数错误。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
}

const fetch = (options) => {
  const {
    method = 'get',
    data,
    params,
    url,
    auth = true,
    token,
    timeout = 1000,
  } = options;

  const cloneData = lodash.cloneDeep(data);

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: cloneData || params,
        timeout,
        headers: auth ? { token } : {},
      });
    case 'delete':
      return axios({
        url,
        method: 'delete',
        data: cloneData,
        params,
        timeout,
        headers: auth ? { token } : {},
      });
    case 'post':
      return axios({
        url,
        method: 'post',
        data: cloneData,
        params,
        timeout,
        headers: auth ? { token } : {},
      });
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

export default function request(options) {
  const newOption = { ...options };
  newOption.token = getToken();
  // 用mztoken 的值来判断是否要使用mztoken
  if (newOption.mztoken) {
    newOption.token = window.localStorage.getItem('mztoken');
  }
  // newOption.token = getToken();
  return fetch(newOption).then((response) => {
    const { status, data } = response;
    if (status !== 200) {
      checkStatus(response);
    }
    // if (status === 200 && data.code !== 200) {
    //   checkStatus({ ...response, status: data.code });
    // }
    return {
      success: true,
      statusCode: status,
      ...data,
      repldata: data,
    };
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    let obj;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      console.log('statusCode', statusCode);
      if (Number(statusCode) !== 200 && Number(statusCode) !== 401) {
        notification.error({
          message: `请求错误 ${response.status}: ${response.url}`,
          description: '请求失败',
        });
      }
      msg = data.message || statusText;
      console.log('msg', msg);
      if (Number(statusCode) === 401) {
        notification.error({
          message: '登录状态已过期, 请重新登录',
          description: '登录状态提醒',
        });
        const { dispatch } = store;
        dispatch({
          type: 'login/logout',
        });
        return;
      }
    } else {
      statusCode = 600;
      msg = error.message || '网络错误';
      obj = [];
    }
    return { success: false, statusCode, message: msg, obj };
  });
}
