import { notification } from 'antd';
import { update, add, query } from '../services/warehouse-fee';

export default {
  namespace: 'warehouseFee',

  state: {
    data: {
      cargo_fee: 0,
      expire_time: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      /* eslint-disable no-param-reassign */
      const response = yield call(query, payload);
      const { data } = response;
      yield put({
        type: 'save',
        payload: {
          ...data[0],
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'fetch',
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put, select }) {
      const { id } = yield select(_ => _.warehouseFee.data);
      const newOptions = {
        id,
        ...payload,
      };
      const response = yield call(update, newOptions);
      if (response.code === 200) {
        notification.success({
          message: `请求成功 ${response.code}`,
          description: response.msg,
        });
        yield put({
          type: 'fetch',
        });
      } else {
        notification.error({
          message: `请求错误 ${response.code}`,
          description: response.msg,
        });
      }
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
};
