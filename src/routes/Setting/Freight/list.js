import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Dropdown, Icon, Menu } from 'antd';
import StandardTable from 'components/StandardTable';
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
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: '包裹类型',
      dataIndex: 'customer_no',
      key: 'customer_no',
    },
    {
      title: '产品类型',
      dataIndex: 'customer_name',
      key: 'customer_name',
      // sorter: true,
      // align: 'right',
      // render: val => `${val} 万`,
      // needTotal: true,
    },
    {
      title: '首重价格',
      dataIndex: 'shelf_no',
      key: 'shelf_no',
    },
    {
      title: '首重重量',
      dataIndex: 'cargo_charge',
      key: 'cargo_charge',
    },
    {
      title: '续重价格',
      dataIndex: 'express_company_code',
      key: 'express_company_code',
    },
    {
      title: '步进价格',
      dataIndex: 'express_company_code6',
      key: 'express_company_code6',
    },
    {
      title: '燃油附加费',
      dataIndex: 'express_company_code5',
      key: 'express_company_code5',
    },
    {
      title: '邮编段',
      dataIndex: 'express_company_code4',
      key: 'express_company_code4',
    },
    {
      title: '创建时间',
      dataIndex: 'express_company_code3',
      key: 'express_company_code3',
    },
    {
      title: '操作人',
      dataIndex: 'express_company_code2',
      key: 'express_company_code2',
    },
    {
      title: '备注',
      dataIndex: 'express_company_code1',
      key: 'express_company_code1',
    },
    {
      title: '操作',
      render: () => (
        <Fragment>
          <a href="">查看</a>
          <Divider type="vertical" />
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
      <StandardTable
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
