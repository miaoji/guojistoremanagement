import modelExtend from 'dva-model-extend';
import { notification } from 'antd';
import { pageModel } from './common';
import { query, hide, create } from '../services/query/expre';

export default modelExtend(pageModel, {
  namespace: 'expre',

  state: {},

  effects: {
    *query({ payload }, { call, put }) {
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
      // const response = yield call(create, payload);
      console.log('payload', payload);
      notification.success({
        message: '创建成功',
        description: '这个信息只是用来提示用户创建成功了',
      });
      yield put({
        type: 'setStates',
        payload: {
          modalVisible: false,
          // payload: response,
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
