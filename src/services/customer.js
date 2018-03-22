import request from '../utils/request';
import axiosReq from '../utils/query';
import { customer } from '../utils/api';

export async function query(params) {
  return axiosReq({
    url: customer.list,
    method: 'GET',
    params,
  });
}

export async function add(params) {
  return request(customer.add, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return axiosReq({
    url: customer.update,
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return axiosReq({
    url: customer.remove,
    method: 'delete',
    data: params,
  });
}
