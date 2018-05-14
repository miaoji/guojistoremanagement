import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'antd';
import SmallTable from 'components/SmallTable';
import DropOption from 'components/DropOption';

const { confirm } = Modal;
const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
  showModal,
  onDelete,
}) => {
  const onMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        showModal(record);
        break;
      case '2':
        confirm({
          cancelText: '取消',
          okText: '确认删除',
          title: '删除',
          content: '你确定要删除这一条运费信息吗?',
          onOk: () => {
            onDelete(record.id);
          },
        });
        break;
      default:
        break;
    }
  };
  const columns = [
    {
      title: '名称',
      dataIndex: 'rule_name',
      key: 'rule_name',
    },
    {
      title: '前缀',
      dataIndex: 'rule_prefix',
      key: 'rule_prefix',
    },
    {
      title: '位数',
      dataIndex: 'rule_digit',
      key: 'rule_digit',
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
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => {
        return <span>{text || '无'}</span>;
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => onMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />;
      },
    },
  ];

  return (
    <div>
      <SmallTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        pagination={data.pagination}
        columns={columns}
        onSelectRow={onSelectRow}
        onChange={onChange}
        // total={30}
      />
    </div>
  );
};

List.propTypes = {
  data: PropTypes.object.isRequired,
};

export default List;
