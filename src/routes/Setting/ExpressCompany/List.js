import React, { Fragment } from 'react';
import { Button, Modal, Divider } from 'antd';
import StandardTable from 'components/StandardTable';
import styles from './index.less';
import { qr } from '../../../utils/api';

const { confirm } = Modal;
const queryQr = qr.query;

const List = ({
  loading, data, selectedRows,
  handleBatchDel, handleStandardTableChange,
  handleSelectRows, handleTableUpdate, handleTableDel, handleAddBtn }) => {
  const handleListDel = (record) => {
    confirm({
      title: '确定要删除这一条客户吗?',
      onOk() {
        handleTableDel(record.id);
      },
    });
  };
  const expandedRowRender = (record) => {
    return (
      <div>
        <p>备注:{record.remark}</p>
      </div>
    );
  };
  const columns = [
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '快递名称',
      dataIndex: 'company_name',
    },
    {
      title: '快递代码',
      dataIndex: 'company_code',
    },
    {
      title: '快递类型',
      dataIndex: 'type',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => { handleListDel(record); }} >删除</a>
          <Divider type="vertical" />
          <a className={styles.operateLine} onClick={() => { handleTableUpdate(record); }}>修改</a>
          <Divider type="vertical" />
          <a
            href={`${queryQr}?width=300&height=70&barcode=KD_${record.company_code}`}
            target="_blank"
          >打印编码
          </a>
        </Fragment>
      ),
    },
  ];
  return (
    <div>
      <div className={styles.tableListOperator}>
        <Button icon="plus" type="primary" onClick={() => handleAddBtn()}>
          新建
        </Button>
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
        onSelectRow={handleSelectRows}
        expandedRowRender={expandedRowRender}
      />
    </div>
  );
};

export default List;
