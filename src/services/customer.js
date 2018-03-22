import request from '../utils/query';
import { customer as apiList } from '../utils/api';

export async function query(params) {
  return request({
    url: apiList.list,
    method: 'GET',
    params,
  });
}

export async function add(params) {
  return request({
    url: apiList.add,
    method: 'POST',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: apiList.update,
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request({
    url: apiList.remove,
    method: 'delete',
    data: params,
  });
}
