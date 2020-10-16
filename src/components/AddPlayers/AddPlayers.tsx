import { Button, Col, Input, Row } from 'antd';
import React, { useContext, useState } from 'react';
import { ScoreContext } from '../../contexts/score';
import { GameConfig } from '../../config/gameConfig';
import { DeleteButton } from './DeleteButton';
import { AddButton } from './AddButton';
import { initialPlayerState } from '../../contexts/score/ScoreState';

export const AddPlayers: React.FC = () => {
  const { addPlayers } = useContext(ScoreContext);

  const [players, setPlayers] = useState<string[]>(['']);

  const addPlayerInput = () => {
    setPlayers((origin) => [...origin, '']);
  };

  const deletePlayerInput = (key: number) => {
    setPlayers((origin) =>
      origin.filter((_player, playerKey) => playerKey !== key)
    );
  };

  const updatePlayerName = (name: string, key: number) => {
    setPlayers((players) =>
      players.map((player, playerKey) => (playerKey === key ? name : player))
    );
  };

  const startTheGame = (e: React.FormEvent) => {
    e.preventDefault();

    addPlayers(
      players.map((player) => ({
        ...initialPlayerState,
        playerName: player,
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
              {key === 0 && players?.length < GameConfig.maxPlayers && (
                <AddButton clickAction={addPlayerInput} />
              )}
              {key > 0 && (
                <DeleteButton deleteAction={() => deletePlayerInput(key)} />
              )}
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
