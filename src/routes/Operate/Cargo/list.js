import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Menu } from 'antd';
import SmallTable from 'components/SmallTable';
import moment from 'moment';
import styles from './index.less';

function isWMS(val) {
  const list = {
    0: '未合单',
    1: '已合单',
  };

  return list[val];
}

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
  handleMenuClick,
  showModal,
}) => {
  const goOutscan = (record) => {
    const url = `/operate/outbound-scanning?orderNo=${record.ORDER_NO}`;
    window.open(url, 'outscanning', 'width=900,height=600,left=550,top=100');
  };

  const goWxSite = (record) => {
    const url = `http://control.mingz-tech.com/cargodetail?batch=${record.BATCH}`;
    window.open(url, 'goWxSite', '');
  };

  const expandedRowRender = (record) => {
    const { orderDetailList } = record;
    const arr = [];
    /* eslint no-plusplus: 'off' */
    for (let index = 0; index < orderDetailList.length; index++) {
      const element = orderDetailList[index];
      const arrItem = [];
      arrItem.push(<h1 key={element.ID}>第{index + 1}件</h1>);
      arrItem.push(<div key={element.CN_NO}>国内运单号：{element.CN_NO}</div>);
      arrItem.push(<div key={element.SHELF_NO}>货架号：{element.SHELF_NO}</div>);
      arrItem.push(<div key={element.RECEIVER_COUNTRY}>目的地：{element.RECEIVER_COUNTRY}</div>);
      arrItem.push(<div key={element.WEIGHT}>重量：{element.WEIGHT}</div>);
      arrItem.push(<p key={index}>------------</p>);
      arr.push(arrItem);
    }
    return (
      <div>
        {arr}
      </div>
    );
  };

  const columns = [
    {
      title: '批次号',
      dataIndex: 'BATCH',
      key: 'BATCH',
    },
    {
      title: '内单号',
      dataIndex: 'ORDER_NO',
      key: 'ORDER_NO',
    },
    {
      title: '是否合单',
      dataIndex: 'WMS_STATUS',
      key: 'WMS_STATUS',
      render: (text) => {
        return <span>{isWMS(text)}</span>;
      },
    },
    {
      title: '目的地国家',
      dataIndex: 'RECEIVER_COUNTRY',
      key: 'RECEIVER_COUNTRY',
    },
    {
      title: '客户名称',
      dataIndex: 'NICK_NAME',
      key: 'NICK_NAME',
    },
    {
      title: '客户编号',
      dataIndex: 'CUSTOMER_NO',
      key: 'CUSTOMER_NO',
    },
    {
      title: '快递费',
      dataIndex: 'TOTAL_FEE',
      key: 'TOTAL_FEE',
      render: (text) => {
        return <span>{text || '暂无'}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      width: 180,
      render: (text) => {
        return <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <span className={styles.button} onClick={() => showModal(record)}>
          修改
          </span>
          <span>&nbsp;|&nbsp;</span>
          <span className={styles.button} onClick={() => goOutscan(record)}>
        出库扫描
          </span>
          <span>&nbsp;|&nbsp;</span>
          <span className={styles.button} onClick={() => goWxSite(record)}>
        补价处理
          </span>
        </div>
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
        expandedRowRender={expandedRowRender}
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
