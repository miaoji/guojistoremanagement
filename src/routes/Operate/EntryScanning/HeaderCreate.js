import React from 'react';
import { Row, Col, Button, Form, Icon, Input, InputNumber, Checkbox } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

const ModalForm = ({
  modalType,
  form,
  handleModalConfirm,
  scanVal,
  handleScanning,
  // handleScanClear,
}) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const handleCancel = () => {
    form.setFieldsValue({
      cnNo: undefined,
      customerNo: undefined,
      expressCompanyCode: undefined,
      shelfNo: undefined,
      weight: undefined,
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const modalFormVal = {
        ...fieldsValue,
      };
      const { weightremain, weight } = fieldsValue;
      if (weightremain) {
        form.setFieldsValue({
          weight,
        });
      }
      handleModalConfirm(modalFormVal, 'add');
    });
  };

  return (
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <div className={styles.scannBox}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
          <Col md={8} sm={24}>
            <Input
              size="large"
              value={scanVal}
              autoFocus
              onChange={e => handleScanning(e, form)}
              placeholder="扫描区"
            />
          </Col>
          <Col md={8} sm={24}>
            <Button size="large" type="default" onClick={handleCancel}>
              <Icon type="close-circle-o" />清空
            </Button>
            <Button size="large" type="primary" onClick={okHandle} style={{ marginLeft: '20px' }}>
              <Icon type="check-circle-o" />创建新订单
            </Button>
          </Col>
        </Row>
      </div>
      <Col md={8} sm={24}>
        <FormItem
          {...formItemLayout}
          label="单号"
        >
          {form.getFieldDecorator('cnNo', {
            rules: [{ required: true, message: '请输入单号' }],
          })(
            <Input placeholder="请输入单号" />
          )}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem
          {...formItemLayout}
          label="客户编码"
        >
          {form.getFieldDecorator('customerNo', {
            rules: [{
              required: true,
              message: '客户编码',
            }],
          })(
            <Input placeholder="请输入客户编码" />
          )}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem
          {...formItemLayout}
          label="快递代码"
        >
          {form.getFieldDecorator('expressCompanyCode', {
            rules: [{ required: true, message: '请输入快递代码' }],
          })(
            <Input placeholder="请输入快递代码" />
          )}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem
          {...formItemLayout}
          label="货架号"
        >
          {form.getFieldDecorator('shelfNo', {
            rules: [{ required: true, message: '请输入货架号' }],
          })(
            <Input placeholder="请输入货架号" />
          )}
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem
          {...formItemLayout}
          label="重量/kg"
        >
          {form.getFieldDecorator('weight', {
            rules: [{ required: true, message: '请输入重量' }],
          })(
            <InputNumber style={{ width: '100%' }} min={0} placeholder="请输入重量" />
          )}
        </FormItem>
      </Col>
      {
        modalType === 'add' ?
          (
            <Col md={8} sm={24}>
              <FormItem
                {...formItemLayout}
                label="重量锁定"
              >
                {form.getFieldDecorator('weightremain', {
                  defaultChecked: false,
                })(
                  <Checkbox>是否锁定重量</Checkbox>
                )}
              </FormItem>
            </Col>
          ) : ''
      }
    </Row>
  );
};

export default Form.create()(ModalForm);
