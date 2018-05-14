import React from 'react';
import { message, Select } from 'antd';
import { update, add, query, remove, recharge } from '../services/setting/customer';
import { query as getCustomerTypeOption } from '../services/setting/customerType';

const { Option } = Select;
export default {
  namespace: 'customer',

  state: {
    rechargeModalVisible: false,
    dbCurrentItem: [],
    customerTypeOption: [],
    data: {
      list: [],
      pagination: {},
    },
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
      const response = yield call(query, payload);
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
      const response = yield call(add, payload);
      if (response.code === 200) {
        message.success('添加成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(response.msg || '当前网络无法使用');
      }
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 200) {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(response.msg || '当前网络无法使用');
      }
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (response.code === 200) {
        message.success('更新成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(response.msg || '当前网络无法使用');
      }
      if (callback) callback();
    },

    *recharge({ payload }, { call, put, select }) {
      const id = yield select(({ customer }) => customer.dbCurrentItem.id);
      const res = yield call(recharge, {
        id,
        money: payload.money,
        type: payload.type,
      });
      if (res.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            rechargeModalVisible: false,
          },
        });
        message.success('操作成功');
        yield put({
          type: 'fetch',
        });
      } else {
        message.warning(res.msg || '当前网络无法使用');
      }
    },

    *getCustomerTypeOption(_, { call, put }) {
      const data = yield call(getCustomerTypeOption, { currentPage: 1, pageSize: 10000000 });
      console.log('data123123123', data);
      if (data.code === 200 && data.data && data.data.length) {
        const options = data.data.map((items) => {
          return <Option key={items.rule_name}>{items.rule_name}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            customerTypeOption: options,
          },
        });
      } else {
        message.warning(data.msg || '没有获取到客户类型信息,请创建');
      }
    },

  },

  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
