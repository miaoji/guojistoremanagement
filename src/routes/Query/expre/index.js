import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, message } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Modal from './modal';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ expre, loading }) => ({
  expre,
  loading: loading.models.expre,
}))
@Form.create()

export default class TableList extends PureComponent {
  state = {
    // modalVisible: this.props.modalVisible,
    selectedRows: [],
    formValues: {},
  };
  // 生命周期的构造函数
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'expre/query',
    });
  }

  render() {
    const {
      form,
      expre: { data, modalVisible, modalType, currentItem },
      loading,
      dispatch,
    } = this.props;
    const { selectedRows, formValues } = this.state;
    const mythis = this;

    const filterProps = {
      handleFormReset() {
        form.resetFields();
        mythis.setState({
          formValues: {},
        });
        dispatch({
          type: 'expre/fetch',
          payload: {},
        });
      },
      handleSearch(e) {
        e.preventDefault();

        form.validateFields((err, fieldsValue) => {
          if (err) return;

          const values = {
            ...fieldsValue,
            updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
          };

          mythis.setState({
            formValues: values,
          });

          dispatch({
            type: 'expre/fetch',
            payload: values,
          });
        });
      },
      showModal() {
        dispatch({
          type: 'expre/setStates',
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
      item: currentItem,
      title: modalType === 'create' ? '新建规则' : '修改规则',
      onOk(item) {
        console.log('item', item);
        dispatch({
          type: `expre/${modalType}`,
          // type: 'expre/create',
          payload: {
            ...item,
          },
        });

        message.success('添加成功');
        mythis.setState({
          modalVisible: false,
        });
      },
      hideModal() {
        dispatch({
          type: 'expre/setStates',
          payload: {
            modalVisible: false,
          },
        });
      },
      modalVisible,
    };

    const listProps = {
      selectedRows,
      loading,
      data,
      showModal(item) {
        console.log('updata', item);
        dispatch({
          type: 'expre/setStates',
          payload: {
            modalVisible: true,
            modalType: 'updata',
            currentItem: item,
          },
        });
      },
      onSelectRow(rows) {
        console.log('row', rows);
        mythis.setState({
          selectedRows: rows,
        });
      },
      onChange(pagination, filtersArg, sorter) {
        // const { formValues } = mythis.state;

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
          type: 'expre/fetch',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'expre/remove',
              payload: {
                no: selectedRows.map(row => row.no).join(','),
              },
              callback: () => {
                mythis.setState({
                  selectedRows: [],
                });
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
        <Modal
          {...modalProps}
        />
      </PageHeaderLayout>
    );
  }
}
