import React from 'react';
import { Base64 } from 'js-base64';
import modelExtend from 'dva-model-extend';
import { message, Select, notification } from 'antd';
import { pageModel } from './common';
import { query, create, countrylist, productlist, packagelist } from '../services/setting/freight';

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
        destination: payload.destination.split('/')[0],
        packageType: payload.package_type.split('/')[0],
        productType: payload.product_type,
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
        notification.success({
          message: `请求成功 ${data.code}`,
          description: data.msg,
        });
        yield put({
          type: 'query',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
      }
    },

    *getCountryInfo(_, { call, put }) {
      const data = yield call(countrylist);
      const dataobj = data.data || data.obj;
      if (data.code === 200 && dataobj && dataobj.length !== 0) {
        const source = data.obj || data.data;
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
        message.warning('当前没有可用的数据,请创建');
      }
    },

    *getPackageInfo({ payload }, { call, put }) {
      const data = yield call(packagelist, payload);
      const dataobj = data.data || data.obj;
      if (data.code === 200 && dataobj && dataobj.length !== 0) {
        const source = data.obj || data.dada;
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
        message.warning('当前没有可用的数据,请创建');
      }
    },

    *getProductInfo({ payload }, { call, put }) {
      const data = yield call(productlist, payload);
      const dataobj = data.data || data.obj;
      if (data.code === 200 && dataobj && dataobj.length !== 0) {
        const source = data.obj || data.data;
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
        message.warning('当前没有可用的数据,请创建');
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
