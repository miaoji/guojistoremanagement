import { query } from '../services/query/customer';

export default {
  namespace: 'customerdetail',

  state: {
    rechargeModalVisible: false,
    dbCurrentItem: [],
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
      const list = data.map((item) => {
        return { key: item.id, ...item };
      });
      yield put({
        type: 'save',
        payload: {
          list,
          pagination,
        },
      });
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
