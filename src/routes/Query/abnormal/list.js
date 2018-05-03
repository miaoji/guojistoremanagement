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
      title: '国内单号',
      dataIndex: 'cn_no',
      key: 'cn_no',
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '客户编码',
      dataIndex: 'customer_no',
      key: 'customer_no',
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '货架号',
      dataIndex: 'shelf_no',
      key: 'shelf_no',
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => {
        return <span>{text || '无'}</span>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const Text = {
          0: '正常',
          1: '异常',
        };
        return <span>{Text[text]}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
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
