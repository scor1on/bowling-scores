import React, { useContext } from 'react';
import { ScoreContext } from '../contexts/score';
import AddPlayers from './AddPlayers';
import { ScoreCards } from './ScoreCards';
import { Controls } from './Controls';

const Game: React.FC = () => {
  const { players } = useContext(ScoreContext);

  return (
    <div>
      {players === null ? (
        <AddPlayers />
      ) : (
        <>
          <ScoreCards />
          <Controls />
        </>
      )}
    </div>
  );
};

export default Game;
