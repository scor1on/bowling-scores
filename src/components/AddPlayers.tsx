import { Button, Col, Input, Row } from 'antd';
import React, { useContext, useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { ScoreContext } from '../contexts/score';

const AddPlayers: React.FC = () => {
  const { addPlayers } = useContext(ScoreContext);

  const [players, setPlayers] = useState<string[]>(['']);

  const addPlayerInput = () => {
    setPlayers((origin) => [...origin, '']);
  };

  const deletePlayerInput = (key: number) => {
    setPlayers((origin) =>
      origin.filter((player, playerKey) => playerKey !== key)
    );
  };

  const updatePlayerName = (name: string, key: number) => {
    setPlayers((players) =>
      players.map((player, playerKey) => (playerKey === key ? name : player))
    );
  };

  const AddButton = (
    <Button
      type='primary'
      icon={<PlusOutlined />}
      size='large'
      style={{ marginLeft: '5px' }}
      onClick={addPlayerInput}
    />
  );

  const DeleteButton = ({ playerKey }: { playerKey: number }) => (
    <Button
      type='primary'
      icon={<CloseOutlined />}
      size='large'
      style={{ marginLeft: '5px' }}
      onClick={() => deletePlayerInput(playerKey)}
    />
  );

  const startTheGame = (e: React.FormEvent) => {
    e.preventDefault();

    addPlayers(
      players.map((player) => ({
        playerName: player,
        frames: [],
        moves: 0,
        pins: [],
        lastRoll: 0,
        totalScores: [],
      }))
    );
  };

  return (
    <>
      <form onSubmit={startTheGame}>
        <Row gutter={[16, 16]} justify='center'>
          <Col sm={12} xs={24}>
            <h2 style={{ textAlign: 'center' }}>Please fill player names</h2>
          </Col>
        </Row>
        {players.map((player, key) => (
          <Row gutter={[16, 16]} justify='center' key={`player_${key}`}>
            <Col sm={12} xs={24}>
              <Input
                size='large'
                required
                name={`player_${key}`}
                placeholder={`Player Name (${key + 1})`}
                style={{ width: '80%' }}
                onChange={(e) => updatePlayerName(e.target.value, key)}
              />
              {key === 0 ? AddButton : <DeleteButton playerKey={key} />}
            </Col>
          </Row>
        ))}

        <Row gutter={[16, 16]} justify='center'>
          <Button htmlType='submit' type='primary' size='middle'>
            Start the game
          </Button>
        </Row>
      </form>
    </>
  );
};

export default AddPlayers;
