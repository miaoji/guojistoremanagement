import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import DateRange from '../../../components/DateRange';

const FormItem = Form.Item;

const Filter = ({ form, handleSearch, handleSearchReset }) => {
  const { getFieldDecorator } = form;
  const initialCreateTime = [];
  return (
    <Form onSubmit={handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={5} sm={24}>
          <FormItem label="客户编码">
            {getFieldDecorator('customerNo', {
              initialValue: '',
            })(
              <Input placeholder="请输入客户编码" />
            )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem label="客户创建时间">
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <DateRange size="default" />
            )}
          </FormItem>
        </Col>
        <Col md={5} sm={24}>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={handleSearchReset}>重置</Button>
            </span>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(Filter);
