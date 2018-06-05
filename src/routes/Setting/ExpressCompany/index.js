import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Modal, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import Filter from './Filter';
import ModalForm from './Modal';
import List from './List';

const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ expressCompany, loading }) => ({
  expressCompany,
  loading: loading.models.expressCompany,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalType: 'add',
    formValues: {},
    currentItem: {},
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'expressCompany/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
      type: 'expressCompany/fetch',
      payload: params,
    });
  }

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'expressCompany/fetch',
      payload: {},
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'expressCompany/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleModalType = (type) => {
    this.setState({
      modalType: type,
    });
  }

  handleModalConfirm = (fields, type) => {
    this.props.dispatch({
      type: `expressCompany/${type}`,
      payload: {
        ...fields,
      },
    });

    this.setState({
      modalVisible: false,
    });
  }

  handleBatchDel = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    const _ = this;

    confirm({
      title: '确定要批量删除客户?',
      onOk() {
        const ids = selectedRows.map(row => row.id);

        dispatch({
          type: 'expressCompany/remove',
          payload: ids,
          callback: () => {
            _.setState({
              selectedRows: [],
            });
          },
        });
      },
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleAddBtn = () => {
    this.setState({
      currentItem: {},
    });
    this.handleModalVisible(true);
    this.handleModalType('add');
  }

  handleTableUpdate = (record) => {
    this.setState({
      modalVisible: true,
      modalType: 'update',
      currentItem: record,
    });
  }

  handleTableDel = (id) => {
    this.props.dispatch({
      type: 'expressCompany/remove',
      payload: [id],
    });
  }

  render() {
    const { expressCompany: { data }, loading, form } = this.props;
    const { selectedRows, modalVisible, modalType, currentItem } = this.state;

    const modalProps = {
      modalType,
      currentItem,
      modalVisible,
      handleModalConfirm: this.handleModalConfirm,
      handleModalVisible: this.handleModalVisible,
    };

    const filterProps = {
      form,
      handleSearch: this.handleSearch,
      handleSearchReset: this.handleSearchReset,
    };

    const listProps = {
      data,
      loading,
      selectedRows,
      handleBatchDel: this.handleBatchDel,
      handleSelectRows: this.handleSelectRows,
      handleAddBtn: this.handleAddBtn,
      handleTableUpdate: this.handleTableUpdate,
      handleTableDel: this.handleTableDel,
      handleStandardTableChange: this.handleStandardTableChange,
    };

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Filter
                {...filterProps}
              />
            </div>
            <List
              {...listProps}
            />
          </div>
        </Card>
        <ModalForm
          {...modalProps}
        />
      </PageHeaderLayout>
    );
  }
}
