// const APIV1 = '/api/v1';
// const APIV2 = '/api/v2'
let APIV3 = '';

// 重构API
// 线下地址
APIV3 = 'http://192.168.231.222:8055';
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

export const expre = {
  list: 'http://app.quandikeji.com:8288/quandiExpressSiteManager/blackList',
  create: `${APIV3}/api/cargo/add`,
  update: `${APIV3}/api/cargo/edit`,
  hide: `${APIV3}/api/cargo/del`,
  getById: `${APIV3}/api/cargo/get`,
};
