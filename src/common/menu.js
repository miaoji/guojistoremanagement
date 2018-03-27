import { isUrl } from '../utils/utils';

const menuData = [{
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
  name: '操作管理',
  icon: 'table',
  path: 'operate',
  children: [{
    name: '入库扫描',
    path: 'entry-scanning',
  }, {
    name: '出库扫描',
    path: 'outbound-scanning',
  }],
}, {
  name: '基础数据设置',
  icon: 'form',
  path: 'setting',
  children: [{
    name: '客户信息管理',
    path: 'customer',
  }, {
    name: '仓管费配置',
    path: 'warehouse-fee',
  }, {
    name: '快递公司配置',
    path: 'express-company',
  }, {
    name: '目的地国家管理',
    path: 'country',
  }, {
    name: '运费配置',
    path: 'freight',
  }],
}, {
  name: '查询统计',
  icon: 'book',
  path: 'query',
  children: [{
    name: '货架查询',
    path: 'shelves',
  }, {
    name: '货架详情',
    hideInMenu: true,
    path: 'shelvesdetail',
  }, {
    name: '快件查询',
    path: 'expre',
  }, {
    name: '出库查询',
    path: 'getout',
  }, {
    name: '入库查询',
    path: 'getinto',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
