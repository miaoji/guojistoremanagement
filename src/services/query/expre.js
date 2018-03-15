import { expre } from '../../utils/api';
import request from '../../utils/request';

export async function query() {
  return request(expre.list, {
    method: 'post',
    body: {
      page: 1,
      pageSize: 10,
      pagination: 1,
      rownum: 10,
    },
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
