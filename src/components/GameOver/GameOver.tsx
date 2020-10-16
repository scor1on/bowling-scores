import { Button, Result, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useContext } from 'react';
import { ScoreContext } from '../../contexts/score/ScoreContext';
import { getWinnerData } from '../../utils/gameUtils';

export const GameOver = () => {
  const { players, restartCurrentGame, newGame } = useContext(ScoreContext);

  const data = getWinnerData(players!);

  return (
    <Result
      status='success'
      title='Congratulations'
      extra={[
        <Table
          dataSource={data}
          key='winners-table'
          style={{ width: '400px', margin: '20px auto' }}
          pagination={false}
          bordered>
          <Column title='Player' dataIndex='name' key='name' />
          <Column title='Score' dataIndex='score' key='score' />
        </Table>,
        <Button type='primary' onClick={newGame} key='new-game'>
          New Game
        </Button>,
        <Button key='restart-game' onClick={restartCurrentGame}>
          Restart the game
        </Button>,
      ]}
    />
  );
};
