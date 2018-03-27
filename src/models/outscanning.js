import React from 'react';
import { message, Select } from 'antd';
import { update, add, query, remove } from '../services/cargo';
import { countrylist, productlist, packagelist } from '../services/setting/freight';

const { Option } = Select;

export default {
  namespace: 'outscanning',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    countryInfo: [],
    productInfo: [],
    packageInfo: [],
    packageDis: true,
    productDis: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      /* eslint-disable no-param-reassign */
      if (!payload) {
        payload = {
          currentPage: 1,
          pageSize: 10,
        };
      }
      const response = yield call(query, {
        ...payload,
        type: 1,
      });
      const { data, total } = response;
      const pagination = {
        ...payload,
        total,
      };
      yield put({
        type: 'save',
        payload: {
          list: data,
          pagination,
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, {
        data: {
          ...payload,
        },
        params: {
          type: 1,
        },
      });
      if (response.code === 200) {
        message.success('添加成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('添加失败' || response.msg);
      }
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 200) {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('删除失败' || response.msg);
      }
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (response.code === 200) {
        message.success('更新成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('更新失败' || response.msg);
      }
      if (callback) callback();
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
            packageDis: false,
            productDis: true,
            productInfo: [],
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
            productDis: false,
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
    setStates(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
