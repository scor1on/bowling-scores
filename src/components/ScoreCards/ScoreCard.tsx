import { Col, Row } from 'antd';
import React from 'react';
import { Frame } from './Frame';
import { IUserScore } from '../../models/IUserScore';
import { StarTwoTone } from '@ant-design/icons';
import { TotalFrame } from './TotalFrame';

export const ScoreCard: React.FC<{ player: IUserScore; isActive: boolean }> = ({
  player,
  isActive,
}) => {
  return (
    <>
      <div
        style={{
          margin: '10px 0px',
          padding: '10px 0px',
          background: !isActive ? 'rgb(231 245 235)' : 'rgb(196 228 206)',
        }}>
        <Row justify='center' gutter={6}>
          <Col span={20}>
            <h2>
              {player.playerName}
              {isActive && <StarTwoTone style={{ marginLeft: '10px' }} />}
            </h2>
          </Col>
        </Row>
        <Row justify='center' gutter={6}>
          {new Array(10).fill(1).map((_val, frameKey) => (
            <Col key={frameKey} span={2}>
              <Frame
                number={frameKey + 1}
                frameData={player.frames[frameKey]}
                frameScore={player.totalScores[frameKey]}
              />
            </Col>
          ))}
          <Col key='total' span={2}>
            <TotalFrame key='total' score={player.totalScores.slice(-1)[0]} />
          </Col>
        </Row>
      </div>
    </>
  );
};
