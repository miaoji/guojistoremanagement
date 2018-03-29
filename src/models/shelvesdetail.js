import modelExtend from 'dva-model-extend';
// import { notification } from 'antd';
import { pageModel } from './common';
import { query } from '../services/query/shelvesdetail';

export default modelExtend(pageModel, {
  namespace: 'shelvesdetail',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    loading: false,
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
    selectedRows: [],
  },

  effects: {

    *query({ payload = {
      currentPage: 1,
      pageSize: 10,
    } }, { call, put }) {
      const data = yield call(query, {
        ...payload,
        currentPage: Number(payload.currentPage) || 1,
        pageSize: Number(payload.pageSize) || 10,
      });
      console.log('data', data);
      if (data.code === 200) {
        const list = data.data.map((item) => {
          const items = {};
          if (item.operateRecord.type === 0) {
            items.startTime = item.operateRecord.scanTime;
          } else if (item.operateRecord.type === 1) {
            items.endTime = item.operateRecord.scanTime;
          }
          items.state = item.operateRecord.type;
          return { key: item.id, ...items, ...item };
        });
        yield put({
          type: 'setStates',
          payload: {
            list,
            total: data.total,
          },
        });
      } else {
        yield put({
          type: 'setStates',
          payload: {
            list: [],
            total: 0,
          },
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
