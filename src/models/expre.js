import React from 'react';
import modelExtend from 'dva-model-extend';
import { notification, Timeline } from 'antd';
import { pageModel } from './common';
import { query, getExpreInfo } from '../services/query/expre';
import { getToken } from '../services/token';


export default modelExtend(pageModel, {
  namespace: 'expre',

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
    expreModalVisible: false,
    selectedRows: [],
    expreInfo: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, { currentPage: 1, pageSize: 10, payload });
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

    *create({ payload }, { put }) {
      console.info('payload', payload);
      notification.success({
        message: '创建成功',
        description: '这个信息只是用来提示用户创建成功了',
      });
      yield put({
        type: 'setStates',
        payload: {
          modalVisible: false,
        },
      });
    },

    *updata({ payload }, { put }) {
      console.info('payload', payload);
      notification.success({
        message: '数据修改成功',
        description: '这个信息只是用来提示用户数据修改成功了',
      });
      yield put({
        type: 'setStates',
        payload: {
          modalVisible: false,
        },
      });
    },

    *getExpreInfo({ payload }, { call, put }) {
      const token = yield call(getToken, {
        timestamp: '1522112875223',
        nonceStr: '35077935fccf407e69262e04c2120539',
        sign: '2207bcfbee4bf9f7dd31247ca49c504b',
      });
      window.localStorage.setItem('mztoken', token.repldata);
      const res = yield call(getExpreInfo, { ...payload });
      if (res.code === 200) {
        const options = res.obj.data.map((items, index) => {
          const key = index;
          return <Timeline.Item key={key}>{items.time} {items.context}</Timeline.Item>;
        });
        yield put({
          type: 'setStates',
          payload: {
            expreInfo: options,
          },
        });
      }
    },

  },

  reducers: {},
});
