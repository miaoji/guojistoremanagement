import request from '../../utils/request';
import { warehouseFee } from '../../utils/api';

export async function query(params) {
  return request(warehouseFee.list, {
    method: 'GET',
    withParams: true,
    params,
  });
}

export async function add(params) {
  return request(warehouseFee.add, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(warehouseFee.update, {
    method: 'POST',
    body: params,
  });
}
