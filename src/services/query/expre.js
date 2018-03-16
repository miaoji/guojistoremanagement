import { expre } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  console.log('params', params);
  return request({
    url: expre.list,
    method: 'get',
    data: params,
  });
}

export async function create(params) {
  return request(expre.create, {
    method: 'post',
    body: params,
  });
}

export async function update(params) {
  return request(expre.update, {
    method: 'post',
    body: params,
  });
}

export async function hide(params) {
  return request(expre.hide, {
    method: 'post',
    body: params,
  });
}

export async function getById(params) {
  return request(expre.getById, {
    method: 'post',
    body: params,
  });
}
