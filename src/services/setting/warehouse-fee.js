import request from '../../utils/query';
import { warehouseFee } from '../../utils/api';

export async function query(params) {
  return request({
    url: warehouseFee.list,
    method: 'GET',
    withParams: true,
    params,
  });
}

export async function add(params) {
  return request({
    url: warehouseFee.add,
    method: 'POST',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: warehouseFee.update,
    method: 'POST',
    data: params,
  });
}
