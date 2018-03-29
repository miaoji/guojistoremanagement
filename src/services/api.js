import request from '../utils/query';
import { login as loginApi, common as commonApi } from '../utils/api';

export async function queryNotices() {
  return request('/api/notices');
}

export async function accountLogin(params) {
  return request({
    url: loginApi.account,
    method: 'POST',
    params,
  });
}

export async function getOrderNo() {
  return request({
    url: commonApi.getOrderNo,
    method: 'GET',
  });
}
