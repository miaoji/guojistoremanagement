import { shelves } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: shelves.list,
    method: 'post',
    data: params,
  });
}

export async function create(params) {
  return request({
    url: shelves.add,
    method: 'post',
    data: params,
  });
}

export async function updata(params) {
  return request({
    url: shelves.edit,
    method: 'post',
    data: params,
  });
}

export async function remove(params) {
  return request({
    url: shelves.del,
    method: 'delete',
    data: params,
  });
}
