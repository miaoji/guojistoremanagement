import request from '../utils/query';
import { user as userApi } from '../utils/api';
import { getToken } from '../utils/authority';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request({
    url: userApi.getUserInfoByToken,
    method: 'POST',
    data: getToken(),
  });
}

// export async function queryCurrent(params) {
//   return request('/api/currentUser');
// }
