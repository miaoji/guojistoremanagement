import React from 'react';
import { message, Select } from 'antd';
import { update, add, remove, queryUsual } from '../services/cargo';
import { getOrderNo } from '../services/api';
import { countrylist, productlist, packagelist, freightprice } from '../services/setting/freight';

const { Option } = Select;

export default {
  namespace: 'unusualscanning',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    orderNo: '',
    countryInfo: [],
    productInfo: [],
    packageInfo: [],
    packageDis: true,
    productDis: true,
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
      const response = yield call(queryUsual, {
        ...payload,
      });
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
      const response = yield call(add, {
        data: {
          cnNo: payload.cnNo,
          customerNo: payload.customerNo,
          shelfNo: payload.shelfNo,
          status: 1,
        },
        params: {
          type: 1,
        },
      });
      if (response.code === 200) {
        message.success('添加成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(response.msg || '添加失败');
      }
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.code === 200) {
        message.success('删除成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('删除失败' || response.msg);
      }
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      console.log('payload', payload);
      const priceOptions = {
        countryId: Number(payload.destination.split('/')[0]),
        packageTypeId: Number(payload.packageType.split('/')[0]),
        productTypeId: Number(payload.productType.split('/')[0]),
        weight: Number(payload.weight),
      };
      const priceData = yield call(freightprice, priceOptions);
      const { finalPrice } = priceData.data;
      const response = yield call(update, {
        id: payload.id,
        cnNo: payload.cnNo,
        orderNo: payload.orderNo,
        customerNo: payload.customerNo,
        shelfNo: payload.shelfNo,
        destination: payload.destination.split('/')[1],
        packageTypeId: payload.packageType.split('/')[0],
        productTypeId: payload.productType.split('/')[0],
        expressCompanyCode: payload.expressCompanyCode,
        height: payload.height,
        length: payload.length,
        weight: payload.weight,
        wide: payload.wide,
        expressCharge: finalPrice,
        volumeWeight: payload.volumeWeight,
      });
      if (response.code === 200) {
        message.success('更新成功');
        yield put({ type: 'fetch' });
      } else {
        message.error('更新失败' || response.msg);
      }
      if (callback) callback();
    },
    *initOrderNo(_, { put }) {
      const orderNo = window.localStorage.getItem('orderno');
      if (orderNo) {
        console.log('orderNo', orderNo);
        yield put({
          type: 'setStates',
          payload: {
            orderNo,
          },
        });
      } else {
        yield put({
          type: 'getOrderNo',
        });
      }
    },
    *getOrderNo({ callback }, { call, put }) {
      const data = yield call(getOrderNo);
      const source = data.data;
      if (data.code === 200 && source) {
        yield put({
          type: 'setStates',
          payload: {
            orderNo: source,
          },
        });
        window.localStorage.setItem('orderno', source);
      } else {
        message.warning('内单号获取失败');
      }
      if (callback) callback();
    },
    *getCountryInfo(_, { call, put }) {
      const data = yield call(countrylist);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const id = `${items.id}/${items.country_code}`;
          return <Option key={id}>{items.country_cn}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            countryInfo: options,
          },
        });
      } else {
        message.warning('国家列表信息获取失败');
      }
    },
    *getPackageInfo({ payload }, { call, put }) {
      const data = yield call(packagelist, payload);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const id = `${items.id}/${items.name_cn}`;
          return <Option key={id}>{items.name_cn}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            packageInfo: options,
            packageDis: false,
            productDis: true,
            productInfo: [],
          },
        });
      } else {
        message.warning('您选择的国家没有对应包裹类型,请创建');
      }
    },
    *getProductInfo({ payload }, { call, put }) {
      const data = yield call(productlist, payload);
      const source = data.data;
      if (data.code === 200 && source && source.length !== 0) {
        const options = source.map((items) => {
          const id = `${items.id}/${items.product_name}`;
          return <Option key={id}>{items.product_name}</Option>;
        });
        yield put({
          type: 'setStates',
          payload: {
            productInfo: options,
            productDis: false,
          },
        });
      } else {
        message.warning('您选择的包裹类型没有对应的产品类型,请创建');
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
    setStates(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
