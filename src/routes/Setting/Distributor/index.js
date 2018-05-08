import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Modal from './modal';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ distributor, loading }) => ({
  distributor,
  loading: loading.models.distributor,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  }
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'distributor/query',
      payload: location.query,
    });
  }

  render() {
    const {
      form,
      location,
      distributor: {
        countryInfo,
        productInfo,
        packageInfo,
        data,
        list,
        total,
        modalVisible,
        modalType,
        currentItem,
        packageDis,
        productDis,
      },
      loading,
      dispatch,
    } = this.props;
    const { selectedRows } = this.state;
    const global = this;
    const formValues = {};

    const filterProps = {
      filter: {
        ...location.query,
      },
      handleFormReset() {
        dispatch({
          type: 'distributor/query',
          payload: {},
        });
      },
      handleSearch(values) {
        dispatch({
          type: 'distributor/query',
          payload: values,
        });
      },
      showModal() {
        dispatch({
          type: 'distributor/getCountryInfo',
        });
        dispatch({
          type: 'distributor/setStates',
          payload: {
            modalVisible: true,
            modalType: 'create',
            currentItem: {},
            packageDis: true,
            productDis: true,
          },
        });
      },
      form,
    };

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      countryInfo,
      productInfo,
      packageInfo,
      modalVisible,
      packageDis,
      productDis,
      modalType,
      title: modalType === 'create' ? '新建渠道商' : '修改渠道商',
      onOk(val) {
        dispatch({
          type: `distributor/${modalType}`,
          payload: {
            ...val,
          },
        });
      },
      hideModal() {
        dispatch({
          type: 'distributor/setStates',
          payload: {
            modalVisible: false,
          },
        });
      },
      getPackageInfo(val) {
        dispatch({
          type: 'distributor/getPackageInfo',
          payload: val,
        });
      },
      getProductInfo(val) {
        dispatch({
          type: 'distributor/getProductInfo',
          payload: val,
        });
      },
    };

    const listProps = {
      selectedRows,
      loading,
      data: {
        list,
        pagination: { ...data.pagination, total },
      },
      onDelete(id) {
        dispatch({
          type: 'distributor/remove',
          payload: {
            id,
          },
        });
      },
      showModal(item) {
        dispatch({
          type: 'distributor/getCountryInfo',
        });
        dispatch({
          type: 'distributor/setStates',
          payload: {
            modalVisible: true,
            modalType: 'update',
            currentItem: item,
            packageDis: true,
            productDis: true,
          },
        });
      },
      onSelectRow(rows) {
        global.setState({
          selectedRows: rows,
        });
        dispatch({
          type: 'distributor/setStates',
          payload: {
            selectedRows: [...rows],
          },
        });
      },
      onChange(pagination, filtersArg, sorter) {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj = { ...obj };
          newObj[key] = getValue(filtersArg[key]);
          return newObj;
        }, {});
        const params = {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          ...formValues,
          ...filters,
        };
        if (sorter.field) {
          params.sorter = `${sorter.field}_${sorter.order}`;
        }
        dispatch({
          type: 'distributor/query',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'distributor/remove',
              payload: {
                no: selectedRows.map(row => row.no).join(','),
              },
              callback: () => {
              },
            });
            break;
          default:
            break;
        }
      },
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Filter {...filterProps} />
            </div>
            <List {...listProps} />
          </div>
        </Card>
        {modalVisible && <Modal {...modalProps} />}
      </PageHeaderLayout>
    );
  }
}
