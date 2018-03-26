import { shelvesdetail } from '../../utils/api';
import request from '../../utils/query';

export async function query(params) {
  return request({
    url: shelvesdetail.list,
    method: 'post',
    data: params,
  });
}
