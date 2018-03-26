import { expre } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: expre.list,
    method: 'post',
    data: params,
  });
}
// 查询快递信息
export async function getExpreInfo(params) {
  return request({
    url: expre.getExpreInfo,
    method: 'get',
    params,
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
