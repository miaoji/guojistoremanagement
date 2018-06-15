import React from 'react';
import modelExtend from 'dva-model-extend';
import { notification, Timeline } from 'antd';
import { pageModel } from './common';
import { query, getExpreInfo } from '../services/query/expre';

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
    expreInfo: [<Timeline.Item key={0}>暂无相关物流信息</Timeline.Item>],
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
        yield put({
          type: 'setStates',
          payload: {
            list: [],
            total: 0,
          },
        });
      }
    },

    *create(_, { put }) {
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

    *updata(_, { put }) {
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
