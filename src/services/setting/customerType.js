import { customerType } from '../../utils/api';
import request from '../../utils/query';
// 运费信息
export async function query(params) {
  return request({
    url: customerType.list,
    method: 'post',
    data: params,
  });
}
// 新增运费信息
export async function create(params) {
  return request({
    url: customerType.add,
    method: 'post',
    data: params,
  });
}
// 修改运费信息
export async function update(params) {
  return request({
    url: customerType.edit,
    method: 'post',
    data: params,
  });
}
// 删除运费信息
export async function remove(params) {
  return request({
    url: customerType.del,
    method: 'delete',
    data: params.ids,
  });
}
// 国家信息
export async function countrylist(params) {
  return request({
    url: customerType.countrylist,
    method: 'get',
    params,
  });
}
// 包裹类型信息
export async function packagelist(params) {
  return request({
    // url: 'http://api.mingz-tech.com/api/packageType/getPackageTypeByCountry',
    url: customerType.packagelist,
    method: 'post',
    data: params,
  });
}
// 产品类型信息
export async function productlist(params) {
  return request({
    // url: 'http://api.mingz-tech.com/api/productType/getProductByPackage',
    url: customerType.productlist,
    method: 'post',
    data: params,
  });
}

// 获取运费
export async function freightprice(params) {
  return request({
    url: customerType.freightprice,
    method: 'post',
    data: params,
  });
}
