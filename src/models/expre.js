import modelExtend from 'dva-model-extend';
import { notification } from 'antd';
import { pageModel } from './common';
import { queryRule, removeRule, addRule } from '../services/api';

export default modelExtend(pageModel, {
  namespace: 'expre',

  state: {},

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'setStates',
        payload: {
          data: response,
        },
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'setStates',
        payload: {
          data: response,
        },
      });
    },
    *create({ payload }, { put }) {
      // const response = yield call(addRule, payload);
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
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
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
