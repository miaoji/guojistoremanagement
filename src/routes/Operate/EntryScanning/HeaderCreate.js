import React from 'react';
import { Row, Col, Button, Form, Icon, Input, InputNumber, Checkbox } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

const ModalForm = ({
  form,
  handleModalConfirm,
  scanVal,
  handleScanning,
}) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const formLockLayout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 2,
    },
  };
  document.onkeydown = (e) => {
    if (e.keyCode === 113 || e.keyCode === 174) {
      const inp = document.querySelector('.autofocus');
      inp.focus();
    }
    if (e.keyCode === 187) {
      okHandle();
    }
  };
  const handleCancel = () => {
    const fieldsValue = { ...form.getFieldsValue() };
    form.resetFields();
    initValue(fieldsValue);
  };
  const initValue = (fieldsValue) => {
    const {
      weight,
      weightLock,
      shelfNo,
      shelfNoLock,
      customerNo,
      customerNoLock,
      expressCompanyCode,
      expressCompanyCodeLock,
    } = fieldsValue;
    form.setFieldsValue({
      weightLock,
      shelfNoLock,
      customerNoLock,
      expressCompanyCodeLock,
    });
    if (weightLock) {
      form.setFieldsValue({
        weight,
      });
    }
    if (shelfNoLock) {
      form.setFieldsValue({
        shelfNo,
      });
    }
    if (customerNoLock) {
      form.setFieldsValue({
        customerNo,
      });
    }
    if (expressCompanyCodeLock) {
      form.setFieldsValue({
        expressCompanyCode,
      });
    }
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const modalFormVal = {
        ...fieldsValue,
      };
      initValue(fieldsValue);
      handleModalConfirm(modalFormVal, 'add');
    });
  };

  return (
    <div>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <div className={styles.scannBox}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
            <Col md={8} sm={24}>
              <Input
                size="large"
                className="autofocus"
                value={scanVal}
                autoFocus
                onChange={e => handleScanning(e, form)}
                placeholder="扫描区（F2移动鼠标焦点到框内）"
              />
            </Col>
            <Col md={8} sm={24}>
              <Button size="large" type="default" onClick={handleCancel}>
                <Icon type="close-circle-o" />清空
              </Button>
              <Button size="large" type="primary" onClick={okHandle} style={{ marginLeft: '20px' }}>
                <Icon type="check-circle-o" />创建新订单 (快捷键 = )
              </Button>
            </Col>
          </Row>
        </div>
        <Col md={8} sm={24} >
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
      </Row>
      <Row>
        <Col md={8} sm={24} >
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="客户编码锁定"
          >
            {form.getFieldDecorator('customerNoLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="快递代码锁定"
          >
            {form.getFieldDecorator('expressCompanyCodeLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="货架号锁定"
          >
            {form.getFieldDecorator('shelfNoLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24} style={{ paddingTop: '2px' }}>
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
        <Col md={4} sm={24}>
          <FormItem
            {...formLockLayout}
            label="重量锁定"
          >
            {form.getFieldDecorator('weightLock', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox />
            )}
          </FormItem>
        </Col>
      </Row>
    </div>
  );
};

export default Form.create()(ModalForm);
