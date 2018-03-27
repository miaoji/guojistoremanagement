import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import { handleFields } from '../../../utils/time';

const FormItem = Form.Item;
const Filter = ({
  handleFormReset,
  handleSearch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  },
}) => {
  const onFormReset = () => {
    resetFields();
    handleFormReset();
    const fields = getFieldsValue();
    fields.createTime = [];
  };

  const onSearch = (fields) => {
    let item = fields;
    if (!item.createTime) {
      item = getFieldsValue();
    }
    const values = handleFields(item);
    handleSearch({ ...values, createTime: undefined });
  };

  return (
    <Form layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="目的地">
            {getFieldDecorator('countryCn')(
              <Input placeholder="按目的地搜索" onPressEnter={onSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" onClick={onSearch}>查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={onFormReset}>重置</Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  handleFormReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Form.create()(Filter);
