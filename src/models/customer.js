import { update, add, query } from '../services/customer';

export default {
  namespace: 'customer',

  state: {
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
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
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
};
