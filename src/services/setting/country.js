import { country } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: country.list,
    method: 'get',
    params,
  });
}
