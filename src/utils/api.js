// const APIV1 = '/api/v1';
// const APIV2 = '/api/v2'
let APIV3 = '';

// 重构API
// 线下地址
APIV3 = 'http://192.168.231.222:8000';
// 线上地址(测试)
// APIV3 = 'http://api.didalive.net/mzkd'
// 正式地址(生产)
// APIV3 = 'http://api.mingz-tech.com'

// 生产环境时api固定为线上url
if (process.env.NODE_ENV !== 'development') {
  // APIV3 = 'http://api.mingz-tech.com'
  APIV3 = 'http://api.didalive.net/mzkd';
}

export const login = {
  // param= username, password, imageCode, uuid
  // method=post
  account: `${APIV3}/login`,
  // param=uuid, method=get
  getVerifyImage: `${APIV3}/login/image_code`,
};

export const user = {
  // param=token, method=post
  getUserInfoByToken: `${APIV3}/api/common/getUserInfoByToken`,
};

export const cargo = {
  list: `${APIV3}/api/cargo/list`,
  add: `${APIV3}/api/cargo/add`,
  update: `${APIV3}/api/cargo/edit`,
};

// 客户信息
export const customer = {
  list: `${APIV3}/api/customer/list`,
  add: `${APIV3}/api/customer/add`,
  update: `${APIV3}/api/customer/edit`,
  remove: `${APIV3}/api/customer/del`,
};

// 仓管费
export const warehouseFee = {
  list: `${APIV3}/api/cargo/charge/list`,
  add: `${APIV3}/api/cargo/charge/add`,
  update: `${APIV3}/api/cargo/charge/edit`,
  remove: `${APIV3}/api/cargo/charge/del`,
};

// 快递公司
export const expressCompany = {
  list: `${APIV3}/api/express/list`,
  add: `${APIV3}/api/express/add`,
  update: `${APIV3}/api/express/edit`,
  remove: `${APIV3}/api/express/del`,
};

// 条形码
export const qr = {
  // param=width, height, barcode
  // method=get
  query: `${APIV3}barcode/create`,
};
// 快件查询
export const expre = {
  // list: 'http://app.quandikeji.com:8288/quandiExpressSiteManager/blackList',
  list: `${APIV3}/api/cargo/list`,
  create: `${APIV3}/api/cargo/add`,
  update: `${APIV3}/api/cargo/edit`,
  hide: `${APIV3}/api/cargo/del`,
  getById: `${APIV3}/api/cargo/get`,
};

// 入库查询
export const getinto = {
  list: `${APIV3}/api/cargo/ops/list`,
};

// 入库查询
export const getout = {
  list: `${APIV3}/api/cargo/ops/list`,
};

export const freight = {
  // 获取运费信息
  list: `${APIV3}/api/freight/list`,
  add: `${APIV3}/api/freight/add`,
  del: `${APIV3}/api/freight/del`,
  edit: `${APIV3}/api/freight/edit`,
  // 获取国家信息
  countrylist: `${APIV3}/api/country/list`,
  // 获取包裹类型
  packagelist: `${APIV3}/api/package/list`,
  // 获取产品类型
  productlist: `${APIV3}/api/product/list`,
};
