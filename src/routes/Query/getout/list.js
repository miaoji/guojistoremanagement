import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Menu } from 'antd';
import SmallTable from 'components/SmallTable';
import moment from 'moment';
import styles from './index.less';

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
  handleMenuClick,
  showModal,
}) => {
  // const handleUpdata = (record) => {
  //   showModal(record);
  // };
  const columns = [
    {
      title: '单号',
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: '国内单号',
      dataIndex: 'cn_no',
      key: 'cn_no',
    },
    {
      title: '目的地国家',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: '客户编号',
      dataIndex: 'customer_no',
      key: 'customer_no',
    },
    {
      title: '仓管费',
      dataIndex: 'cargo_charge',
      key: 'cargo_charge',
    },
    {
      title: '快递费',
      dataIndex: 'express_charge',
      key: 'express_charge',
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '出库时间',
      dataIndex: 'scan_time',
      key: 'scan_time',
      width: 180,
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <span className={styles.button} onClick={() => showModal(record)}>
          回填转单号
        </span>
      ),
    },
  ];


  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={styles.tableListOperator}>
        {
          selectedRows.length > 0 && (
            <span>
              <Button>批量操作</Button>
              <Dropdown overlay={menu}>
                <Button>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          )
        }
      </div>
      <SmallTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        pagination={data.pagination}
        columns={columns}
        onSelectRow={onSelectRow}
        onChange={onChange}
        total={30}
      />
    </div>
  );
};

List.propTypes = {
  data: PropTypes.object.isRequired,
  // selectedRows: PropTypes.any,
  // loading: PropTypes.bool,
  // onSelectRow,
  // onChange
};

export default List;
