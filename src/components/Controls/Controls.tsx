import { Button, Col, Row } from 'antd';
import React, { useContext } from 'react';
import { ScoreContext } from '../../contexts/score';
import { IUserScore } from '../../models/IUserScore';

export const Controls: React.FC = () => {
  const {
    addScore,
    newGame,
    restartCurrentGame,
    players,
    activePlayer,
  } = useContext(ScoreContext);
  const numbers = Array.from(Array(11).keys());

  const activePlayerData: IUserScore | null = players
    ? players[activePlayer]
    : null;
  const lastRoll = activePlayerData ? activePlayerData.lastRoll : 0;
  const moves = activePlayerData ? activePlayerData.moves : 0;

  const disableButton = (pin: number) => {
    if (moves % 2 === 0 || moves === 0) return false;
    if (moves === 19 || lastRoll === 10) return false;
    return lastRoll + pin > 10;
  };

  return (
    <Row justify='center' gutter={6} align='middle'>
      <Col span={7}>
        <Button onClick={restartCurrentGame}>Restart the Game</Button>
      </Col>
      {numbers.map((number) => (
        <Col key={number} span={1}>
          <Button
            disabled={disableButton(number)}
            size='large'
            style={{}}
            onClick={() => addScore(number)}>
            {number}
          </Button>
        </Col>
      ))}
      <Col span={6} style={{ textAlign: 'right' }}>
        <Button onClick={newGame}>New Game</Button>
      </Col>
    </Row>
  );
};
