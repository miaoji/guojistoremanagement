import request from '../../utils/query';
import { customer as apiList, customerType } from '../../utils/api';

export async function recharge(params) {
  return request({
    url: apiList.recharge,
    method: 'post',
    params,
  });
}

export async function query(params) {
  return request({
    url: apiList.list,
    method: 'GET',
    params,
  });
}

export async function add(params) {
  return request({
    url: apiList.add,
    method: 'POST',
    data: params,
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

export async function getCustomerTypeOption() {
  return request({
    url: customerType.list,
    method: 'post',
    data: {
      currentPage: 1,
      pageSize: 10000000,
    },
  });
}
