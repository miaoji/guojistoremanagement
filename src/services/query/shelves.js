import { shelves } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: shelves.list,
    method: 'post',
    data: params,
  });
}
