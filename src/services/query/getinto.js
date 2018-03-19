import { getinto } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: getinto.list,
    method: 'post',
    data: {
      type: 0,
      ...params,
    },
  });
}
