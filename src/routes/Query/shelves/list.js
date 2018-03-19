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
  // showModal,
}) => {
  // const handleUpdata = (record) => {
  //   showModal(record);
  // };
  const columns = [
    {
      title: '货架号',
      dataIndex: 'no',
    },
    {
      title: '入架数量',
      dataIndex: 'description',
    },
    {
      title: '出架数量',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '剩余件数',
      dataIndex: 'status',
    },
    {
      title: '单号',
      dataIndex: 'no1',
    },
    {
      title: '状态',
      dataIndex: 'no2',
    },
    {
      title: '入库时间',
      dataIndex: 'no3',
    },
    {
      title: '出库时间',
      dataIndex: 'updatedAt',
      sorter: true,
    },
    {
      title: '操作',
      render: () => (
        <Fragment>
          <a href="">查看</a>
          <Divider type="vertical" />
          <a href="">修改</a>
        </Fragment>
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
