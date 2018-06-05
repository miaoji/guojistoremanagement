import modelExtend from 'dva-model-extend';
import { message, notification } from 'antd';
import { pageModel } from './common';
import { query, create, update, remove } from '../services/setting/customerType';

export default modelExtend(pageModel, {
  namespace: 'customerType',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    loading: false,
    item: {},
    modalType: 'create',
    modalVisible: false,
    selectedRows: [],
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
        message.waring('当前没有可用的数据,请创建');
      }
    },

    *create({ payload }, { call, put }) {
      if ((payload.ruleDigit - payload.rulePrefix.length) < 6) {
        return notification.warn({
          message: '警告 ！',
          description: '您当前定义的规则的位数过短,请增加位数,建议总位数减去前缀的位数大于6',
        });
      }
      const data = yield call(create, payload);
      if (data.code === 200) {
        notification.success({
          message: '新增成功',
        });
        yield put({
          type: 'query',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
      } else {
        notification.warn({
          message: data.msg || '无法与服务器建立有效连接',
        });
      }
    },
    *update({ payload }, { call, put, select }) {
      if ((payload.ruleDigit - payload.rulePrefix.length) < 6) {
        return notification.warn({
          message: '警告 ！',
          description: '您当前定义的规则的位数过短,请增加位数,建议总位数减去前缀的位数大于6',
        });
      }
      const newpayload = { ...payload };
      const currentItem = yield select(({ customerType }) => customerType.currentItem);
      delete newpayload.key;
      const res = yield call(update, { ...newpayload, id: currentItem.id });
      if (res.code === 200) {
        notification.success({
          message: '修改成功',
        });
        yield put({
          type: 'setStates',
          payload: {
            modalVisible: false,
          },
        });
        yield put({
          type: 'query',
        });
      } else {
        notification.warn({
          message: res.msg || '无法与服务器建立有效连接',
        });
      }
    },

    *remove({ payload }, { call, put }) {
      console.log('payload', payload);
      const res = yield call(remove, { ids: [payload.id] });
      console.log('res', res);
      if (res.code === 200) {
        yield put({
          type: 'query',
        });
        notification.success({
          message: '删除成功',
        });
      } else {
        notification.warn({
          message: res.msg || '无法与服务器建立有效连接',
        });
      }
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
