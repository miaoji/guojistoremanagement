import { customerType } from '../../utils/api';
import request from '../../utils/query';
// 客户类型（客户编码的编码规则）
export async function query(params) {
  return request({
    url: customerType.list,
    method: 'post',
    data: params,
  });
}
// 新增客户类型（客户编码的编码规则）
export async function create(params) {
  return request({
    url: customerType.add,
    method: 'post',
    data: params,
  });
}
// 修改客户类型（客户编码的编码规则）
export async function update(params) {
  return request({
    url: customerType.edit,
    method: 'post',
    data: params,
  });
}
// 删除客户类型（客户编码的编码规则）
export async function remove(params) {
  return request({
    url: customerType.del,
    method: 'delete',
    data: params.ids,
  });
}

