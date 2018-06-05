import React from 'react';
import { Form, InputNumber, Modal, Radio } from 'antd';

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
      <FormItem label="重量" hasFeedback {...formItemLayout}>
        {getFieldDecorator('weight', {
          initialValue: item.WEIGHT,
          rules: [
            {
              required: true,
              message: '请输入重量!',
            },
          ],
        })(<InputNumber placeholder="请输入重量" />)}
      </FormItem>
      <FormItem label="快递运费" hasFeedback {...formItemLayout}>
        {getFieldDecorator('totalFee', {
          initialValue: item.TOTAL_FEE,
          rules: [
            {
              required: true,
              message: '请输入快递运费!',
            },
          ],
        })(<InputNumber placeholder="请输入快递运费" />)}
      </FormItem>
      <FormItem label="合单状态" hasFeedback {...formItemLayout}>
        {getFieldDecorator('wmsStatus', {
          initialValue: item.WMS_STATUS,
          rules: [
            {
              required: true,
              message: '请输入合单状态!',
            },
          ],
        })(
          <RadioGroup>
            <Radio value={0}>未合单</Radio>
            <Radio value={1}>已合单</Radio>
          </RadioGroup>
        )
        }
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
