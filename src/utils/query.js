import axios from 'axios';
// import router from '@/router';

const fetch = (options) => {
  const {
    method = 'get',
    data,
    params,
    url,
    auth,
    token,
    timeout = 8000,
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: data,
        timeout,
        headers: auth ? { token } : {},
      });
    case 'delete':
      return axios({
        url,
        method: 'delete',
        data,
        params,
        timeout,
        headers: auth ? { token } : {},
      });
    case 'post':
      return axios({
        url,
        method: 'post',
        data,
        params,
        timeout,
        // headers: auth ? { token } : {},
      });
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

export default function request(options) {
  console.log('options', options);
  const newOption = { ...options };
  newOption.token = 123123123;
  return fetch(newOption).then((response) => {
    const { status, data } = response;
    return {
      success: true,
      statusCode: status,
      ...data,
    };
  }).catch((error) => {
    console.error(error);
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      if (Number(statusCode) === 401) {
        console.log('1231');
      }
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || '网络错误';
    }
    return { success: false, statusCode, message: msg };
  });
}
