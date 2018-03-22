import React from 'react';
import modelExtend from 'dva-model-extend';
import { message, Select } from 'antd';
import { pageModel } from './common';
import { query, countrylist, productlist, packagelist } from '../services/setting/freight';

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
        message.waring(data.msg || '当前网络无法使用');
      }
    },

    *getCountryInfo(_, { call, put }) {
      const data = yield call(countrylist);
      if (data.code === 200) {
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
        message.warning(data.msg || '当前网络无法使用');
      }
    },

    *getPackageInfo({ payload }, { call, put }) {
      console.log('payloadpackage', payload);
      const data = yield call(packagelist, payload);
      console.log('datapackage', data);
      if (data.code === 200) {
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
        message.warning(data.msg || '当前网络无法使用');
      }
    },

    *getProductInfo({ payload }, { call, put }) {
      const data = yield call(productlist, payload);
      if (data.code === 200) {
        const source = data.obj || data.data;
        const options = source.map((items) => {
          return <Option key={items.id}>{items.product_name}</Option>;
        });
        console.log('producedata', source);
        yield put({
          type: 'setStates',
          payload: {
            productInfo: options,
          },
        });
      } else {
        message.warning(data.msg || '当前网络无法使用');
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
