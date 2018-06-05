import request from '../utils/query';
import { cargo as apiList } from '../utils/api';

export async function query(params) {
  return request({
    url: apiList.list,
    method: 'POST',
    data: params,
  });
}

export async function add({ data, params }) {
  return request({
    url: apiList.add,
    method: 'POST',
    data,
    params,
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

export async function queryUsual(params) {
  return request({
    url: apiList.getUnusual,
    method: 'POST',
    data: params,
  });
}

export async function getOrderDetail(data) {
  return request({
    url: apiList.getOrderDetail,
    method: 'POST',
    data,
  });
}

export async function getOrderNo({ data, params }) {
  return request({
    url: apiList.getOrderNo,
    method: 'POST',
    data,
    params,
  });
}
