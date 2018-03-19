import request from '../utils/request';
import { cargo } from '../utils/api';

export async function query(params) {
  return request(cargo.list, {
    method: 'GET',
    body: params,
  });
}

export async function add(params) {
  return request(cargo.add, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(cargo.update, {
    method: 'POST',
    body: params,
  });
}

export async function remove(params) {
  return request(cargo.remove, {
    method: 'POST',
    body: params,
  });
}
