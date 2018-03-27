import { getout, expressCompany } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: getout.list,
    method: 'post',
    data: {
      type: 1,
      ...params,
    },
  });
}

export async function queryExpressList(params) {
  return request({
    url: expressCompany.list,
    method: 'get',
    params,
  });
}

export async function updata(params) {
  return request({
    url: getout.edit,
    method: 'post',
    data: params,
  });
}
