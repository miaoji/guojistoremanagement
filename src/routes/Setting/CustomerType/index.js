import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Modal from './modal';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ customerType, loading }) => ({
  customerType,
  loading: loading.models.customerType,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  }
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'customerType/query',
      payload: location.query,
    });
  }

  render() {
    const {
      form,
      location,
      customerType: {
        data,
        list,
        total,
        modalVisible,
        modalType,
        currentItem,
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
          type: 'customerType/query',
          payload: {},
        });
      },
      handleSearch(values) {
        dispatch({
          type: 'customerType/query',
          payload: values,
        });
      },
      showModal() {
        dispatch({
          type: 'customerType/setStates',
          payload: {
            modalVisible: true,
            modalType: 'create',
            currentItem: {},
          },
        });
      },
      form,
    };

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      modalVisible,
      modalType,
      title: modalType === 'create' ? '新建客户类型编码规则' : '修改客户类型编码规则',
      onOk(val) {
        dispatch({
          type: `customerType/${modalType}`,
          payload: {
            ...val,
          },
        });
      },
      hideModal() {
        dispatch({
          type: 'customerType/setStates',
          payload: {
            modalVisible: false,
          },
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
          type: 'customerType/remove',
          payload: {
            id,
          },
        });
      },
      showModal(item) {
        dispatch({
          type: 'customerType/setStates',
          payload: {
            modalVisible: true,
            modalType: 'update',
            currentItem: item,
          },
        });
      },
      onSelectRow(rows) {
        global.setState({
          selectedRows: rows,
        });
        dispatch({
          type: 'customerType/setStates',
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
          type: 'customerType/query',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'customerType/remove',
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
