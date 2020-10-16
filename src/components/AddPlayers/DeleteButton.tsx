import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export const DeleteButton: React.FC<{ deleteAction: () => void }> = ({
  deleteAction,
}) => (
  <Button
    type='primary'
    icon={<CloseOutlined />}
    size='large'
    style={{ marginLeft: '5px' }}
    onClick={() => deleteAction()}
    danger
  />
);
