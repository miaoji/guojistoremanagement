import modelExtend from 'dva-model-extend';
import { notification } from 'antd';
import { pageModel } from './common';
import { query, hide, create } from '../services/query/expre';

export default modelExtend(pageModel, {
  namespace: 'expre',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
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
        yield put({
          type: 'setStates',
          payload: {
            list: data.obj,
            total: data.total,
          },
        });
      } else {
        throw data.msg || '网络连接失败';
      }
    },
    *fetch({ payload }, { call, put }) {
      const data = yield call(query, payload);
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            data: data.obj,
          },
        });
      } else {
        throw data.msg || '网络连接失败';
      }
    },
    *create({ payload }, { put }) {
      console.log('payload', payload);
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
      console.log('payload', payload);
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
    *add({ payload, callback }, { call, put }) {
      const response = yield call(create, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(hide, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
