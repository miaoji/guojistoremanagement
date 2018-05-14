import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import DateRange from '../../../components/DateRange';
import styles from './index.less';
import { handleFields } from '../../../utils/time';

const FormItem = Form.Item;
const Filter = ({
  handleFormReset,
  handleSearch,
  showModal,
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

  const onTimeChange = (key, values) => {
    const fields = getFieldsValue();
    fields[key] = values;
    onSearch(fields);
  };
  const initialCreateTime = [];

  return (
    <Form layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="名称">
            {getFieldDecorator('ruleName')(
              <Input placeholder="按名称搜索" onPressEnter={onSearch} />
            )}
          </FormItem>
        </Col>
        <Col md={9} sm={24}>
          <FormItem label="时间">
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <DateRange onChange={onTimeChange.bind(null, 'createTime')} size="default" />
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" onClick={onSearch}>查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={onFormReset}>重置</Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => showModal()}>
              新建
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
};

Filter.propTypes = {
  handleFormReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default Form.create()(Filter);
