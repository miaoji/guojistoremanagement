/*
 * 获取token
 */

import request from '../utils/query';
import { token } from '../utils/api';

export async function getToken(data) {
  return request({
    url: token.get,
    method: 'get',
    data,
  });
}
