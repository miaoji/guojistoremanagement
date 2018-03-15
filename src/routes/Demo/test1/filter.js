import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const Filter = ({ handleFormReset, handleSearch, showModal, form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="日期">
            {getFieldDecorator('no')(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>重置</Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => showModal()}>
              新建
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(Filter);
