import React, { PureComponent } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'dva';
import { Card, Modal, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import Filter from './Filter';
import AddForm from './Form';
import UpdateForm from './Modal';
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
    // 初始化 orderNo
    dispatch({
      type: 'outscanning/initOrderNo',
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
      console.info('false');
    } else {
      if (formVal.shelfNo) {
        this.props.dispatch({
          type: 'outscanning/getShelNoCount',
          payload: {
            shelfNo: formVal.shelfNo,
          },
        });
      }
      form.setFieldsValue(formVal);
      if (formVal.destination) {
        const countryId = Number(formVal.destination.split('/')[0]);
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
      }, 200);
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
        outOrderCount,
        outBatchCount,
        countryInfo,
        packageInfo,
        productInfo,
        packageDis,
        productDis,
        orderNo,
        shelNoCount,
        shelNoOption,
        musicPlay,
      },
      loading,
      form,
      dispatch,
    } = this.props;
    const { scanVal, selectedRows, modalVisible, modalType, currentItem } = this.state;

    const addProps = {
      shelNoCount,
      orderNo,
      outOrderCount,
      outBatchCount,
      scanVal,
      modalType,
      shelNoOption,
      currentItem,
      modalVisible,
      countryInfo,
      packageInfo,
      productInfo,
      packageDis,
      productDis,
      onShelfChange(shelfNo) {
        dispatch({
          type: 'outscanning/getShelNoCount',
          payload: shelfNo,
        });
      },
      getProductInfo({ packageTypeId }) {
        dispatch({
          type: 'outscanning/getProductInfo',
          payload: { packageTypeId },
        });
      },
      refreshOrderNo() {
        dispatch({
          type: 'outscanning/getOrderNo',
        });
      },
      handleScanning: this.handleScanning,
      getPackageInfo: this.getPackageInfo,
      handleModalConfirm: this.handleModalConfirm,
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
      handleTableUpdate: this.handleTableUpdate,
      handleTableDel: this.handleTableDel,
      handleStandardTableChange: this.handleStandardTableChange,
    };

    const updateProps = {
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

    const musicProps = {
      url: 'http://cdnringuc.shoujiduoduo.com/ringres/all/a24/516/3374516.aac',
      playing: musicPlay,
      onEnded() {
        console.log('1');
        dispatch({
          type: 'outscanning/stopMusic',
        });
      },
    };

    return (
      <PageHeaderLayout title="">
        <div style={{ height: '0px', overflow: 'hidden' }}>
          <ReactPlayer {...musicProps} />
        </div>
        <Card style={{ marginBottom: '10px' }} title="出库扫描" bordered={false}>
          <AddForm
            {...addProps}
          />
        </Card>
        <Card title="" bordered={false}>
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
        <UpdateForm
          {...updateProps}
        />
      </PageHeaderLayout>
    );
  }
}
