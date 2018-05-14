import React from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import styles from './index.less';

// const { Option } = Select;

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
      <FormItem label="规则名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('ruleName', {
          initialValue: item.rule_name,
          rules: [
            {
              required: true,
              message: '请输入规则名称!',
            },
          ],
        })(<Input placeholder="请输入规则名称" />)}
      </FormItem>
      <FormItem label="前缀" hasFeedback {...formItemLayout}>
        {getFieldDecorator('rulePrefix', {
          initialValue: item.rule_prefix,
          rules: [
            {
              required: true,
              pattern: /^[0-9a-zA-Z]*$/,
              message: '请输入有效前缀!',
            },
          ],
        })(<Input placeholder="请输入前缀" />)}
      </FormItem>
      <FormItem label="位数" hasFeedback {...formItemLayout}>
        {getFieldDecorator('ruleDigit', {
          initialValue: item.rule_digit,
          rules: [
            {
              required: true,
              message: '请输入位数!',
            },
          ],
        })(<InputNumber style={{ width: '100%' }} placeholder="请输入位数" />)}
      </FormItem>
      <FormItem label="备注" hasFeedback {...formItemLayout}>
        {getFieldDecorator('remark', {
          initialValue: item.remark,
          rules: [
            {
              // required: true,
              message: '请输入备注信息!',
            },
          ],
        })(<Input placegolder="请输入备注信息" />)}
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
