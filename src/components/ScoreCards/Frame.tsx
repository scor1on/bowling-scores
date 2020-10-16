import { Card } from 'antd';
import React, { memo } from 'react';

const headStyle: React.CSSProperties = {
  textAlign: 'center',
  background: '#f0f2f5',
};

const gridStyle: React.CSSProperties = {
  height: '30px',
  textAlign: 'center',
  padding: '5px',
};

export const Frame: React.FC<{
  number: number;
  frameData: number[];
  frameScore: number;
}> = memo(({ number, frameData = [], frameScore }) => {
  const width = number !== 10 ? '50%' : '33.3%';

  return (
    <Card title={`Frame ${number}`} size='small' headStyle={headStyle}>
      <Card.Grid hoverable={false} style={{ ...gridStyle, width: width }}>
        {frameData && frameData[0]}
      </Card.Grid>
      <Card.Grid hoverable={false} style={{ ...gridStyle, width: width }}>
        {frameData && frameData[1] && frameData[1]}
      </Card.Grid>
      {number === 10 && (
        <Card.Grid hoverable={false} style={{ ...gridStyle, width: width }}>
          {frameData && frameData[2] && frameData[2]}
        </Card.Grid>
      )}
      <Card.Grid hoverable={false} style={{ ...gridStyle, width: '100%' }}>
        {frameScore}
      </Card.Grid>
    </Card>
  );
});
