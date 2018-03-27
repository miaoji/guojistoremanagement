import React from 'react';
import modelExtend from 'dva-model-extend';
import { Select, notification } from 'antd';
import { pageModel } from './common';
import { query, queryExpressList, updata } from '../services/query/getout';

const { Option } = Select;

export default modelExtend(pageModel, {
  namespace: 'getout',

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
    expressList: [],
  },

  effects: {

    *query({ payload = {
      currentPage: 1,
      pageSize: 10,
    } }, { call, put }) {
      const data = yield call(query, {
        ...payload,
        currentPage: Number(payload.currentPage) || 1,
        pageSize: Number(payload.pageSize) || 10,
      });
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
        yield put({
          type: 'setStates',
          payload: {
            list: [],
            total: 0,
          },
        });
      }
    },

    *updata({ payload }, { call, put, select }) {
      const id = yield select(({ getout }) => getout.currentItem.id);
      console.log('id', id);
      const newpayload = payload;
      delete newpayload.key;
      console.log('payload', payload);
      if (payload.expressCompanyCodeEn && payload.expressCompanyCodeEn.split('/-/').length > 0) {
        const expressCompanyCodeEn = payload.expressCompanyCodeEn.split('/-/');
        [newpayload.expressCompanyCodeEn] = expressCompanyCodeEn;
      }
      console.log('newpayload', newpayload);
      newpayload.id = id;
      const res = yield call(updata, newpayload);
      console.log('res', res);
      if (res.code === 200) {
        notification.success({
          message: '添加成功',
        });
        yield put({
          type: 'query',
        });
      }
    },

    *getExpressList(_, { call, put }) {
      const res = yield call(queryExpressList);
      if (res.code === 200 && res.data) {
        const options = res.data.map((items) => {
          const val = `${items.company_code}/-/${items.id}/-/${items.company_name}`;
          return <Option key={val}>{items.company_name}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            expressList: options,
          },
        });
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
