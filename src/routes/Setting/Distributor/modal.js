import React from 'react';
import { Form, Input, Modal } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  className: styles.medalItem,
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 15,
  },
};
const Modalbox = ({
  item,
  modalVisible,
  onOk,
  hideModal,
  title,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };

  return (
    <Modal title={title} visible={modalVisible} onOk={handleOk} onCancel={() => hideModal()}>
      <FormItem label="名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('distributor_name', {
          initialValue: item.distributor_name,
          rules: [
            {
              required: true,
              message: '请添加渠道商名称!',
            },
          ],
        })(<Input placeholder="请添加渠道商名称" />)}
      </FormItem>
      <FormItem label="编码" hasFeedback {...formItemLayout}>
        {getFieldDecorator('distributor_code', {
          initialValue: item.distributor_code,
          rules: [
            {
              required: true,
              message: '请输入编码信息!',
            },
          ],
        })(<Input placeholder="请输入编码信息" />)}
      </FormItem>
      <FormItem label="备注" hasFeedback {...formItemLayout}>
        {getFieldDecorator('remark', {
          initialValue: item.remark,
        })(<Input placeholder="请输入备注信息" />)}
      </FormItem>
    </Modal>
  );
};

// Model.propTypes = {
//     onAdd: PropTypes.func,
//     switchIsMotion: PropTypes.func,
//     form: PropTypes.object,
//     Model: PropTypes.object,
//     onModelChange: PropTypes.func,
//     onDownLoad: PropTypes.func,
//     onSetJdConfig: PropTypes.func
// }

export default Form.create()(Modalbox);
