import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [{
      required: true, message: '请输入用户名!',
    }],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [{
      required: true, message: '请输入密码!',
    }],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: '即将上线',
    },
    rules: [{
      required: true, message: 'Please enter mobile number!',
    }, {
      pattern: /^1\d{10}$/, message: 'Wrong mobile number format!',
    }],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: '即将上线',
    },
    rules: [{
      required: true, message: '请输入验证码!',
    }],
  },
  ImageVerify: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: '图片验证码',
    },
    rules: [{
      required: true, message: '请输入验证码!',
    }],
  },
};

export default map;
