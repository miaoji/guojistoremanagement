import React from 'react';
import { Row, Col, Icon, Button, Checkbox, Form, Input } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const formLockLayout = {
  labelCol: {
    span: 17,
  },
  wrapperCol: {
    span: 2,
  },
};
const ModalForm = ({
  form,
  scanVal,
  handleScanning,
  handleModalConfirm,
}) => {
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

  const initValue = (fieldsValue) => {
    const {
      customerNo,
      customerNoLock,
      destination,
      destinationLock,
      expressCompanyCode,
      expressCompanyCodeLock,
      packageType,
      packageTypeLock,
      productType,
      productTypeLock,
      shelfNo,
      shelfNoLock,
      weight,
      weightLock,
    } = fieldsValue;
    form.setFieldsValue({
      customerNoLock,
      destinationLock,
      expressCompanyCodeLock,
      packageTypeLock,
      productTypeLock,
      shelfNoLock,
      weightLock,
    });
    if (customerNoLock) {
      form.setFieldsValue({
        customerNo,
      });
    }
    if (destinationLock) {
      form.setFieldsValue({
        destination,
      });
    }
    if (expressCompanyCodeLock) {
      form.setFieldsValue({
        expressCompanyCode,
      });
    }
    if (packageTypeLock) {
      form.setFieldsValue({
        packageType,
      });
    }
    if (productTypeLock) {
      form.setFieldsValue({
        productType,
      });
    }
    if (shelfNoLock) {
      form.setFieldsValue({
        shelfNo,
      });
    }
    if (weightLock) {
      form.setFieldsValue({
        weight,
      });
    }
  };

  const handleClear = () => {
    const fieldsValue = { ...form.getFieldsValue() };
    form.resetFields();
    initValue(fieldsValue);
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
  return (
    <div>
      <div className={styles.scannBox}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
          <Col md={12} sm={24}>
            <Input
              size="large"
              className="autofocus"
              autoFocus
              value={scanVal}
              onChange={e => handleScanning(e, form)}
              placeholder="扫描区（F2移动鼠标焦点到框内）"
            />
          </Col>
          <Col md={8} sm={24}>
            <Button size="large" type="default" onClick={handleClear}>
              <Icon type="close-circle-o" />清空
            </Button>
            <Button size="large" type="primary" onClick={okHandle} style={{ marginLeft: '20px' }}>
              <Icon type="check-circle-o" />创建异常单 (快捷键 = )
            </Button>
          </Col>
        </Row>
      </div>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
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
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} align="middle">
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {form.getFieldDecorator('remark')(
              <Input placeholder="请输入备注" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem
            {...formItemLayout}
            label="客户编码"
          >
            {form.getFieldDecorator('customerNo', {})(
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
      </Row>
    </div>
  );
};

export default Form.create()(ModalForm);
