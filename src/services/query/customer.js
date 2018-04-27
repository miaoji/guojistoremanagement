import { customer } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: customer.detail,
    method: 'post',
    data: params,
  });
}

export async function batch(params) {
  return request({
    url: customer.batch,
    method: 'post',
    data: params,
  });
}
