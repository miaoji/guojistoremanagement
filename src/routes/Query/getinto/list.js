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
}) => {
  const columns = [
    {
      title: '客户编码',
      dataIndex: 'customer_no',
      key: 'customer_no',
    },
    {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '货架号',
      dataIndex: 'shelf_no',
      key: 'shelf_no',
    },
    {
      title: '仓管费',
      dataIndex: 'cargo_charge',
      key: 'cargo_charge',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: '快递公司',
      dataIndex: 'express_company_code',
      key: 'express_company_code',
    },
    {
      title: '入库时间',
      dataIndex: 'scan_time',
      key: 'scan_time',
      width: 180,
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>;
      },
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
