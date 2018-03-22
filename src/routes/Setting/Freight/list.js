import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Dropdown, Icon, Menu } from 'antd';
import SmallTable from 'components/SmallTable';
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
  const handleUpdata = (record) => {
    showModal(record);
  };
  const columns = [
    {
      title: '目的地国家',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: '包裹类型',
      dataIndex: 'package_type',
      key: 'package_type',
    },
    {
      title: '产品类型',
      dataIndex: 'product_type',
      key: 'product_type',
    },
    {
      title: '首重价格',
      dataIndex: 'init_price',
      key: 'init_price',
    },
    {
      title: '首重重量',
      dataIndex: 'init_weight',
      key: 'init_weight',
    },
    {
      title: '续重价格',
      dataIndex: 'stepping_price',
      key: 'stepping_price',
    },
    {
      title: '步进重量',
      dataIndex: 'stepping_weight',
      key: 'stepping_weight',
    },
    {
      title: '燃油附加费',
      dataIndex: 'fuel_charge',
      key: 'fuel_charge',
    },
    {
      title: '邮编段',
      dataIndex: 'postcode',
      key: 'postcode',
    },
    {
      title: '创建时间',
      width: 120,
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD') : '未知时间'}</span>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'create_user_id',
      key: 'create_user_id',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      render: () => (
        <Fragment>
          <Button onClick={() => handleUpdata()} >修改</Button>
        </Fragment>
      ),
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量删除</Menu.Item>
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
};

export default List;
