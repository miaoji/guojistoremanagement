import { distributor } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: distributor.list,
    method: 'post',
    data: params,
  });
}

export async function create(params) {
  return request({
    url: distributor.add,
    method: 'post',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: distributor.edit,
    method: 'post',
    data: params,
  });
}

export async function remove(params) {
  return request({
    url: distributor.remove,
    method: 'delete',
    data: params.ids,
  });
}
