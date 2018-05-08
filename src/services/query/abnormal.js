import { abnormal } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: abnormal.list,
    method: 'post',
    data: params,
  });
}
