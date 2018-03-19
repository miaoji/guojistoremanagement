import request from '../utils/request';
import { expressCompany } from '../utils/api';

export async function query(params) {
  return request(expressCompany.list, {
    method: 'GET',
    withParams: true,
    params,
  });
}

export async function add(params) {
  return request(expressCompany.add, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(expressCompany.update, {
    method: 'POST',
    body: params,
  });
}
