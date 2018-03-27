import modelExtend from 'dva-model-extend';
import { message } from 'antd';
import { pageModel } from './common';
import { query } from '../services/setting/country';

export default modelExtend(pageModel, {
  namespace: 'country',

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

  },
});
