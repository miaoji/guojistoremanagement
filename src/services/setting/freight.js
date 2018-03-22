import { freight } from '../../utils/api';
import request from '../../utils/query';
// 运费信息
export async function query(params) {
  return request({
    url: freight.list,
    method: 'get',
    params,
  });
}
// 新增运费信息
export async function create(params) {
  return request({
    url: freight.add,
    method: 'post',
    data: params,
  });
}
// 修改运费信息
export async function update(params){
  return request({
    url: freight.edit,
    method: 'post',
    data: params,
  })
}
// 删除运费信息
export async function remove(params) {
  return request({
    url: freight.del,
    method: 'delete',
    data: params.ids,
  });
}
// 国家信息
export async function countrylist() {
  return request({
    url: freight.countrylist,
    method: 'get',
  });
}
// 包裹类型信息
export async function packagelist(params) {
  return request({
    // url: 'http://api.mingz-tech.com/api/packageType/getPackageTypeByCountry',
    url: freight.packagelist,
    method: 'post',
    data: params,
  });
}
// 产品类型信息
export async function productlist(params) {
  return request({
    // url: 'http://api.mingz-tech.com/api/productType/getProductByPackage',
    url: freight.productlist,
    method: 'post',
    data: params,
  });
}
