import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Modal, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import Filter from './Filter';
import ModalForm from './Modal';
import List from './List';
import { handleScanval } from '../../../utils';

const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ outscanning, loading }) => ({
  outscanning,
  loading: loading.models.outscanning,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalType: 'add',
    formValues: {},
    currentItem: {},
    selectedRows: [],
    scanVal: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'outscanning/fetch',
    });
    dispatch({
      type: 'outscanning/getCountryInfo',
    });
  }

  getPackageInfo = (val) => {
    this.props.dispatch({
      type: 'outscanning/getPackageInfo',
      payload: val,
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
      type: 'outscanning/fetch',
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
      type: 'outscanning/fetch',
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

      console.log('values', values);

      dispatch({
        type: 'outscanning/fetch',
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
    const { wide, height, length } = fields;
    const volumeWeight = wide * height * length;
    this.props.dispatch({
      type: `outscanning/${type}`,
      payload: {
        ...fields,
        volumeWeight,
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
          type: 'outscanning/remove',
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
      type: 'outscanning/remove',
      payload: [id],
    });
  }

  handleScanning = (e, form) => {
    const val = e.target.value;
    this.setState({
      scanVal: val,
    });
    const formVal = handleScanval(val);
    if (!formVal) {
      console.log('false');
    } else {
      form.setFieldsValue(formVal);
      if (formVal.destination) {
        const countryId = Number(formVal.destination.split('/')[0]);
        console.log('countryId', countryId);
        this.getPackageInfo({ countryId });
        form.setFieldsValue({
          packageType: undefined,
          productType: undefined,
        });
      }
      const _ = this;
      setTimeout(() => {
        _.setState({
          scanVal: '',
        });
      }, 400);
    }
  }

  handleScanClear = () => {
    this.setState({
      scanVal: '',
    });
  }

  render() {
    const {
      outscanning: {
        data,
        countryInfo,
        packageInfo,
        productInfo,
        packageDis,
        productDis,
      },
      loading,
      form,
      dispatch,
    } = this.props;
    const { scanVal, selectedRows, modalVisible, modalType, currentItem } = this.state;

    const modalProps = {
      scanVal,
      modalType,
      currentItem,
      modalVisible,
      countryInfo,
      packageInfo,
      productInfo,
      packageDis,
      productDis,
      getProductInfo({ packageTypeId }) {
        dispatch({
          type: 'outscanning/getProductInfo',
          payload: { packageTypeId },
        });
      },
      getPackageInfo: this.getPackageInfo,
      handleScanning: this.handleScanning,
      handleScanClear: this.handleScanClear,
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
