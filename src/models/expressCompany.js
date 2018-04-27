import { message } from 'antd';
import { update, add, query, remove } from '../services/setting/express-company';

export default {
  namespace: 'expressCompany',

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
