import React from 'react';
import { Form, InputNumber, Radio, Modal } from 'antd';

const RadioGroup = Radio.Group;
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
  currentItem,
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
      };
      onOk(data);
    });
  };
  return (
    <Modal title={title} visible={modalVisible} onOk={handleOk} onCancel={() => hideModal()}>
      <FormItem label="金额数量(元)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('money', {
          initialValue: currentItem.money,
          rules: [
            {
              required: true,
              message: '请填写金额数量!',
            },
          ],
        })(<InputNumber style={{ width: '100%' }} placeholder="请填写金额数量" />)}
      </FormItem>
      <FormItem label="操作类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('type', {
          initialValue: currentItem.type || 1,
          rules: [
            {
              required: true,
              message: '请选择类型!',
            },
          ],
        })(
          <RadioGroup style={{ width: '100%' }} placeholder="请选择类型">
            <Radio value={1}>充值</Radio>
            <Radio value={0}>扣款</Radio>
          </RadioGroup>
        )}
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
