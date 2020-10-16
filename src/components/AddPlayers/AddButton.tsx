import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export const AddButton: React.FC<{ clickAction: () => void }> = ({
  clickAction,
}) => {
  return (
    <Button
      type='primary'
      icon={<PlusOutlined />}
      size='large'
      style={{ marginLeft: '5px' }}
      onClick={clickAction}
    />
  );
};
