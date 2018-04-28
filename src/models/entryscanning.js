import { message } from 'antd';
import { update, add, query, remove } from '../services/cargo';
import { storage } from '../utils';

export default {
  namespace: 'entryscanning',

  state: {
    entryCount: 0,
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
      const response = yield call(query, {
        ...payload,
        type: 0,
      });
      const { data, total } = response;
      const pagination = {
        ...payload,
        total,
      };
      const entryCount = storage({ type: 'get', key: 'entryCount' }) || 0;
      yield put({
        type: 'save',
        payload: {
          list: data,
          pagination,
          entryCount,
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const entryCount = Number(storage({ type: 'get', key: 'entryCount' }));

      const response = yield call(add, {
        data: {
          customerNo: payload.customerNo,
          expressCompanyCode: payload.expressCompanyCode,
          cnNo: payload.cnNo,
          shelfNo: payload.shelfNo,
          weight: payload.weight,
        },
        params: {
          type: 0,
        },
      });
      if (response.code === 200) {
        storage({ type: 'set', key: 'entryCount', val: entryCount + 1 });
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
        entryCount: action.payload.entryCount,
      };
    },
  },
};
