import request from '../utils/request';
import { user as userApi } from '../utils/api';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(userApi.getUserInfoByToken, {
    method: 'POST',
    body: params,
  });
}

// export async function queryCurrent(params) {
//   return request('/api/currentUser');
// }
