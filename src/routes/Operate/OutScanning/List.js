import React, { Fragment } from 'react';
import { Button, Modal, Divider } from 'antd';
import StandardTable from 'components/StandardTable';
import styles from './index.less';
import { formatDate } from '../../../utils/';

const { confirm } = Modal;

const List = ({
  loading, data, selectedRows,
  handleBatchDel, handleStandardTableChange,
  handleSelectRows, handleTableUpdate, handleTableDel }) => {
  const expandedRowRender = (record) => {
    return (
      <div>
        <p>客户名称: {record.customer_name || '暂无记录'}</p>
        <p>渠道商名称: {record.distributor_name || '暂无记录'}</p>
        <p>仓管费: {record.cargo_charge || '暂无记录'}</p>
        <p>重量: {record.weight || '暂无记录'}</p>
        <p>体积重/cm^3: {record.volume_weight || '暂无记录'}</p>
        <p>长/cm: {record.length || '暂无记录'}</p>
        <p>宽/cm: {record.wide || '暂无记录'}</p>
        <p>高/cm: {record.height || '暂无记录'}</p>
      </div>
    );
  };
  const handleListDel = (record) => {
    confirm({
      title: '确定要删除这一条客户吗?',
      onOk() {
        handleTableDel(record.id);
      },
    });
  };
  const columns = [
    {
      title: '内单号',
      dataIndex: 'order_no',
    },
    {
      title: '国内单号',
      dataIndex: 'cn_no',
    },
    {
      title: '客户编码',
      dataIndex: 'customer_no',
    },
    {
      title: '扫描时间',
      dataIndex: 'gmt_create',
      render: text => <span>{formatDate('yyyy-MM-dd hh:mm:ss', new Date(text))}</span>,
    },
    {
      title: '目的地国家',
      dataIndex: 'destination',
    },
    {
      title: '快递费',
      dataIndex: 'express_charge',
    },
    {
      title: '货架号',
      dataIndex: 'shelf_no',
    },
    {
      title: '快递公司',
      dataIndex: 'company_name',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => { handleListDel(record); }} >删除</a>
          <Divider type="vertical" />
          <a className={styles.operateLine} onClick={() => { handleTableUpdate(record); }}>修改</a>
        </Fragment>
      ),
    },
  ];
  return (
    <div>
      <div className={styles.tableListOperator}>
        {
          selectedRows.length > 0 && (
            <span>
              <Button onClick={handleBatchDel}>批量删除</Button>
            </span>
          )
        }
      </div>
      <StandardTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        columns={columns}
        onChange={handleStandardTableChange}
        expandedRowRender={expandedRowRender}
        onSelectRow={handleSelectRows}
      />
    </div>
  );
};

export default List;
