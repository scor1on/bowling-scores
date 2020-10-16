import React, { useContext } from 'react';
import { ScoreContext } from '../../contexts/score';
import { AddPlayers } from '../AddPlayers';
import { ScoreCards } from '../ScoreCards';
import { Controls } from '../Controls';
import { GameOver } from '../GameOver';

export const Game: React.FC = () => {
  const { players, gameOver } = useContext(ScoreContext);

  if (players === null) {
    return <AddPlayers />;
  } else if (gameOver) {
    return <GameOver />;
  } else {
    return (
      <>
        <ScoreCards />
        <Controls />
      </>
    );
  }
};
