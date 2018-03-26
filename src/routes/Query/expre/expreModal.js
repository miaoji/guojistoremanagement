import React from 'react';
import { Modal, Timeline, Button } from 'antd';
import styles from './index.less';

const Modalbox = ({
  expreInfo,
  modalVisible,
  hideModal,
  title,
}) => {
  console.log('expreInfo', expreInfo);
  return (
    <Modal
      className={styles.expreModal}
      bodyStyle={{ height: '500px', overflow: 'auto' }}
      footer={[<Button key="back" onClick={() => hideModal()}>完成</Button>]}
      title={title}
      visible={modalVisible}
      onOk={() => hideModal()}
      onCancel={() => hideModal()}
    >
      <Timeline>{expreInfo}</Timeline>
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

export default Modalbox;
