import request from '../utils/request';
import { cargo as cargoApi } from '../utils/api';

export async function query(params) {
  return request(cargoApi.list, {
    method: 'GET',
    body: params,
  });
}

export async function add(params) {
  return request(cargoApi.add, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(cargoApi.update, {
    method: 'POST',
    body: params,
  });
}
