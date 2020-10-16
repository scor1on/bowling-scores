import { Card } from 'antd';
import React from 'react';

const headStyle: React.CSSProperties = {
  textAlign: 'center',
  background: '#f0f2f5',
};

const gridStyle: React.CSSProperties = {
  height: '60px',
  textAlign: 'center',
  padding: '20px 5px',
  width: '100%',
  background: '#bacee2',
};

export const TotalFrame: React.FC<{ score: number }> = React.memo(
  ({ score }) => {
    return (
      <Card title={`Total`} size='small' headStyle={headStyle}>
        <Card.Grid hoverable={false} style={gridStyle}>
          {score}
        </Card.Grid>
      </Card>
    );
  }
);
