import React from 'react';
import { Base64 } from 'js-base64';
import modelExtend from 'dva-model-extend';
import { message, Select, notification } from 'antd';
import { pageModel } from './common';
import { query, create, update, remove, countrylist, productlist, packagelist } from '../services/setting/freight';

const { Option } = Select;

export default modelExtend(pageModel, {
  namespace: 'freight',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    loading: false,
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
    selectedRows: [],
    countryInfo: [],
    productInfo: [],
    packageInfo: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, { currentPage: 1, pageSize: 10, ...payload });
      if (data.code === 200) {
        const list = data.data.map((item) => {
          return { key: item.id, ...item };
        });
        yield put({
          type: 'setStates',
          payload: {
            list,
            total: data.total,
          },
        });
      } else {
        message.waring('当前没有可用的数据,请创建');
      }
    },

    *create({ payload }, { call, put }) {
      const userInfo = JSON.parse(Base64.decode(localStorage.getItem('mzck-pro-user')));
      const source = {
        destination: Number(payload.destination.split('/')[0]),
        packageType: Number(payload.package_type.split('/')[0]),
        productType: Number(payload.product_type),
        initPrice: payload.init_price,
        initWeight: payload.init_weight,
        steppingPrice: payload.stepping_price,
        steppingWeight: payload.stepping_weight,
        postcode: payload.postcode,
        createUserId: userInfo.id,
        fuelCharge: payload.fuel_charge,
        remark: payload.remark,
      };
      const data = yield call(create, source);
      if (data.code === 200) {
        yield put({
          type: 'query',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        notification.success({
          message: '新增成功',
        });
      }
    },
    *update({ payload }, { call, put, select }) {
      const currentItem = yield select(({ freight }) => freight.currentItem);
      for (const item in payload) {
        if (payload[item] === currentItem[item]) {
          payload[item] = undefined;
        }
      }
      const source = {
        id: currentItem.id,
        initPrice: payload.init_price,
        initWeight: payload.init_weight,
        steppingPrice: payload.stepping_price,
        steppingWeight: payload.stepping_weight,
        postcode: payload.postcode,
        fuelCharge: payload.fuel_charge,
        remark: payload.remark,
        destination: payload.destination ? Number(payload.destination.split('/')[0]) : undefined,
        packageType: payload.package_type ? Number(payload.package_type.split('/')[0]) : undefined,
        productType: payload.product_type ? Number(payload.product_type) : undefined,
        // createUserId: userInfo.id,
      };
      const res = yield call(update, source);
      if (res.code === 200) {
        notification.success({
          message: '修改成功',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        yield put({
          type: 'query',
        });
      }
    },

    *remove({ payload }, { call, put }) {
      const res = yield call(remove, { ids: [payload.id] });
      if (res.code === 200) {
        yield put({
          type: 'query',
        });
        notification.success({
          message: '删除成功',
        });
      }
    },

    *getCountryInfo(_, { call, put }) {
      const data = yield call(countrylist);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const en = items.country_en.toLowerCase();
          const id = `${items.id}/${items.country_cn}/${items.country_en}/${en}`;
          return <Option key={id}>{items.country_cn}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            countryInfo: options,
          },
        });
      } else {
        message.warning('国家列表信息获取失败');
      }
    },

    *getPackageInfo({ payload }, { call, put }) {
      const data = yield call(packagelist, payload);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const en = items.name_en.toLowerCase();
          const id = `${items.id}/${items.name_cn}/${items.name_en}/${items.max_range}/${items.min_range}/${en}`;
          return <Option key={id}>{items.name_cn}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            packageInfo: options,
          },
        });
      } else {
        message.warning('您选择的国家没有对应包裹类型,请创建');
      }
    },

    *getProductInfo({ payload }, { call, put }) {
      const data = yield call(productlist, payload);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          return <Option key={items.id}>{items.product_name}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            productInfo: options,
          },
        });
      } else {
        message.warning('您选择的包裹类型没有对应的产品类型,请创建');
      }
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});
