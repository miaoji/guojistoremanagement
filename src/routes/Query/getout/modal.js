import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const Modalbox = ({
  item = {},
  modalVisible,
  form: {
    validateFields,
    getFieldDecorator,
    // resetFields,
    getFieldsValue,
  },
  onOk,
  hideModal,
  title,
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
      <FormItem label="单号" hasFeedback {...formItemLayout}>
        {getFieldDecorator('no1', {
          initialValue: item.no1,
          rules: [
            {
              required: true,
              message: '请输入单号!',
            },
          ],
        })(<Input placeholder="请输入单号" />)}
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
