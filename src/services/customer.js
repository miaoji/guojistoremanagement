import request from '../utils/request';
import { customer } from '../utils/api';

export async function query(params) {
  return request(customer.list, {
    method: 'GET',
    body: params,
  });
}

export async function add(params) {
  return request(customer.add, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(customer.update, {
    method: 'POST',
    body: params,
  });
}
