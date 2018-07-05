import React from 'react';
import { message, notification, Select } from 'antd';
import { update, add, query, remove, cargoSendMessage } from '../services/cargo';
import { query as queryShelfInfo } from '../services/query/shelves';
import { storage } from '../utils';

const { Option } = Select;

export default {
  namespace: 'entryscanning',

  state: {
    entryCount: 0,
    musicPlay: false,
    shelNoOption: [],
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'getShelNo' });
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
          parcelTypes: payload.parcelTypes,
        },
        params: {
          type: 0,
        },
      });
      if (response.code === 200) {
        if (response.statuInfo === 1) {
          yield call(cargoSendMessage, { cnNo: payload.cnNo, customerNo: payload.customerNo });
        }
        yield put({ type: 'setStates', payload: { musicPlay: true } });
        storage({ type: 'set', key: 'entryCount', val: entryCount + 1 });
        notification.success({
          message: '添加成功',
        });
        yield put({ type: 'fetch' });
      } else {
        notification.warning({
          message: response.msg,
        });
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
    *getShelNo(_, { call, put }) {
      const data = yield call(queryShelfInfo, { currentPage: 1, pageSize: 10000 });
      if (data.code === 200) {
        if (data.data && data.data.length === 0) {
          message.warning('当前没有货架号,请添加货架号后进行入库操作');
          return;
        }
        const options = data.data.map((items) => {
          return <Option key={items.shelf_no}>{items.shelf_no}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            shelNoOption: options,
          },
        });
      } else {
        message.warning(data.msg || '网络延迟, 请刷新');
      }
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
        entryCount: action.payload.entryCount,
      };
    },
    stopMusic(state, { payload }) {
      return { ...state, ...payload, musicPlay: false };
    },
  },
};
